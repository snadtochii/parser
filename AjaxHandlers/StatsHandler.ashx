<%@ WebHandler Language="C#" Class="StatsHandler" %>

using System;
using System.Web;
using System.IO;
using System.Collections.Generic;

using Newtonsoft.Json;



public class StatsHandler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        string newCaseID = context.Request["caseID"];
        string newSurType = context.Request["surType"];
        int day = Convert.ToInt32(context.Request["day"]);
        int month = Convert.ToInt32(context.Request["month"]);
        int year = Convert.ToInt32(context.Request["year"]);

        string newDate = year + "/" + month + "/" + day;


        //DateTime newDate = new DateTime(year, month, day);

        //string excStat = File.ReadAllText("D:\\duducaon\\Dropbox\\JS\\LUT\\Parse\\statistics.json");
        string excStat = File.ReadAllText("F:\\Dropbox\\JS\\LUT\\Parse\\statistics.json");

        //string strToWrite = excStat.Substring(0, excStat.Length - 2) + "," + newStat.Substring(1) + "}";

        List<Step> statList = JsonConvert.DeserializeObject<List<Step>>(excStat);

        string strToWrite = statList[1].SurType;


        //foreach (var item in statList)
        //{
        //    strToWrite += item.Step.SurType;
        //}

        CodeFirst.Case case1 = new CodeFirst.Case
        {
            CaseID = newCaseID,
            CaseType = newSurType,
            Date = newDate
        };

        CodeFirst.CaseContext caseContext = new CodeFirst.CaseContext();

        caseContext.Cases.Add(case1);
        caseContext.SaveChanges();




        //File.WriteAllText("D:\\duducaon\\Dropbox\\JS\\LUT\\Parse\\statistics.json", strToWrite);
        //File.WriteAllText("F:\\Dropbox\\JS\\LUT\\Parse\\statistics.json", strToWrite);

        context.Response.Write("");
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}