$(function () {
    $('form').on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            url: $(this).attr("action"),
            type: 'post',
            data: $(this).serialize(),
            success: () => {
                alert("제휴문의가 접수되었습니다.");
                this.reset();
            },
            fail: function () {
                alert("실패했습니다. 재시도 후 문의해주세요.")
            }
        });
        return false;
    });

});
