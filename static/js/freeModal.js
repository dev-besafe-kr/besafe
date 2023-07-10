const showFreeBox = (targetStep) => {
    const $freeModal = $("#freeModal");
    const $freeBox = $freeModal.find(".freeBox");

    $freeBox.each(function (index) {
        const step = parseInt($(this).data("step"));
        $(this).hide();

        if (step === targetStep) {
            $(this).show();
            $freeModal.data("currentStep", targetStep);
        }

        if (parseInt($freeModal.data("currentStep")) !== targetStep && index + 1 === $freeBox.length) {
            $(this).show();
            return false;
        }
    });

    return parseInt($freeModal.data("currentStep")) === targetStep;
}

$(function () {
    const $freeModal = $("#freeModal");
    let currentStep = parseInt($freeModal.data("currentStep"));
    currentStep = isNaN(currentStep) ? 1 : currentStep;
    showFreeBox(currentStep);

    $freeModal.find(".freeBox > .btn > button[type=button]").click(function () {
        const $freeBox = $(this).parents(".freeBox");
        const step = parseInt($freeBox.data("step"));

        const btnKind = $(this).hasClass('next') ? 1 : -1;
        if (!showFreeBox(step + btnKind)) {
            return false;
        }
    });

    $freeModal.find('form').on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            url: $(this).attr("action"),
            type: 'post',
            data: $(this).serialize(),
            success: () => {
                alert("상담이 접수되었습니다.");
                this.reset();
                $freeModal.hide();
            },
            fail: function () {
                alert("실패했습니다. 재시도 후 문의해주세요.")
            }
        });
        return false;
    });
});
