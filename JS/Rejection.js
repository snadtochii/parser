/// <reference path="jquery-3.1.1.js" />
$(function () {
    new Clipboard('#copyRejText');
    $('.rej input').checkboxradio({
        icon: false
    });
    var rejReasons = $('.rej input');//.val();;

    $('.rej input').change(function () {
        $('#commentTextArea').val("");
        var com = "";
        var che = $('.rej input').filter(":checked");
        $(che).each(function () {
            com += ($(this).val() + "\n");
            // var p = $('<p id="' + $(this).attr("data-rr") + '"></p>').html($(this).val())
            // $('#comment').append(p);
        });
        $('#commentTextArea').val(com);


    });
    $('#copyRejText').click(() => {
        $('#rejection').trigger("click");
    });



})