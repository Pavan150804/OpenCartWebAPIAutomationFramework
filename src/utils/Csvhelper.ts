import fs from 'fs'
import {parse} from 'csv/sync'
export class CSVHelper{
    static readcsv(filepath:string):Record<string,string>[]{
        return parse(fs.readFileSync(filepath,'utf-8'),{
            columns:true, //first rows as headers
            skip_empty_lines:true,
            trim:true
        }) as Record<string,string>[]
    }
}