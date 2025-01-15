import minimist from "minimist"
import { MinimistOptions } from "./minimist-options.interface"
const unknowns: string[] = []
export const DefaultOptions: MinimistOptions = {
    options: {
        string: [],
        boolean: [],
        alias: {},
        default: {},
        stopEarly: false,
        '--': false,
        unknown: (val: string) => {
            if(/^[a-zA-Z]+$/.test(val)) return true
            unknowns.push(val)
            return false
        }
    },
    unknowns: unknowns
}