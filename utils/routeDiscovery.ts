import fs from 'fs';
import path from 'path';

export interface RouteLink {
  title: string;
  url: string;
}

/**
 * Scans a directory for folders containing a page.tsx file.
 * @param dir The directory relative to the 'app' folder to scan.
 * @param baseRoute The base URL path for the links found.
 * @param exclude List of folder names to exclude.
 */
export function discoverRoutes(dir: string, baseRoute = '', exclude: string[] = []): RouteLink[] {
  const appPath = path.join(process.cwd(), 'app', dir);
  
  if (!fs.existsSync(appPath)) return [];

  const items = fs.readdirSync(appPath, { withFileTypes: true });
  const links: RouteLink[] = [];

  for (const item of items) {
    if (item.isDirectory() && !item.name.startsWith('(') && !exclude.includes(item.name)) {
      const folderPath = path.join(appPath, item.name);
      
      // Check if this folder contains a page.tsx
      if (fs.existsSync(path.join(folderPath, 'page.tsx'))) {
        links.push({
          title: item.name.toUpperCase().replace(/-/g, '_'),
          url: `${baseRoute}/${item.name}`
        });
      }

      // Optional: Recursive scan could go here if we wanted deeper nesting, 
      // but for this simple structure, top-level is usually enough.
    }
  }

  return links;
}
