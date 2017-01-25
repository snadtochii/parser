<%@ WebHandler Language="C#" Class="Ch" %>

using System;
using System.Web;
using System.IO;
    


public class Ch : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";

        //string path = context.Request["path"];
        //string pat = context.Request["pattern"];

        string path = context.Request.Form["path"];
        string pat = context.Request.Form["pattern"];
        string row = "";
            //System.Threading.Thread.Sleep(2000);

        try
        {
            string[] files = Directory.GetFiles(path, pat, SearchOption.AllDirectories);
            foreach (string item in files)
            {
                row += item.Substring(path.Length - 1) + "\n";
            }
            if (row == "")
            {
                row = "Nothing found";
            }
        }
        catch (Exception e)
        {
            row = e.Message;
        }

        context.Response.Write(row);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}