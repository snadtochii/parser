<%@ WebHandler Language="C#" Class="DBHandler" %>

using System;
using System.Web;
using System.Collections.Generic;

public class DBHandler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        //context.Response.Write("Hello World");
        //    public IEnumerable<CodeFirst.Case> GetCustomers()
        //    {
        //        // Создать объект контекста
        //        CodeFirst.CaseContext caseContent = new CodeFirst.CaseContext();

        //        return caseContent.Cases.AsQueryable();
        //    }
        //        CodeFirst.CaseContext caseContent = new CodeFirst.CaseContext();


        //    context.Response.Write(caseID + current);
    }

    public bool IsReusable
    {
        get
        {
            return true;
        }
    }

}