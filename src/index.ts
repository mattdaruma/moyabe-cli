#!/usr/bin/env node
import { spawn } from 'child_process'
import { DefaultOptions } from './minimist-default-options'
import minimist from 'minimist'
import fs from 'fs'
import path from 'path'
import prompt from 'prompt-sync'

/**
 * process.argv[0] is the runtime environment.
 * process.argv[1] is the script's path on disk.
 * 
 * How to declare argument variables.  They will be put in 'unknowns' unless they're declared.
 *  DefaultOptions.string?.push('yo')
 * Now there would be args.yo with the argument value as a string.
 */
// 

const promptOptions = {
  sigint: true,
  eot: true,
  //history: a special function that takes a filename for a log
  autocomplete: (val: string): string[] => {
    return ['help', 'generate'].filter(v => v.toLowerCase().includes(val.toLowerCase()))
  }
} as prompt.Config
const userInput = prompt(promptOptions)


const renderFeedback = (fileName: string): string => {
  return fs.readFileSync(path.join(__dirname, 'feedback', `${fileName}.txt`), 'utf8')
}

const args = minimist(process.argv.slice(2), DefaultOptions.options)
let commandText = args._[0]?.trim().toLowerCase()

if(!commandText || commandText.length === 0) {
  console.log(`Valid commands are:\n  help\n  generate\n(Press TAB to autocomplete.)\n`)
  commandText = userInput('> ')
}else if ('help'.startsWith(commandText)) {
  console.log(renderFeedback('help-message'))
}else if ('generate'.startsWith(commandText)) {
  let genpath = `${__dirname}/commands/generate/index.js`
  let childArgs = process.argv.slice(3)
  childArgs.unshift(genpath)
  spawn('node', childArgs, {
    stdio: 'inherit' // share stdio pipes with this process
  })
}else if ('test'.startsWith(commandText)) {
  console.log('\nTest Successful\n')
} else{
  console.log(`Invalid command: ${commandText ?? '[NULL VALUE RECEIVED]'}\n\n${renderFeedback('help-message')}`)
}
