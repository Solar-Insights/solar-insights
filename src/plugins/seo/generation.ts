import * as fs from "fs";
import { HOME, SEARCH, SOLAR_MAP, GET_STARTED, MY_ORGANIZATION, PRICING } from "@/router/routes";
import { RouteInfo } from "@/router/routes";

function addStartingStringsToSiteMap() {
    let start = ``;

    start += `<?xml version="1.0" encoding="UTF-8"?>\n`;
    start += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    return start;
}

function addEndingStringsToSiteMap() {
    return `</urlset>`;
}

function addRouteStringsToSiteMap() {
    let routes = ``;

    const relevantRoutes: RouteInfo[] = [HOME, SEARCH, PRICING, SOLAR_MAP, GET_STARTED, MY_ORGANIZATION];
    relevantRoutes.forEach((route: RouteInfo) => {
        routes += addSingleRouteStringToSiteMap(route);
    });

    return routes;
}

function addSingleRouteStringToSiteMap(routeInfo: RouteInfo) {
    let route = ``;

    route += `  <url>\n`;
    route += `    <loc>https://solarinsights.ca${routeInfo.en.path}</loc>\n`;
    route += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    route += `  </url>\n`;

    return route;
}

async function createSitemap() {
    let sitemap: string = "";

    sitemap += addStartingStringsToSiteMap();
    sitemap += addRouteStringsToSiteMap();
    sitemap += addEndingStringsToSiteMap();

    await fs.promises.writeFile("dist/sitemap.xml", sitemap);
}

async function createRobotsTxt() {
    let robots = ``;

    robots += `User-agent: *\n`;
    robots += `Disallow:\n`;
    robots += `\n`;
    robots += `Sitemap: https://solarinsights.ca/sitemap.xml`;

    await fs.promises.writeFile("dist/robots.txt", robots);
}

createSitemap();
createRobotsTxt();
