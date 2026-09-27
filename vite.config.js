import { defineConfig } from 'vite';

// base: './' — относительные пути к ассетам. Сборка одинаково работает
// на https://<user>.github.io/<repo>/ и на собственном домене, без правки конфига.
// При необходимости путь можно задать явно: BASE_PATH=/my-repo/ npm run build
export default defineConfig({
  base: process.env.BASE_PATH || './',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
