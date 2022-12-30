import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as  Excel  from'exceljs';
import * as jsonData from './excelJsonData.json';


@Injectable()
export class AppService {
  
  
 //-------------------------------------------------------------------------//

newExcejsFn(){
  let data1 =[];
  jsonData.forEach((e)=>{
    let service_Id= e.id;
    let project_Name = e.name;
    let temp = e.createdAt;
    let temp1 = e.serviceDate;
    let date = new Date(temp);
    let date1 = new Date(temp1);
    let requested_On = date.toLocaleDateString("en-Us");
    let service_Date = date1.toLocaleDateString("en-US");
    let contact_Name = e.fullname;
    let contact_Email = e.email;
    let contact_Number = e.contactNumber;
    let service_Requested_And_Status = e.serviceItems[0].serviceLabel+' & '+ e.serviceItems[0].status;

    data1.push(
      {
        service_Id:service_Id,
        project_Name:project_Name,
        requested_On:requested_On,
        service_Date:service_Date,
        contact_Name:contact_Name,
        contact_Email:contact_Email,
        contact_Number:contact_Number,
        service_Requested_And_Status:service_Requested_And_Status
      }
    )

  })
let workbook = new Excel.Workbook();
let worksheet = workbook.addWorksheet('Debtors');

worksheet.columns = [
  {header: 'SERVICE ID',   key: 'service_Id'   , width: 10,},
  {header: 'PROJECT NAME', key: 'project_Name' , width: 30,},
  {header: 'REQUESTED ON', key: 'requested_On' , width: 15,},
  {header: 'SERVICE DATE', key: 'service_Date' , width: 15,},
  {header: 'CONTACT NAME', key: 'contact_Name' , width: 25,},
  {header: 'CONTACT EMAIL', key:'contact_Email', width: 25,},
  {header: 'CONTACT NUMBER', key: 'contact_Number' , width: 18,},
  {header: 'SERVICE REQUESTED & STATUS', key: 'service_Requested_And_Status' , width: 30,}
];



// fill  Header  background.
worksheet.eachRow(function(row,rowNumber){
  row.eachCell((cell,colNumber)=>{
    if(rowNumber == 1){
      // First set the background of header row.
      cell.fill = {
        type:'pattern',
        pattern:'solid',
        fgColor:{argb:'D3D3D3'} // silver  C0C0C0 // platinum E5E4E2 // light gray D3D3D3
      }
    }
  })
})

/* Make the header bold. */
// Note: in Excel the rows are 1 based, meaning the first row is 1 instead of 0.
worksheet.getRow(1).font = {bold: true,color:{'argb':'313130'}};  //{'font': {'size': 12,'color': {'argb': 'FFCCFFCC'}
                                          //{'font': {'bold': true,'size': 12,'color': {'theme': 1},
// insert the data into excel.
data1.forEach((e, index) => {
  // row 1 is the header.
  const rowIndex = index + 2;

  // By using destructuring we can easily dump all of the data into the row without doing much
  // We can add formulas pretty easily by providing the formula property.
  worksheet.addRow({
    ...e,
  })
})
// Set the way columns C - F are formatted
worksheet.getColumn(1).alignment = {horizontal: 'center'}

// Keep in mind that reading and writing is promise based.
  workbook.xlsx.writeFile('newData.xlsx')
 }
}
