#!/usr/bin/env node

import { appendFileSync, readFileSync, readlinkSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { resolve } from "node:path";
import process from "node:process";

const [currentLink, policyPath, portFile, eventLog] = process.argv.slice(2);
if (!currentLink || !policyPath || !portFile || !eventLog)
	throw new Error("expected current link, policy, port file, and event log");

function activeRoot() {
	return resolve(currentLink, "..", readlinkSync(currentLink));
}

function release() {
	return JSON.parse(
		readFileSync(`${activeRoot()}/front-end/dist/release.json`, "utf8")
	);
}

function staticHeaders() {
	const headers = {};
	for (const line of readFileSync(policyPath, "utf8").split("\n")) {
		const match = line.match(
			/^add_header ([A-Za-z0-9-]+) "((?:\\["\\]|[^"\\])*)" always;$/
		);
		if (!match) continue;
		headers[match[1]] = match[2]
			.replaceAll("\\\"", "\"")
			.replaceAll("\\\\", "\\");
	}
	return headers;
}

const currentDenied = new Set([
	"/404",
	"/404/",
	"/404.html",
	"/404/index.html",
	"/index.html",
	"/%69ndex.html",
	"/admin.html",
	"/admin/index.html",
	"/admin/index%2ehtml",
	"/admin/index%2Ehtml",
	"/courses.html",
	"/courses/index.html",
	"/courses%2ehtml",
	"/courses/index%2Ehtml",
	"/graph-sketcher.html",
	"/graph-sketcher/index.html",
	"/graph-sketcher%2Ehtml",
	"/python-ide",
	"/python-ide/asset.js",
	"/.vite/ssr-manifest.json"
]);
const legacyDenied = new Set([
	"/404",
	"/404/",
	"/404.html",
	"/404/index.html",
	"/index.html",
	"/admin.html",
	"/admin/index.html",
	"/courses.html",
	"/courses/index.html",
	"/graph-sketcher.html",
	"/graph-sketcher/index.html",
	"/.vite/ssr-manifest.json"
]);

function respond(request, response) {
	const identity = release();
	const family = request.socket.localAddress.includes(":") ? "ipv6" : "ipv4";
	const path = (request.url || "/").split("?", 1)[0];
	appendFileSync(
		eventLog,
		`${JSON.stringify({ family, method: request.method, path, version: identity.version })}\n`
	);
	for (const [name, value] of Object.entries(staticHeaders()))
		response.setHeader(name, value);

	if (path === "/release.json") {
		response.statusCode = 200;
		response.setHeader("Cache-Control", "no-store");
		response.end(
			readFileSync(`${activeRoot()}/front-end/dist/release.json`, "utf8")
		);
		return;
	}
	if (path === "/admin" || path === "/admin/") {
		response.statusCode = 302;
		response.setHeader("Location", "https://cs.avasan.org/admin");
		response.setHeader("Cache-Control", "no-store");
		response.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
		response.end();
		return;
	}
	if (path === "/courses" || path === "/graph-sketcher") {
		response.statusCode = 301;
		response.setHeader(
			"Location",
			`http://math.avasan.org:${request.socket.localPort}${path}/`
		);
		response.end();
		return;
	}
	if (path === "/" && request.method === "POST") {
		const injectedFailure
			= identity.version !== "1.0.16" && family === "ipv6";
		response.statusCode = injectedFailure ? 200 : 405;
		response.end();
		return;
	}
	const denied = identity.version === "1.0.16" ? legacyDenied : currentDenied;
	if (
		denied.has(path)
		|| path === "/api"
		|| path.startsWith("/api/")
		|| path.startsWith("/__math-")
	) {
		response.statusCode = 404;
		if (identity.version !== "1.0.16" && path.startsWith("/admin")) {
			response.setHeader("Cache-Control", "no-store");
			response.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
		}
		response.end("Page not found");
		return;
	}
	response.statusCode = 200;
	response.end("Math fixture");
}

const ipv4 = createServer(respond);
ipv4.listen(0, "127.0.0.1", () => {
	const address = ipv4.address();
	if (!address || typeof address === "string") throw new Error("missing port");
	const ipv6 = createServer(respond);
	ipv6.listen({ host: "::1", port: address.port, ipv6Only: true }, () => {
		writeFileSync(portFile, `${address.port}\n`, { mode: 0o600 });
	});
	const stop = () => ipv6.close(() => ipv4.close(() => process.exit(0)));
	process.on("SIGTERM", stop);
	process.on("SIGINT", stop);
});
