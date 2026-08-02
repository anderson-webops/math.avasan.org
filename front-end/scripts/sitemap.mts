import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const SITE_URL = "https://math.avasan.org";

export const SITEMAP_EXCLUDED_ROUTES = ["/404", "/admin", "/graph-sketcher"];

const sitemapPath = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"../dist/sitemap.xml"
);

interface SitemapOptions {
	exclude: string[];
	generateRobotsTxt: boolean;
	hostname: string;
	lastmod: string;
}

type GenerateSitemap = (options: SitemapOptions) => void;

export function sitemapOptions(): SitemapOptions {
	return {
		exclude: SITEMAP_EXCLUDED_ROUTES,
		generateRobotsTxt: false,
		hostname: SITE_URL,
		lastmod: ""
	};
}

export function generateProductionSitemap(generateSitemap: GenerateSitemap) {
	generateSitemap(sitemapOptions());
}

export function canonicalizeProductionSitemapXml(xml: string) {
	const courseWithoutSlash = `<loc>${SITE_URL}/courses</loc>`;
	const courseWithSlash = `<loc>${SITE_URL}/courses/</loc>`;
	const occurrences = xml.split(courseWithoutSlash).length - 1;
	if (occurrences !== 1) {
		throw new Error(
			`Expected one non-canonical Math course sitemap URL, found ${occurrences}.`
		);
	}

	const canonicalXml = xml.replace(courseWithoutSlash, courseWithSlash);
	const locations = [...canonicalXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
		match => match[1]
	);
	const expectedLocations = [`${SITE_URL}/`, `${SITE_URL}/courses/`];
	if (
		locations.length !== expectedLocations.length ||
		!expectedLocations.every(location => locations.includes(location))
	) {
		throw new Error(
			`Production sitemap contains unexpected routes: ${locations.join(", ")}`
		);
	}

	return canonicalXml;
}

export function canonicalizeProductionSitemap(targetSitemapPath = sitemapPath) {
	const canonicalXml = canonicalizeProductionSitemapXml(
		readFileSync(targetSitemapPath, "utf8")
	);
	writeFileSync(targetSitemapPath, canonicalXml, "utf8");
}
