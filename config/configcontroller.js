const xlsx = require("xlsx");
//��Ʒ���ñ�
var itemworkbook = xlsx.readFile("./config/Item.xlsx")
let itemconfig = {};
const itemsheetnames = itemworkbook.SheetNames;
const itemworksheet = itemworkbook.Sheets[itemsheetnames[0]];
function loaditemconfig() 
{
    itemconfig = xlsx.utils.sheet_to_json(itemworksheet);
}

exports.getitemconfig = () =>
{
    return itemconfig || {};
}

//��Ը�۸����ñ�
var wishworkbook = xlsx.readFile("./config/Wish.xlsx")
let wishconfig = {};
const wishsheetnames = wishworkbook.SheetNames;
const wishworksheet = wishworkbook.Sheets[wishsheetnames[0]];
function loadwishconfig()
{
    wishconfig = xlsx.utils.sheet_to_json(wishworksheet);
}

exports.getwishconfig = () =>
{
    return wishconfig;
}

exports.loadallconfig = () =>
{
    loaditemconfig();
    loadwishconfig();
}

//��ֵ���ñ�
var chargeworkbook = xlsx.readFile("./config/Charge.xlsx")
let chargeconfig = {};
const chargesheetnames = chargeworkbook.SheetNames;
const chargeworksheet = chargeworkbook.Sheets[chargesheetnames[0]];
function loadchargeconfig()
{
    chargeconfig = xlsx.utils.sheet_to_json(chargeworksheet);
}

exports.getchargeconfig = () =>
{
    return chargeconfig;
}

exports.loadallconfig = () =>
{
    loaditemconfig();
    loadwishconfig();
    loadchargeconfig();
}