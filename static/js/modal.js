function setCookie(cName, cValue, cDay) {
    var expire = new Date();
    expire.setDate(expire.getDate() + cDay);
    cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해
    if (typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
    document.cookie = cookies;
}

function getCookie(cName) {
    var x, y;
    var val = document.cookie.split(';');
    for (var i = 0; i < val.length; i++) {
        x = val[i].substr(0, val[i].indexOf('='));
        y = val[i].substr(val[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
        if (x == cName) {
            return unescape(y);
            // unescape로 디코딩 후 값 리턴
        }
    }
}

showModal = (modalId) => {
    $(".modal").each(function () {
        $(this).hide();
    });
    $(`#${modalId}`).show();
};


$(function () {
    $.each(['show', 'hide'], function (i, ev) {
        var el = $.fn[ev];
        $.fn[ev] = function () {
            this.trigger(ev);
            return el.apply(this, arguments);
        };
    });

    $(".modal").each(function () {
        const modalId = $(this).attr("id");
        $(this).hide();
        if ($(this).find(".today-btn").length > 0) {
            if (!getCookie(modalId)) {
                $(this).show();
            }

        }
    });

    $('.modal .today-btn').on("click", function () {
        const $modal = $(this).parents(".modal");
        setCookie($modal.attr("id"), true, 1); //쿠키값 변경
        $(this).parents(".modal").hide();
    });
    $('.modal .close-btn').on("click", function () {
        $(this).parents(".modal").hide();
    });

    $('.modal').on({
        "show": function () {
        },
        "click": function (e) {
            if (e.target === $(this).get(0)) {
                $(this).hide();
            }
        },
    });
});
