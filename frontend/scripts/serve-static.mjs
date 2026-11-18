/**
 * Minimal static file server for the GitHub Pages preview.
 *
 * Serves `frontend/out` under the base path `/energic` (mirroring GitHub
 * Pages project-site behaviour, including serving `404.html` for unknown
 * paths with status 200). Usage: node scripts/serve-static.mjs [port]
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "out");
const BASE = "/energic";
const port = Number(process.argv[2] ?? 8445);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", `http://localhost:${port}`);
    let pathname = decodeURIComponent(url.pathname);
    if (!pathname.startsWith(`${BASE}/`)) {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("not found");
      return;
    }
    pathname = pathname.slice(BASE.length) || "/";
    // Directory-style URLs get a trailing slash (index.html); explicit file
    // paths (e.g. /404.html) are kept as-is.
    if (!pathname.endsWith("/") && !path.extname(pathname)) pathname += "/";

    // Directory URLs resolve to their index.html (trailingSlash export).
    if (pathname.endsWith("/")) pathname = path.join(pathname, "index.html");

    const file = path.normalize(path.join(root, pathname));
    if (!file.startsWith(root)) {
      res.writeHead(403);
      res.end();
      return;
    }

    const send = (body, status, type) => {
      res.writeHead(status, { "content-type": type });
      res.end(body);
    };

    try {
      const data = await readFile(file);
      send(data, 200, MIME[path.extname(file)] ?? "application/octet-stream");
    } catch {
      // GitHub Pages: unknown paths return HTTP 404 while serving 404.html.
      // A direct request to /404.html is handled above (file exists) with 200.
      try {
        const notFound = await readFile(path.join(root, "404.html"));
        send(notFound, 404, MIME[".html"]);
      } catch {
        send("not found", 404, "text/plain");
      }
    }
  } catch {
    res.writeHead(500);
    res.end();
  }
});

server.listen(port, () => console.log(`serving ${root} at http://localhost:${port}${BASE}/`));
