/// <reference path="jquery-3.1.1.js" />
; var statControler = (function () {
    function _sendStats(sendParams) {
        //var send = {};
        //send.strToWrite = JSON.stringify(sendParams);

        $.post("../AjaxHandlers/StatsHandler.ashx", sendParams);
    }
    var _stats;
    function _getStats() {
        $.post("../AjaxHandlers/DBHandler.ashx");
        //setTimeout(2000);
        return _stats;
    }
    return {
        sendStats: _sendStats,
        getStats: _getStats
    }
})();