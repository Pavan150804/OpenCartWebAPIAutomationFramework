import xlsx from 'xlsx'

export class ExcelHelper{
    static readExcel(filepath:string,sheetname:string):Record<string,string>[]{
       let workbook= xlsx.readFile(filepath)
       let sheet=workbook.Sheets[sheetname];
      return xlsx.utils.sheet_to_json<Record<string,string>>(sheet!,{defval:""})
    }
}