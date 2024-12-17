import { spawn } from 'child_process'
import { exit } from 'process'
import { cyan, green, red, yellow } from './color.utils'
import {happy, mad} from "./emoticons.utils";

export interface CommandOptions<T = any> {
  command: string
  cwd: string
  startupMessage?: string
  successMessage?: string
  failedMessage?: string
  receiveLogs?: boolean
  log?: boolean
  ignoreExitCode?: boolean
  env?: { [key: string]: any }
}

export async function executeCommand<T = any>(
  options: CommandOptions<T>,
): Promise<string[]> {
  const logs: string[] = []
  console.debug(cyan(`\n${options.cwd}:`))
  console.debug(yellow(`λ ${options.command}`))
  if (options.startupMessage) { console.debug(cyan(options.startupMessage)) }
  const execCommand = spawn(options.command, [], {
    cwd: options.cwd || '.',
    env: { ...process.env, ...(options.env || {}) },
    shell: true,
    stdio: 'pipe',
  })
  return new Promise<string[]>((resolve, reject) => {
    execCommand.stdout.on('data', data => {
      if (options.receiveLogs) {
        logs.push(data.toString())
      }

      if (options.log === undefined || options.log) {
        console.error(data.toString())
      }
    })

    execCommand.stderr.on('data', data => {
      if (options.receiveLogs) {
        logs.push(data.toString())
      }

      if (options.log === undefined || options.log) {
        console.error(red(data.toString()))
      }
    })

    execCommand.on('error', err => {
      console.error(err.toString())
    })

    execCommand.on('close', exitCode => {
      if (exitCode !== 0) {
        if (options.failedMessage) {
          console.error(red(`${mad()} ${options.failedMessage}`))
        }
        if (options.ignoreExitCode) {
          return reject({
            message: options.failedMessage,
            reason: `Exited with code ${exitCode}`,
            logs,
          })
        }
        exit(exitCode)
      }

      if (options.successMessage) {
        console.info(happy() + green(` ${options.successMessage}`))
      }

      return resolve(logs)
    })
  })
}

export async function executeCommands<T = any>(
  cwd: string,
  commands: string[],
  options: Pick<CommandOptions<T>, 'env'>,
): Promise<void> {
  for (const command of commands) {
    await executeCommand({
      cwd,
      env: options.env,
      command,
    })
  }
}
