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

function check()
{
    var e=localStorage.getItem("userID");
    var str={
        email: e
    };
    var req=createGET_BY_KEYRequest(tok, DB, Rel, JSON.stringify(str));
    jQuery.ajaxSetup({async:false});
    var obj=executeCommand(req,jpdbIRL);
    if(obj.status===400)
    {
        return;
    }
    
     var rec=(JSON.parse(obj.data)).record;
    jQuery.ajaxSetup({async:true});
     
     var pwd=$('#oldpwd').val();
     if(pwd===rec.Password)
     {
         $('#oldpwd').prop('disabled',true);
        $('#newpwd').focus();
        return;
     }
     else{
         $('#mymsg').html('Incorrect password');
        $('#mymsg').fadeOut(4000);
        $('#oldpwd').val("");
        $('#oldpwd').focus();
        return;
     }
    return;
}

function changePassword()
{
    var p=$('#newpwd').val();
    var re=$('#repwd').val();
    if(p!==re || p==="")
    {
        $('#mymsg').html('Passwords do not match!');
        $('#mymsg').fadeOut(4000);
        $('#newpwd').val("");
        $('#repwd').val("");
        return;
    }
    var str={
        Password: p
    };
    var req=createUPDATERecordRequest(tok,JSON.stringify(str),DB,Rel,localStorage.getItem("current record"));
    jQuery.ajaxSetup({async:false});
    var obj=executeCommand(req, jpdbIML);
    jQuery.ajaxSetup({async:true});
    console.log(obj);
    $('#mymsg').html('Password successfully changed');
        $('#mymsg').fadeOut(4000);
        $('#oldpwd').val("");
        $('#newpwd').val("");
        $('#repwd').val("");
        $('#oldpwd').prop('disabled',false);
        return;
}