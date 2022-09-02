/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var tok='90938939|-31949289339902450|90941126';
var DB='EmpDB';
var Rel='UserRel';
var jpdbIML = '/api/iml';
var jpdbIRL = '/api/irl';


function reset(){
    $("#name").val("");
    $("#email").val("");
    $("#phone").val("");
    $("#pwd").val("");
    $("#repwd").val("");
}


function validate() {

    var nameVar = $("#name").val();  
    if (nameVar === "") {
        alert("Username Required");
        $("#name").focus();
        return "";
    }
    
    var emailVar = $("#email").val();  
    if (emailVar === "") {
        alert("Email ID Required");
        $("#email").focus();
        return "";
    }
    
    var phVar = $("#phone").val();  
    if (phVar === "") {
        alert("Phone number Required");
        $("#phone").focus();
        return "";
    }
    
    var pwdVar = $("#pwd").val();  
    if (pwdVar === "") {
        alert("Password Required");
        $("#pwd").focus();
        return "";
    }
    
    var reVar = $("#repwd").val();  
    if (reVar === "") {
        alert("Re-type Password");
        $("repwd").focus();
        return "";
    }
    
    if(reVar!==pwdVar)
    {
        alert("Passwords do not match!");
        reset();
        return "";
    }
    
    var jsonStrObj = {
        name: nameVar,
        email: emailVar,
        Phone: phVar,
        Password: pwdVar
    };
    return JSON.stringify(jsonStrObj);
}


function addData(){
    var jsonObj = validate();
    if(jsonObj==='')
    {return "";}
    var putReq=createPUTRequest(tok, jsonObj,DB, Rel);
    jQuery.ajaxSetup({async: false});
    var resObj=executeCommand(putReq, jpdbIML);
    jQuery.ajax({async: true});
    if(resObj.status === 200){
        $('#myRegFormMsg').prop('class','alert-success');
        $('#myRegFormMsg').html('Successfully Registered');
        setInterval(function(){
            window.location.replace('login.html');
        },2000);
    }
    else{
        $('#myRegFormMsg').html('Successfully Registered');
        $('#myRegFormMsg').fadeOut(2000);
        reset();
    }
}

function checkEmail()
{
    var e=$('#email').val();
    var str={
        email: e
    };
    var req=createGET_BY_KEYRequest(tok,empDB,Rel,JSON.stringify(str));
    jQuery.ajaxSetup({async:false});
    var obj=executeCommand(req,jpdbIRL);
    jQuery.ajaxSetup({async:true});
    if(obj.status===200)
    {
        $('#myRegFormMsg').html('Email-id already Registered');
        setInterval(function(){
            $('#myRegFormMsg').html('');
        },2000);
        $('#email').val('');
        $('#email').focus();
    }
}

function checkPhone()
{
    var p=$('#phone').val();
    var str={
        Phone: p
    };
    var req=createGET_BY_KEYRequest(tok,empDB,Rel,JSON.stringify(str));
    jQuery.ajaxSetup({async:false});
    var obj=executeCommand(req,jpdbIRL);
    jQuery.ajaxSetup({async:true});
    if(obj.status===200)
    {
        $('#myRegFormMsg').html('Email-id already Registered');
        setInterval(function(){
            $('#myRegFormMsg').html('');
        },2000);
        $('#email').val('');
        $('#email').focus();
    }
}
