export const SITE_URL = "https://math.avasan.org";

export const SITEMAP_EXCLUDED_ROUTES = ["/admin", "/graph-sketcher"];

type SitemapOptions = {
	exclude: string[];
	generateRobotsTxt: boolean;
	hostname: string;
	lastmod: string;
};

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
