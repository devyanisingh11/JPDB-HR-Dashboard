/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIML = '/api/iml';
var jpdbIRL = '/api/irl';
var DB = 'EmpDB';
var Rel = 'UserRel';
var tok = '90938939|-31949289339902450|90941126';
var recno;


function disableform(ctr)
{
    $('#proname').prop('disabled',ctr);
    $('#prophone').prop('disabled',ctr);
}

function showData(obj)
{
    if(obj.status===400)
    {
        return;
    }
    
    var data=JSON.parse(obj.data);
    
    localStorage.setItem("current record",data.rec_no);
    var rec=data.record;
    console.log(rec);
    $('#proemail').val(rec.email);
    $('#proname').val(rec.name);
    $('#prophone').val(rec.Phone);
    disableform(true);
    return;
}

function showUser()
{
    var e=localStorage.getItem("userID");
    var str={
        email:e
    };
    var req=createGET_BY_KEYRequest(tok,DB,Rel,JSON.stringify(str));
    jQuery.ajaxSetup({async:false});
    var obj=executeCommand(req,jpdbIRL);
    showData(obj);
    jQuery.ajaxSetup({async:true});
    return;
}

function enableChange()
{
    disableform(false);
    $('#save').prop("disabled",false);
}


function validate() {

    var emailVar = $("#proemail").val();  
    
    var nameVar = $("#proname").val();  
    if (nameVar === "") {
        alert("Userame Required");
        $("#proname").focus();
        return "";
    }
    
    var phVar = $("#prophone").val();  
    if (phVar === "") {
        alert("Phone Number Required");
        $("#prophone").focus();
        return "";
    }
    
    var jsonStrObj = {
        email: emailVar,
        name: nameVar,
        Phone: phVar
    };
    return JSON.stringify(jsonStrObj);
}

function changeData()
{
    jsonchg=validate();
    var req=createUPDATERecordRequest(tok,jsonchg,DB,Rel,localStorage.getItem("current record"));
    jQuery.ajaxSetup({async:false});
    var obj=executeCommand(req, jpdbIML);
    jQuery.ajaxSetup({async:true});
    console.log(obj);
    disableform(true);
    
    $('#save').prop("disabled",true);
}