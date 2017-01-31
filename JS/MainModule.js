/// <reference path="Module1 - копия.js" />
/// <reference path="jquery-3.1.1.js" />
/// <reference path="ConfigGetter.js" />
/// <reference path="FileControler.js" />
/// <reference path="Module1.js" />
/// <reference path="Statistics.js" />
; $(function () {

    $('button').button();

    // $('#infoConteiner').tabs({
    //     collapsible: true
    // });

    new Clipboard('.copy');

    new Clipboard('#copyPath, .copyGraft');
    new Clipboard('#genFiles');
    // $('#copySet').buttonset();

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
    var fileCheckConfig;

    $.getJSON("config.json", function (confData) {
        pathToWF = confData.pathToWF;
        pathToSorce = confData.pathToSorce;
        dOpen = confData.dOpen;
    });
    //     $(window).on('beforeunload', function () { 
    //     return false });

    $('#temp').click(function () {
        if (!$.isEmptyObject(newStat)) {
            statControler.sendStats(newStat);
        }
    });
    var stats;//= statControler.getStats();
    //$.getJSON("statistics.json", function (data) { stats = data.stats });
    //alert(JSON.stringify(stats));
    var stats;
    // $('#tempGet').click(function () {
    //     //= statControler.getStats();
    //     var counter = 0;
    //     $.getJSON("statistics.json", function (data) { stats = data.stats }).done(function () {
    //         //stats = statControler.getStats();
    //         for (var i = 0; i < stats.length; i++) {
    //             if ($.isEmptyObject(stats[i])) continue;
    //             console.dir(stats[i]["caseID"]);
    //             counter++
    //         }
    //         alert(counter);
    //     });
    // });
    $('#TextArea1').change(function () {

        var date = new Date();
        day = ((date.getDate() < 10) ? ("0" + date.getDate()) : date.getDate())
        month = ((date.getMonth() + 1) < 10) ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1);
        additional.current = (day + "/" + month);


        input.textToParse = $(this).val();
        var newCase = new Module.Case(input);

        if (!((newCase.caseInfo) && ((!prevCaseInfo) || (newCase.caseInfo["Case ID"] != prevCaseInfo["Case ID"])))) return;
        $('#stlCheckStatus').css("display", "none");
        var copyDefault = [".mcs", "_fibula.mcs", "_hip.mcs", "_scapula.mcs"];

        newCase.fillTable();
        newCase.fillInfo();
        newCase.addStats();

        $('#copyPath, .copyGraft').each(function (i) {$(this).attr("data-clipboard-text", copyDefault[i]);});
        $('#copySet').fadeToggle("fast");

        var path = (pathToWF + newCase.caseInfo["Case ID"] + "\\" + newCase.caseInfo["Case ID"]);

        $('#copyPath, .copyGraft').each(function () {
            $(this).attr("data-clipboard-text", path + $(this).attr("data-clipboard-text"))
        });


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


        fileCheckConfig = {
            path: pathToWF + newCase.caseInfo["Case ID"] + "\\",
            pattern: "*.stl"
        }

        Checker.sendCheckRequest(fileCheckConfig);



        this.statToWrite = {
            //num: statsCounter,
            caseID: newCase.caseInfo["Case ID"],
            surType: newCase.caseInfo["Surgery Type"],
            current: newCase.caseInfo["current"]
        }
        newStat.push(this.statToWrite);

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
    $('#copyPath .copyGraft').click(function () {
        if ($(this).attr("data-clipboard-text")) {
            $('#copyStatus').slideDown("fast").delay(3000).slideUp("slow");
        }
    });
    var timeOutID = null;
    $('#copyPath').mousedown(function () {
        timeOutID = setTimeout(function () {
        $('#copySet').fadeToggle("fast");
        }, 1000);
    }).on("mouseup mouseleave", function () {
        clearTimeout(timeOutID);
    });

    $('#stlCheckStatus').click(() => {
        if (!fileCheckConfig) return;
        Checker.sendCheckRequest(fileCheckConfig);
    })

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
        $('#wrapper-change-sur-type').css("display", "block");
        $('#change').css("display", "block");
        changePanelVissible = true;
    });

    $('#change').click((e) => {
        e.stopPropagation();
    });
    $('#change').change(() => {
        $('#wrapper-change-sur-type').css("display", "none");
        $('#change').css("display", "none")
        if (!generationData) return;
        var inp = $('#row td input:first-child')[1];
        var pas = $('#change option:selected');

        $(inp).val($(pas).val());
        generationData.surType = $(pas).val();

    });
    $('#wrapper-change-sur-type').click(() => {
        $('#wrapper-change-sur-type').css("display", "none");
        $('#change').css("display", "none")
    });

    $('#rejection').click(function () {
        setTimeout(() => {
            var checkedInputs = $('.rej input').filter(":checked").each(function () {
                $(this).delay(1000).trigger("click");
                $(this).prop("checked", false);
            });
        }, 500);


        $('#rej1').fadeToggle(300);
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