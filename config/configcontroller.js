const xlsx = require("xlsx");
//物品配置表
var itemworkbook = xlsx.readFile("./config/Item.xlsx")
let itemconfig = {};
const itemsheetnames = itemworkbook.SheetNames;
const itemworksheet = itemworkbook.Sheets[itemsheetnames[0]];
exports.loaditemconfig = () =>
{
    itemconfig = xlsx.utils.sheet_to_json(itemworksheet);
    console.log("itemconfig="+itemconfig.length);
}

exports.getitemconfig = () =>
{
    return itemconfig || {};
}

//许愿价格配置表
var wishworkbook = xlsx.readFile("./config/Wish.xlsx")
let wishconfig = {};
const wishsheetnames = wishworkbook.SheetNames;
const wishworksheet = wishworkbook.Sheets[wishsheetnames[0]];
exports.loadwishconfig = () =>
{
    wishconfig = xlsx.utils.sheet_to_json(wishworksheet);
    console.log("wishconfig=" + wishconfig.length);
}

exports.getwishconfig = () =>
{
    console.log("getwishconfig=" + wishconfig.length);
    return wishconfig;
}

exports.loadallconfig = () =>
{
    loaditemconfig();
    loadwishconfig();
}