/// <reference path="jquery-3.1.1.js" />
/// <reference path="../index.html" />

$(function () {

    $('#settingsBtn, .settings, #wrap').click(function () {
        $('#wrap').toggle(300);
    });

    $('#settingsPanel').click(function (e) {
        e.stopPropagation();
    });
    $('#settingsBtn').click(function () {
        newSet = {};
    });
    
    $('#openDoubleMimCheckbox').change(function () {
        newSet.dOpen = false;
        newSet.dOpen = $('#openDoubleMimCheckbox').prop("checked");
    });
    $('#addPathToWF').change(function () {
        if ($(this).val()) {
            newSet.newPath = "";
            newSet.newPath = $(this).val();
        }
    });
    $('#addPathToSF').change(function () {
        if ($(this).val()) {
            newSet.newSorce = "";
            newSet.newSorce = $(this).val();
        }
    });

    $('#settingsSubmit').click(function () {
        if (!$.isEmptyObject(newSet)) {
            $.post("../AjaxHandlers/SettingsHandler.ashx", newSet, function (data) {
                //alert(data);
            });
            //location.reload();
        }
    })
});