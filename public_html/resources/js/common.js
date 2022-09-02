/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


var tok='90938939|-31949289339902450|90941126';
var empDB='EmpDB';
var empRel='EmpData';
var userRel='userRel';
var sessRel='UserRelSession';
var jpdbIML = '/api/iml';
var jpdbIRL = '/api/irl';

function checkSession(myStatus, myName)
{
    console.log('Checking Session'+myName);
    var status=isJpdbSessionTokenExists(getJpdbSessionToken(),empDB,userRel);
    console.log('session status'+status);
    if(status===400)
    {
        if(myStatus==='in')
        {
            window.location.href='login.html';
        }
        else{return;}
        
    }
    else if(status===200)
    {
        if(myStatus==='out'){
            window.location.href='home.html';
        }
        else return;
    }
    return;
}

function loadName()
{
    var email=localStorage.getItem('userID');
    $('#myUser').html(email);
    return;
}

function currentTab()
{
    if(myName === "home")
    {
        $('#myhome').prop('class','active');
        return;
    }
    if(myName === "profile")
    {
        $('#myprofile').prop('class','active');
        return;
    }
    if(myName === "change")
    {
        $('#mychange').prop('class','active');
        return;
    }
    if(myName === "form")
    {
        $('#myform').prop('class','active');
        return;
    }
    
    return;
}


function loadheader()
{
    $("#myheader").load("resources/header.html");
    currentTab();
    loadName();
    return;
}


function loadfooter()
{
    $('#myfooter').load("resources/footer.html");
    return;
}

function deleteSession()
{
    var remsess=removeSessionTokenFromJPDB(tok,empDB,userRel);
    if(remsess===200)
    {
        console.log('Session removed');
        localStorage.removeItem('current record');
        localStorage.removeItem('userID');
        localStorage.removeItem('jpdbUserSessionToken');
        window.location.replace('login.html');
    }
    else return;
}