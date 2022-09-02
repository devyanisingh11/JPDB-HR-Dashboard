/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var tok='90938939|-31949289339902450|90941126';
var DB='EmpDB';
var Rel='UserRel';
var jpdbIML = '/api/iml';
var jpdbIRL = '/api/irl';

function checkUser(){
    console.log("checkuser");
    var email=$('#email').val();
    var pwd=$('#pwd').val();
    var jsonStr={
        email: email
    };
    var getReq=createGET_BY_KEYRequest(tok,DB,Rel,JSON.stringify(jsonStr));
    jQuery.ajaxSetup({async:false});
    var jsonObj=executeCommand(getReq,jpdbIRL);
    if(jsonObj.status===400)
    {
        $('#mymsg').html('Incorrect email or password');
        $('#mymsg').fadeOut(4000);
        $('#email').val("");
        $('#pwd').val("");
        
    }
    else if(jsonObj.status===200)
    {
        if((JSON.parse(jsonObj.data).record).Password===pwd)
            createSession(email);
        else{
             $('#mymsg').html('Incorrect email or password');
        $('#mymsg').fadeOut(4000);
        $('#email').val("");
        $('#pwd').val("");
        }
    }
    jQuery.ajaxSetup({async:true});
}

function createSession(email)
{
    var st=createJpdbSessionToken(tok,1,DB,Rel,email);
    console.log(st);
    if(st===200)
    {
        if(localStorage.getItem('req-url')!==null){
            window.location.href=localStorage.getItem('res-url');
            localStorage.removeItem('res-url');
            
        }
        else window.location="home.html";
    }
    else{
        $('#email').val("");
        $('#pwd').val("");
        alert("Unable to login");
        return;
    }
    return;
}
