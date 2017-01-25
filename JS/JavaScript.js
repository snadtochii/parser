/// <reference path="jquery-3.1.1.js" />
$(function () {

    for (var i = 1; i < 7; i++) {
        new Clipboard("#btn" + i);
    }
    $(window).on('beforeunload', function () { return confirm(); })
    $("#TextArea1").on("change", parse);
    $("#TextArea1").on("change", parseInfo);
    $("#TextArea1").on("focus", function () { $(this).val(""); });
    $('#info').on('click', function () {
        $('#patientsInfo').toggle(300);
        if ($(this).html() == 'hide') {
            $(this).html('show');
            return;
        }
        $(this).html('hide');
    });

    $('#showStats').on('click', function () {
        $('#stats').slideToggle(300);

    })

    var obj = {};
    function parse() {
        var textP = $("#TextArea1").val();
        var pairs = [];


        var patterns = [/Case ID:.+\n/, /Surgery Type:\n.+\n/, /Surgeon Name:\n.+\n/, /Surgery Date:\n.+\n/];

        for (var i = 0; i < patterns.length; i++) {
            pairs[i] = patterns[i].exec(textP);
        }
        if (!pairs[1]) return;//для отмены перерисовки

        var key, value;
        for (var i = 0; i < pairs.length; i++) {
            if (!pairs[i]) continue;
            index = pairs[i].toString().indexOf(":")
            key = pairs[i].toString().substring(0, index);
            value = pairs[i].toString().substring(index + 2, pairs[i].toString().length - 1);
            obj[key] = value;
        }
        if (obj["Surgery Date"] == "Surgery date not defined.") { obj["Surgery Date"] = "TBD"; }
        else {
            var surDate = new Date(obj["Surgery Date"]);
            var day = ((surDate.getDate() < 10) ? ("0" + surDate.getDate()) : surDate.getDate())
            var month = ((surDate.getMonth() + 1) < 10) ? ("0" + (surDate.getMonth() + 1)) : (surDate.getMonth() + 1);
            obj["Surgery Date"] = day + "/" + month;

        }

        var date = new Date();
        var additional = { QE: "Sergey N.", current: (date.getDate() + "/" + (date.getMonth() + 1)) };
        for (var el in additional) {
            obj[el] = additional[el];
        }
        var cols = $("#row td input:first-child");
        var i = 0;
        for (var el in obj) {

            cols[i].value = obj[el];
            i++;
        }
        addStats();
        return JSON.stringify(obj);
    }
    function parseInfo(e) {
        var divInfo = document.getElementById("patientsInfo");

        var textP = e.target.value;
        var pairsInfo = [];
        var obj = {};

        var patternsInfo = [/First Name:\n.+\n/, /Middle Name:\n.+\n/, /Last Name:\n.+\n/, /Gender:\n.+\n/];

        for (var i = 0; i < patternsInfo.length; i++) {
            pairsInfo[i] = patternsInfo[i].exec(textP);
        }
        if (!pairsInfo[0]) return;//для отмены перерисовки

        var key, value;

        for (var i = 0; i < pairsInfo.length; i++) {
            if (!pairsInfo[i]) continue;
            index = pairsInfo[i].toString().indexOf(":")
            key = pairsInfo[i].toString().substring(0, index);
            value = pairsInfo[i].toString().substring(index + 2, pairsInfo[i].toString().length - 1);

            obj[key] = value;
        }

        $("#patientsInfo dl").remove();
        var dl = $('<dl></dl>');
        for (var el in obj) {
            var dt = $('<dt></dt>').html(el + ': ');
            var dd = $('<dd></dd>').html('<strong>' + obj[el] + '</strong>');
            dl.append(dt, dd);
        }
        $("#patientsInfo").append(dl);
    }
    var counter = 1;
    function addStats() {
        var rowStats = $("<tr></tr>");
        var number = $('<td></td>');
        number.html(counter);
        rowStats.append(number);
        for (var el in obj) {
            var col = $("<td></td>");
            col.html(obj[el]);
            rowStats.append(col);
        }
        $("#statsTable").prepend(rowStats);
        $('#showStats').html("Today: " + counter++ + " case(s)");
    }
})