<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;
using System.IO;
using System.Diagnostics;
using System.Security.Permissions;


public class Handler : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        context.Response.Write("Hello World");
        //pathToSorce = "d:\\cmf\\sorce\\";
        //pathToWF   ="d:\\cmf\\";
        //caseID = "ME17-VAB-XAN";
        //surType = "PSI";
        //openM = true;
        //dOpen = true;
        Process.Start("D:\\duducaon\\Dropbox\\JS\\LUT\\Parse\\qc\\QChelper.exe");
            Directory.CreateDirectory("D:\\duducaon\\Dropbox\\JS\\LUT\\Parse\\qc\\111\\");
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}