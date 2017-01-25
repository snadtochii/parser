<%@ WebHandler Language="C#" Class="FileControlerHandler" %>

using System;
using System.Web;
using System.IO;
using System.Diagnostics;
using System.Security.Permissions;


public class FileControlerHandler : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        string pathToWF = context.Request["pathToWF"];
        string pathToSorce = context.Request["pathToSorce"];
        string caseID = context.Request["caseID"];
        string surType = context.Request["surType"];
        bool openM = Convert.ToBoolean(context.Request["openM"]);
        bool dOpen = Convert.ToBoolean(context.Request["dOpen"]);
        //pathToSorce = "d:\\cmf\\sorce\\";
        //pathToWF   ="d:\\cmf\\";
        //caseID = "ME17-VAB-XAN";
        //surType = "PSI";
        //openM = true;
        //dOpen = true;
        //context.Request.Form

        string sorceFilePath = pathToSorce + surType + "_History.docx";
        string destinationFilePath = pathToWF + caseID + "\\" + caseID + "_History.docx";

        if ((caseID != "") && (surType != ""))
        {
            try
            {

                //FileIOPermission f2 = new FileIOPermission(FileIOPermissionAccess.AllAccess, "D:\\CMF\\ME17-PUS-ZEH\\111\\");
                Directory.CreateDirectory(pathToWF + caseID);
                //Directory.CreateDirectory("D:\\CMF\\ME17-PUS-ZEH\\111\\");
                //Directory.CreateDirectory("D:\\duducaon\\Dropbox\\JS\\LUT\\Parse\\11111\\");
                //Directory.CreateDirectory("..\\wf\\q1q1q1\\");//"D:\\duducaon\\Dropbox\\JS\\LUT\\Parse\\111\\

                if (!File.Exists(destinationFilePath))
                {
                    File.Copy(sorceFilePath, destinationFilePath, true);
                }
                //Process.Start("f:\\calc.html");
                Process.Start(destinationFilePath);
                if (openM)
                {
                    if (dOpen)
                    {
                        // Process.Start(destinationFilePath);
                        Process.Start("C:\\Program Files\\Materialise\\Mimics Medical 19.0\\MimicsMedical.exe");
                    }
                    //Process.Start(destinationFilePath);
                    Process.Start("C:\\Program Files\\Materialise\\Mimics Medical 19.0\\MimicsMedical.exe");
                }
            }
            catch (Exception e)
            {
                context.Response.Write("file not found" + e);
            }
        }
        context.Response.Write("Done!");
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}