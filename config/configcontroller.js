const xlsx = require("xlsx");
var workbook = xlsx.readFile("./config/Item.xlsx")
let itemconfig = {};
const sheetNames = workbook.SheetNames;
const worksheet = workbook.Sheets[sheetNames[0]];


exports.loaditemconfig = () =>
{
    itemconfig = xlsx.utils.sheet_to_json(worksheet);
}

exports.getitemconfig = () =>
{
    return itemconfig || {};
}