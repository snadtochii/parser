using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


/// <summary>
/// Сводное описание для Config
/// </summary>
public class Config
{
    public string pathToWF { get; set; }
    public string pathToSorce { get; set; }
    public bool dOpen { get; set; }
    public Config(string path, string pathSorce, bool dOpen)
    {
        this.pathToWF = path;
        this.pathToSorce = pathSorce;
        this.dOpen = dOpen;
    }
}
