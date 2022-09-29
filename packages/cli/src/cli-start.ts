import { cac } from 'cac'
import { loadConfig } from '@unocss/config'
import { toArray } from '@unocss/core'
import { version } from '../package.json'
import type { CliOptions } from './types'
import { build } from './index'

export async function startCli(cwd = process.cwd(), argv = process.argv, options: CliOptions = {}) {
  const cli = cac('unocss')

  cli
    .command('[...patterns]', 'Glob patterns', {
      ignoreOptionDefaultValue: true,
    })
    .option('-o, --out-file <file>', 'Output file', {
      default: cwd,
    })
    .option('-c, --config [file]', 'Config file')
    .option('-w, --watch', 'Watch for file changes')
    .option('--preflights', 'Enable preflights', { default: true })
    .option('-m, --minify', 'Minify generated CSS', { default: false })
    .action(async (patterns: Array<string>, flags) => {
      Object.assign(options, {
        cwd,
        ...flags,
      })

      if (patterns)
        options.patterns = patterns
      const { config } = await loadConfig(cwd, options.config)

      const entries = toArray(config.cli?.entry || options)
      await Promise.all(entries.map(entry =>
        build({
          ...options,
          ...entry,
        }),
      ))
    })

  cli.help()
  cli.version(version)

  // Parse CLI args without running the command to
  // handle command errors globally
  cli.parse(argv, { run: false })
  await cli.runMatchedCommand()
}
