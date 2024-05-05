const { GasPlugin } = require('esbuild-gas-plugin')

require('esbuild')
  .build({
    entryPoints: ['src/app.ts'],
    bundle: true,
    outfile: 'public/app.js',
    tsconfig: 'tsconfig.json',
    plugins: [GasPlugin],
  })
  .catch(() => process.exit(1))
