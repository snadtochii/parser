; var Checker = (function () {

    function _sendCheckRequest(fileCheckConfig) {
        $('#loaderSTLCheck').show();

        
        $.post("../AjaxHandlers/STLCheckerHandler.ashx", fileCheckConfig).done(function (data) {
            $('#loaderSTLCheck').hide();
            $('#stlCheckStatus').html(data);
            $('#stlCheckStatus').css("display", "block");
        });
    }
    return {
        sendCheckRequest: _sendCheckRequest
    }
})();