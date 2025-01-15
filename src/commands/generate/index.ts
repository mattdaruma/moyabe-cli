#!/usr/bin/env node
import { spawn } from 'child_process';
import { DefaultOptions } from '../../minimist-default-options'
import fs from 'fs'
import path from 'path'

const args = require('minimist')(process.argv.slice(2), DefaultOptions)
let commandText = args._[0]?.trim().toLowerCase()

if (!commandText || commandText.length === 0) {

    console.log("\nNo command text received for generate.\n")

    process.exit(1)
} else if ('app'.includes(commandText.toLowerCase())) {
    let appName = args._[1] ?? 'moyabe-app-template'
    if (!appName || appName.length === 0) appName = 'moyabe-app-template'

    console.log('\nCreating Angular app...\n')

    spawn('ng', ['new', appName, '--style=scss', '--ssr=false'], {
        stdio: 'inherit' // share stdio pipes with this process
    }).on('close', code => {
        if(code != 0) throw("Error creating Angular app")

        console.log('\nApp created.\nInstalling Clarity Design modules...\n')

        spawn('npm', ['install', '@clr/ui', '@clr/angular', '@cds/core', '--save'], {
            cwd: appName,
            stdio: 'inherit' // share stdio pipes with this process
        }).on('close', code => {
            if(code != 0) throw("Error installing Clarity Modules")

            console.log('\nModule installed.\nAdding Clarity styles to package.json...\n')

            let angularPath = path.join(appName, 'angular.json')
            let angular = JSON.parse(fs.readFileSync(angularPath, 'utf8'))
            let styles = angular['projects']['prompt-builder']['architect']['build']['options']['styles']
            styles.push("node_modules/@cds/core/global.min.css")
            styles.push("node_modules/@cds/core/styles/theme.dark.min.css")
            styles.push("node_modules/@clr/ui/clr-ui.min.css")
            fs.writeFileSync(angularPath, JSON.stringify(angular, null, 2))

            console.log('\nStyles added.  Activating dark theme in index.html...\n')

            let indexHtmlPath = path.join(appName, 'src', 'index.html')
            let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8')
            indexHtml = indexHtml.replace('<body>', '<body cds-theme="dark">')
            fs.writeFileSync(angularPath, indexHtml)

            console.log('\nDark theme added.  Replacing stock app.component html...\n')
        
            let templateTsPath = path.join(__dirname, 'app.component.template.ts')
            let templateTs = fs.readFileSync(templateTsPath, 'utf8')
            let templateHtmlPath = path.join(__dirname, 'app.component.template.html')
            let templateHtml = fs.readFileSync(templateHtmlPath, 'utf8')
            let appTsPath = path.join(appName, 'src', 'app', 'app.component.ts')
            let appHtmlPath = path.join(appName, 'src', 'app', 'app.component.html')
            templateTs = templateTs.replace('{{APPTITLE}}', appName)
            fs.writeFileSync(appHtmlPath, templateHtml)
            fs.writeFileSync(appTsPath, templateTs)
        
            console.log('\nComponent code replaced.\n')

            console.log('\nApp template ready!\n')

        })
    });
} else if ('start'.startsWith(commandText)) {


    // spawn('ng', ['serve'], {
    //     cwd: appName,
    //     stdio: 'inherit' // share stdio pipes with this process
    // })
}  else {

    console.log(`\n${commandText} is not a valid generate command.\n`)

    process.exit(1)
}