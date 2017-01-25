/// <reference path="jquery-3.1.1.js" />
/// <reference path="../index.html" />
; var fileControler = (function () {
    function _func(data) {
        $.post("../AjaxHandlers/FileControlerHandler.ashx", data, function (resp) {   });
    }
    return {
        func : _func
    }
})();