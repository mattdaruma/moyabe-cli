import minimist from "minimist"

export interface MinimistOptions {
    options: minimist.Opts
    unknowns: string[]
}