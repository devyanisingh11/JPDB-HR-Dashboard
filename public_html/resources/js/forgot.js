/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


var tok='90938939|-31949289339902450|90941126';
var DB='EmpDB';
var Rel='UserRel';
var jpdbIML = '/api/iml';
var jpdbIRL = '/api/irl';

function sendMail()
{
    var e=$('#email').val();
    var str={
        email: e
    };
    var req=createGET_BY_KEYRequest(tok,DB,Rel,JSON.stringify(str));
    jQuery.ajaxSetup({async:false});
    var obj=executeCommand(req,jpdbIRL);
    if(obj.status===400)
    {
        $('#mymsg').html('Incorrect email');
        $('#mymsg').fadeOut(4000);
        $('#email').val("");        
    }
    else{
        var pwd=(JSON.parse(obj.data).record).Password;
        var s={
            emailTo: e,
            emailSubject: "Forgot Login Password",
            emailContent: "Your login password is " + pwd
        };
        var ereq=createEmailToSendReq(tok, JSON.stringify(s));
        var eobj=executeCommand(ereq,"/serverless/send_email");
        if(eobj.status===200)
        {
            alert("Password email sent!");
            window.location.replace('login.html');
            return;
        }
        else console.log(obj.status);
    }
    jQuery.ajaxSetup({async:true});
    return;
}