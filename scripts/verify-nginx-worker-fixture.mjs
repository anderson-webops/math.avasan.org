#!/usr/bin/env node

import { spawn } from "node:child_process";
import { appendFileSync, writeFileSync } from "node:fs";
import process from "node:process";
import { fileURLToPath } from "node:url";

const [mode, pidFile, eventLog] = process.argv.slice(2);
if (!mode || !pidFile || !eventLog) throw new Error("missing worker-fixture arguments");

if (mode === "worker") {
	process.title = "nginx: worker process";
	appendFileSync(eventLog, `worker-start ${process.pid}\n`);
	process.on("SIGTERM", () => {
		setTimeout(() => {
			appendFileSync(eventLog, `worker-retired ${process.pid}\n`);
			process.exit(0);
		}, 250);
	});
	setInterval(() => {}, 1000);
}
else if (mode === "master") {
	process.title = "nginx: master process";
	const script = fileURLToPath(import.meta.url);
	let worker;
	const startWorker = () => {
		worker = spawn(process.execPath, [script, "worker", pidFile, eventLog], {
			stdio: "ignore"
		});
	};
	startWorker();
	writeFileSync(pidFile, `${process.pid}\n`, { mode: 0o600 });
	process.on("SIGHUP", () => {
		const previous = worker;
		startWorker();
		previous.kill("SIGTERM");
	});
	process.on("SIGTERM", () => {
		worker.kill("SIGTERM");
		setTimeout(() => process.exit(0), 350);
	});
	setInterval(() => {}, 1000);
}
else {
	throw new Error("unknown worker-fixture mode");
}
