const groupBy = function (data, key) {
    return Array.from(data).reduce(function (carry, el) {
        const group = el[key];

        if (carry[group] === undefined) {
            carry[group] = []
        }

        carry[group].push(el)
        return carry
    }, {})
}


const showFreeBox = (targetStep) => {
    const $freeModal = $("#freeModal");
    const $freeBox = $freeModal.find(".freeBox");

    $freeBox.each(function (index, el) {
        const step = parseInt($(this).data("step"));
        $(el).hide();

        if (step === targetStep) {
            $(el).show();
            $freeModal.data("currentStep", targetStep);
        }

        if (parseInt($freeModal.data("currentStep")) !== targetStep && index + 1 === $freeBox.length) {
            $(el).show();
            return false;
        }
    });

    return parseInt($freeModal.data("currentStep")) === targetStep;
}

const isBoxValid = ($box) => {
    const $fieldset = $box.find("fieldset");
    if ($fieldset.length === 0) return false;

    const fieldsGroup = groupBy($fieldset.find("input, select").map((idx, el) => {
        return {"name": el.getAttribute("name"), "el": el}
    }), "name");

    const invalidFields = Object.values(fieldsGroup).filter((fields) => {
        const validFields = fields.filter((f) => {
            const el = f.el;
            const inputType = el.getAttribute("type") || el.tagName.toLowerCase();
            if (["text", "textarea"].includes(inputType) && String(el.value).trim() !== "") return true;
            if (inputType === "checkbox" && el.checked) return true;
            if (inputType === "select" && String($(el).val()).trim() !== "") return true;

            return false;
        });

        return validFields.length === 0;
    })
    return invalidFields.length === 0;
}

$(function () {
    const $freeModal = $("#freeModal");
    let currentStep = parseInt($freeModal.data("currentStep"));
    currentStep = isNaN(currentStep) ? 1 : currentStep;
    showFreeBox(currentStep);

    $freeModal.find(".freeBox > .btn > button[type=button]").click(function () {
        const $freeBox = $(this).parents(".freeBox");
        const step = parseInt($freeBox.data("step"));

        if ($(this).hasClass("next") && !isBoxValid($freeBox)) {
            alert("아직 입력하지 않은 정보가 있습니다. 내용을 확인해주세요.");
            return false;
        }

        const btnKind = $(this).hasClass('next') ? 1 : -1;
        if (!showFreeBox(step + btnKind)) {
            return false;
        }
    });

    $freeModal.find('form').on("submit", function (e) {
        e.preventDefault();

        const $freeBox = $(this).find(".freeBox");
        for (let i = 0; i < $freeBox.length; i++) {
            const el = $freeBox[i];
            if (!isBoxValid($(el))) {
                alert("아직 입력하지 않은 정보가 있습니다. 내용을 확인해주세요.");
                return false;
            }
        }


        $.ajax({
            url: $(this).attr("action"),
            type: 'post',
            data: $(this).serialize(),
            success: () => {
                alert("상담이 접수되었습니다.");
                $freeModal.hide();
            },
            fail: function () {
                alert("실패했습니다. 재시도 후 문의해주세요.")
            }
        });
        return false;
    });

    $freeModal.on("hide", function (e) {
        if (this !== e.target) return false;
        showFreeBox(1);
    });
});
