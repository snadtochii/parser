$(function () {
    $('.copy').hover(handlerIn, handlerOut);
    var animationStarted = false;
    var animationOutCouldBeStarted = false;

    function handlerIn() {
            if (!animationStarted) {
                var element = $('img', this);
                $(element).animate({ left: "15px" }, { duration: 200, start: () => { animationStarted = true; } });//, done: () => { animationOutCouldBeStarted = true } });
            }
    }
    function handlerOut(e) {
        var element = $('img', this);
        $(element).animate({ left: "50%" }, { duration: 200, done: () => { animationStarted = false; } });
    }
});