import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(rootDir, "docs");

function githubPagesSpa(): Plugin {
  return {
    name: "github-pages-spa",
    apply: "build",
    closeBundle() {
      mkdirSync(outDir, { recursive: true });
      writeFileSync(path.join(outDir, ".nojekyll"), "");
      const fallback = `<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="utf-8" />
    <title>關西六日・和歌山、京都與高野山</title>
    <script>
      (function () {
        var pathSegmentsToKeep = 1;
        var l = window.location;
        l.replace(
          l.protocol +
            "//" +
            l.hostname +
            (l.port ? ":" + l.port : "") +
            l.pathname.split("/").slice(0, 1 + pathSegmentsToKeep).join("/") +
            "/?/" +
            l.pathname
              .slice(1)
              .split("/")
              .slice(pathSegmentsToKeep)
              .join("/")
              .replace(/&/g, "~and~") +
            (l.search ? "&" + l.search.slice(1).replace(/&/g, "~and~") : "") +
            l.hash
        );
      })();
    </script>
  </head>
  <body></body>
</html>
`;
      writeFileSync(path.join(outDir, "404.html"), fallback);
    },
  };
}

function redirectBareRoot(): Plugin {
  const redirect = (req: { url?: string }, res: { writeHead: (code: number, headers: Record<string, string>) => void; end: () => void }, next: () => void) => {
    if (req.url === "/") {
      res.writeHead(302, { Location: "/kansai-tour/" });
      res.end();
      return;
    }
    next();
  };
  return {
    name: "redirect-bare-root",
    configureServer(server) {
      server.middlewares.use(redirect);
    },
    configurePreviewServer(server) {
      server.middlewares.use(redirect);
    },
  };
}

export default defineConfig({
  root: path.resolve(rootDir, "client"),
  base: "/kansai-tour/",
  plugins: [react(), tailwindcss(), githubPagesSpa(), redirectBareRoot()],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "client/src"),
    },
  },
  build: {
    outDir,
    emptyOutDir: true,
  },
});
