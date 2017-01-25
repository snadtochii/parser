/// <reference path="jquery-3.1.1.js" />
; var Module = (function () {
    function _Case(input) {
        this.caseInfo = _parse(input.textToParse, input.patterns, input.additional);
        this.patientInfo = _parseInfo(input.textToParse, input.patternsInfo);
    }
    _Case.prototype.fillTable = _fillTable;
    _Case.prototype.fillInfo = _fillInfo;
    _Case.prototype.addStats = _addStats;

    function _parse(textToParse, patterns, additional) {
        var obj = {};
        var pairs = [];
        var key, value;
        for (var i = 0; i < patterns.length; i++) {
            pairs[i] = patterns[i].exec(textToParse);
        }
        if (!pairs[0] || !pairs[1]) return false;//для отмены дальнейшего парсинга

        for (var i = 0; i < pairs.length; i++) {
            if (!pairs[i]) continue;
            index = pairs[i].toString().indexOf(":")
            key = pairs[i].toString().substring(0, index);
            value = pairs[i].toString().substring(index + 2, pairs[i].toString().length - 1);
            obj[key] = value;
        }
        if (obj["Surgery Date"]) {
            if (obj["Surgery Date"] == "Surgery date not defined.") {
                obj["Surgery Date"] = "TBD";
            }
            else {
                var surDate = new Date(obj["Surgery Date"]);
                var day = ((surDate.getDate() < 10) ? ("0" + surDate.getDate()) : surDate.getDate())
                var month = ((surDate.getMonth() + 1) < 10) ? ("0" + (surDate.getMonth() + 1)) : (surDate.getMonth() + 1);
                obj["Surgery Date"] = day + "/" + month;
            }
        }
        if (obj["Surgery Type"]) {
            if (obj["Surgery Type"] === "Other") {
                obj["Surgery Type"] = "Anatomical Model";
            }
            else if (obj["Surgery Type"] === "Cranial Vault Reconstruction") {
                obj["Surgery Type"] = "CVR";
            }
        }
        if (additional) {
            for (var el in additional) {
                obj[el] = additional[el];
            }
        }
        return obj;
    }
    function _parseInfo(textToParse, patternsInfo) {
        var objInfo = {};
        var pairsInfo = [];

        for (var i = 0; i < patternsInfo.length; i++) {
            pairsInfo[i] = patternsInfo[i].exec(textToParse);
        }
        if (!pairsInfo[0]) return false;//для отмены дальнейшего парсинга

        var key, value;

        for (var i = 0; i < pairsInfo.length; i++) {
            if (!pairsInfo[i]) continue;
            index = pairsInfo[i].toString().indexOf(":")
            key = pairsInfo[i].toString().substring(0, index);
            value = pairsInfo[i].toString().substring(index + 2, pairsInfo[i].toString().length - 1);

            objInfo[key] = value;
        }
        return objInfo;
    };
 
    function _fillTable() {
        var cols = $("#row td input[type=text]");
        var i = 0;
        for (var el in this.caseInfo) {
            cols[i].value = this.caseInfo[el];
            i++;
        }
    };
    function _fillInfo() {
        $("#patientsInfo dl").remove();
        var dl = $('<dl></dl>');
        for (var el in this.patientInfo) {
            var dt = $('<dt></dt>').html(el + ': ');
            var dd = $('<dd></dd>').html('<strong>' + this.patientInfo[el] + '</strong>');
            dl.append(dt, dd);
        }
        $("#patientsInfo").append(dl);
    };
    var counter = 0;
    function _addStats() {
        var rowStats = $("<tr></tr>");
        var number = $('<td></td>');
        number.html(++counter);
        rowStats.append(number);
        for (var el in this.caseInfo) {
            var col = $("<td></td>");
            col.html(this.caseInfo[el]);
            rowStats.append(col);
        }
        $("#statsTable").prepend(rowStats);
        $('#showStats').html("Today: " + counter + " case(s)");
    };

    return { Case: _Case}
})();