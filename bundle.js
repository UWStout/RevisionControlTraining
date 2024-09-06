import fs from 'fs'
import esbuild from 'esbuild'

// Look for server and dev modes
let _DEV_ = process.argv.includes('dev')
const _SERVE_ = process.argv.includes('serve')

if (_SERVE_) {
  console.log('Doing development build with static server')
  _DEV_ = true
} else if (_DEV_) {
  console.log('Doing development build')
} else {
  console.log('Doing production build')
}

async function doBuild () {
  // Set up the build options
  const options = {
    entryPoints: ['client/index.jsx'],
    outdir: 'public',
    bundle: true,
    define: {
      'process.env.NODE_ENV': _DEV_ ? '"development"' : '"production"'
    },
    target: 'es2018',
    external: ['*.woff2'],
    loader: { '.woff': 'binary', '.woff2': 'binary' },
    minify: !_DEV_,
    sourcemap: _DEV_,
    logLevel: 'info'
  }

  if (_DEV_) {
    // Create esbuild context and start watch
    const ctx = await esbuild.context(options)

    process.on('SIGINT', async () => {
      await ctx.dispose()
      process.exit(0)
    })

    // Serve or watch files
    if (_SERVE_) {
      await ctx.serve({
        servedir: 'public',
        port: 3000
      })
    } else {
      await ctx.watch()
    }
  } else {
    // Do the build
    esbuild
      .build(options)
      .then(() => {
        console.log('Build succeeded.')
      })
      .catch((e) => {
        console.error('Error building:')
        console.error(e)
        process.exit(1)
      })
  }
}

doBuild()
