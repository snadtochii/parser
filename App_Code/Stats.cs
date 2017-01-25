using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Сводное описание для Stats
/// </summary>
public class Stats
{
    [JsonProperty("stats")]
    public Step Step { get; set; }
}

public class Step
{
    [JsonProperty("caseID")]
    public string CaseID { get; set; }
    [JsonProperty("surType")]
    public string SurType { get; set; }
    [JsonProperty("current")]
    public string Current { get; set; }
    //public Step(string caseID, string surType, DateTime current)
    //{
    //    this.CaseID = caseID;
    //    this.SurType = surType;
    //    this.Current = current;
    //}
}