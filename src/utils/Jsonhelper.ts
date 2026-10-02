import fs from 'fs'

export class JsonHelper{
    static readJSON(filepath:string):Record<string,string>[]{
        let file=fs.readFileSync(filepath,'utf-8')
        return JSON.parse(file)
    }
}