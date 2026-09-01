import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { injectStructuredDataIntoHtml } from '../src/lib/structuredData.js';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(projectRoot, 'dist');
const sourceHtml = await fs.readFile(path.join(distRoot, 'index.html'), 'utf8');

const routes = [
  '/real-estate',
  '/real-estate/paulus-condos',
  '/real-estate/joshua-condos',
  '/real-estate/ukana-condos',
  '/insights',
  '/news',
];

for (const route of routes) {
  const routeDirectory = path.join(distRoot, route.slice(1));
  await fs.mkdir(routeDirectory, { recursive: true });
  const routeHtml = injectStructuredDataIntoHtml(sourceHtml, route);
  await fs.writeFile(path.join(routeDirectory, 'index.html'), routeHtml);
}