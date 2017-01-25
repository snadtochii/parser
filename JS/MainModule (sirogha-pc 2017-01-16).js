/// <reference path="Module1 - копия.js" />
/// <reference path="jquery-3.1.1.js" />
/// <reference path="ConfigGetter.js" />
/// <reference path="FileControler.js" />
/// <reference path="Module1.js" />
/// <reference path="Statistics.js" />
; $(function () {

    for (var i = 1; i < 7; i++) {
        new Clipboard('#btn' + i);
    }
    new Clipboard('#copyPath');
    new Clipboard('#genFiles');

    var patterns = [/Case ID:.+\n/, /Surgery Type:\n.+\n/, /Surgeon Name:\n.+\n/, /Surgery Date:\n.+\n/];
    var patternsInfo = [/First Name:\n.+\n/, /Middle Name:\n.+\n/, /Last Name:\n.+\n/, /Gender:\n.+\n/];

    var day;
    var month;
    var additional = { QE: "Sergey N." };

    var input = { patterns: patterns, additional: additional, patternsInfo: patternsInfo };

    var prevCaseInfo, prevPatientInfo;

    var pathToWF;
    var pathToSorce;
    var dOpen;
    var generationData;
    var newStat = [];
    //var newCase;

    $.getJSON("config.json", function (confData) {
        pathToWF = confData.pathToWF;
        pathToSorce = confData.pathToSorce;
        dOpen = confData.dOpen;
    });
    $(window).on('beforeunload', function () {
        console.log(111);
        return false
    });

    $('#temp').click(function () {
        if (!$.isEmptyObject(newStat)) {
            statControler.sendStats(newStat);
        }
    });
    var stats;//= statControler.getStats();
    //$.getJSON("statistics.json", function (data) { stats = data.stats });
    //alert(JSON.stringify(stats));
    var stats;
    $('#tempGet').click(function () {
        //= statControler.getStats();
        var counter = 0;
        $.getJSON("statistics.json", function (data) { stats = data.stats }).done(function () {
            //stats = statControler.getStats();
            for (var i = 0; i < stats.length; i++) {
                if ($.isEmptyObject(stats[i])) continue;
                console.dir(stats[i]["caseID"]);
                counter++
            }
            alert(counter);
        });
    });
    $('#TextArea1').change(function () {
        var date = new Date();
        day = ((date.getDate() < 10) ? ("0" + date.getDate()) : date.getDate())
        month = ((date.getMonth() + 1) < 10) ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1);
        additional.current = (day + "/" + month);


        input.textToParse = $(this).val();
        var newCase = new Module.Case(input);

        if (!((newCase.caseInfo) && ((!prevCaseInfo) || (newCase.caseInfo["Case ID"] != prevCaseInfo["Case ID"])))) return;

        newCase.fillTable();
        newCase.fillInfo();
        newCase.addStats();

        var path = (pathToWF + newCase.caseInfo["Case ID"] + "\\" + newCase.caseInfo["Case ID"] + ".mcs");
        $('#copyPath').attr("data-clipboard-text", path)

        prevCaseInfo = newCase.caseInfo;
        prevPatientInfo = newCase.patientInfo;

        var patForLastWord = /(\w+)$/;
        generationData = {
            pathToSorce: pathToSorce,
            pathToWF: pathToWF,
            caseID: newCase.caseInfo["Case ID"],
            surType: patForLastWord.exec(newCase.caseInfo["Surgery Type"])[0]
        };

        $('#copyPath').attr("title", $('#copyPath').attr("data-clipboard-text"));


        var fileCheckConfig = {
            path: pathToWF + newCase.caseInfo["Case ID"] + "\\",
            pattern: "*.stl"
        }
        //this.settings = {
        //    url: "../AjaxHandlers/Ch.ashx",
        //    type: "POST",
        //    data: fileCheckConfig
        //}



        //$.post("../AjaxHandlers/Ch.ashx", fileCheckConfig).done(function (data) {
        //    alert(data);
        //});




        // $.ajax(this.settings).done(function (data) {
        // alert(data)});

        // $.post("../AjaxHandlers/Ch.ashx", fileCheckConfig, function (data) {
        //     alert(data);
        // });

                                                        this.statToWrite = {
                                                            //num: statsCounter,
                                                            caseID: newCase.caseInfo["Case ID"],
                                                            surType: newCase.caseInfo["Surgery Type"],
                                                            day: date.getDate().toString(),
                                                            month: date.getMonth().toString(),
                                                            year: date.getFullYear().toString()
                                                            // newCase.caseInfo["current"]
                                                        }
                                                        statControler.sendStats(this.statToWrite);

        //newStat.push(this.statToWrite);

    });

    $('#TextArea1').focus(function () { $(this).val(""); });
    $('#info').click(function () {
        $('#patientsInfo').toggle(300);
        if ($(this).html() == 'hide') {
            $(this).html('show');
            return;
        }
        $(this).html('hide');
    });
    $('#showStats').click(function () { $('#stats').slideToggle(300); });
    $('#copyPath').click(function () {
        if ($('#copyPath').attr("data-clipboard-text")) {
            $('#copyStatus').slideDown("fast").delay(3000).slideUp("slow");
        }
    });
    $('#genFiles').click(function () {
        if (!generationData) return;

        generationData.openM = $('#openM').prop("checked");
        generationData.dOpen = false;
        if (generationData.openM) {
            if (generationData.surType.toLowerCase() === "reconstruction") {
                generationData.dOpen = dOpen;
            }
        }
        fileControler.func(generationData);
    });

    $('#Text2').change(function () {
        generationData.surType = $(this).val();
    });
    $('#Text2').dblclick(function () {
        $('#change').css("display", "block");
        var surType = $('.surType');
        var curSurType = $('#Text2').val();

        for (var i = 0; i < surType.length; i++) {
            if ($(surType[i]).val() === curSurType) {
                $(surType[i]).prop("checked", true);
            }
        }
    });
    // $('[name="changeSurType"]').change(() => {
    //     $('#change').css("display", "none");
    //     var inp = $("#row td input:first-child")[1];
    //     var pas = $('#change input:checked');

    //     $(inp).val($(pas).val());
    //     generationData.surType = $(pas).val();
    // });
    $('#change').blur(() => {
        $(this).css("display", "none")
    });
    $('#change').on("change", () => {
        if (!generationData) return;
        $(this).css("display", "none");
        var inp = $('#row td input:first-child')[1];
        var pas = $('#change option:selected');

        $(inp).val($(pas).val());
        generationData.surType = $(pas).val();
    });

    $('button').click(function () {
        $('#change').css("display", "none");
    });


    $('#rejection').click(function () {
        $('#create-rej-text').slideToggle(150);
        $('#rej').slideToggle(300);
    })











    $('#settingsBtn').click(function () {
        $.getJSON("config.json", function (confData) {
            pathToWF = confData.pathToWF;
            pathToSorce = confData.pathToSorce;
            dOpen = confData.dOpen;

            $('#addPathToWF').val(pathToWF);
            $('#addPathToSF').val(pathToSorce);
            if (dOpen) {
                $('#openDoubleMimCheckbox').prop("checked", true);
                return;
            }
            $('#openDoubleMimCheckbox').prop("checked", false);
        });
    });



});