import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()], // your config
  test: {
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
  },
})
