<%@ WebHandler Language="C#" Class="SettingsHandler" %>

using System;
using System.Web;
using Newtonsoft.Json;
using System.IO;

public class SettingsHandler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        //context.Response.Write("Hello World");
        string path = context.Request["newPath"];
        string pathSorce = context.Request["newSorce"];
        bool dOpen = Convert.ToBoolean(context.Request["dOpen"]);

        string JSONstring = File.ReadAllText("D:\\duducaon\\Dropbox\\JS\\LUT\\Parse\\config.json");

        Config set1 = JsonConvert.DeserializeObject<Config>(JSONstring);
        if (path != null)
        {
            set1.pathToWF = path;
        }
        if (pathSorce != null)
        {
            set1.pathToSorce = pathSorce;
        }

        set1.dOpen = dOpen;


        string config = JsonConvert.SerializeObject(set1);
        File.WriteAllText("D:\\duducaon\\Dropbox\\JS\\LUT\\Parse\\config.json", config);
        context.Response.Write(path);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}
