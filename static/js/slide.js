const initSlides = () => {
    const initSlide = slide => {
        const leftEl = slide.querySelector(".slide-left");
        const rightEl = slide.querySelector(".slide-right");
        const stopEl = slide.querySelector(".slide-stop");
        const goLeft = () => {
            const ulEl = slide.querySelector(`.slide-ul`);
            const liEl = ulEl.querySelector('li');
            ulEl.scrollTo(ulEl.scrollLeft - liEl.clientWidth, 0);

            const pagingEl = slide.querySelector(`.slide-paging`);
            if (pagingEl == null) return;

            const activeEl = pagingEl.querySelector('li.active');
            const prevEl = activeEl.previousElementSibling;

            if (prevEl !== null) {
                pagingEl.querySelectorAll('li').forEach((pel) => {
                    pel.classList.remove("active");
                });
                prevEl.classList.add("active");
            }
        };
        const goRight = () => {
            const ulEl = slide.querySelector(`.slide-ul`);
            const liEl = ulEl.querySelector('li');
            ulEl.scrollTo(ulEl.scrollLeft + liEl.clientWidth + 20, 0);

            const pagingEl = slide.querySelector(`.slide-paging`);
            if (pagingEl == null) return;

            const activeEl = pagingEl.querySelector('li.active');
            const nextEl = activeEl.nextElementSibling;

            if (nextEl !== null) {
                pagingEl.querySelectorAll('li').forEach((pel) => {
                    pel.classList.remove("active");
                });
                nextEl.classList.add("active");
            }
        };
        leftEl && leftEl.addEventListener('click', goLeft);
        rightEl && rightEl.addEventListener('click', goRight);
        stopEl && stopEl.addEventListener('click', () => {
            slide.classList.add("stop");
        });

        setInterval(() => {
            if (slide.classList.contains("stop")) return;
            goRight();
        }, 3000);
    };
    document.querySelectorAll(".slide").forEach(initSlide);
}
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
const checkFieldsetValidity = (fieldset) => {
    const fieldsGroup = groupBy(Array.from(fieldset.querySelectorAll("input, select, textarea")).map((el) => {
        return {"name": el.getAttribute("name"), "el": el}
    }), "name");

    const invalidFields = Object.values(fieldsGroup).filter((fields) => {
        const validFields = fields.filter(({name, el}) => {
            const inputType = el.getAttribute("type") || el.tagName.toLowerCase();
            if (["text", "textarea"].includes(inputType) && String(el.value).trim() !== "") return true;
            if (inputType === "checkbox" && el.checked) return true;
            return inputType === "select" && String(el.selectedOptions[0].value).trim() !== "";
        });

        return validFields.length === 0;
    })
    return invalidFields.length === 0;
}
const initShifts = () => {
    const animationDelay = 500;
    const checkFieldsetValidityAll = (root) => {
        const invalidFieldset = Array.from(root.querySelectorAll("fieldset")).filter(fieldset => !checkFieldsetValidity(fieldset));
        return invalidFieldset.length === 0
    }
    const showShiftItem = (shift, handles, items, dataId) => {
        const currentItem = items.find(sel => sel.dataset.shift_id === shift.dataset.id);
        const targetItem = items.find(sel => sel.dataset.shift_id === dataId);

        if (shift.classList.contains("shift--form")) {
            if (!checkFieldsetValidityAll(currentItem)) {
                alert("아직 입력하지 않은 정보가 있습니다. 내용을 확인해주세요.");
                return;
            }
        }

        shift.dataset.id = dataId;
        let isCurrentRevealed = false;
        handles.forEach(sel => {
            const isTarget = sel.dataset.shift_id === dataId;
            if (isTarget) {
                sel.classList.add("active");
                isCurrentRevealed = true;

                const temp = sel;
                setTimeout(() => {
                    temp.classList.remove("prev", "next");
                }, animationDelay);
            } else {
                sel.classList.remove("prev", "next", "active");
                sel.classList.add(isCurrentRevealed ? "next" : "prev");
            }
        });
        isCurrentRevealed = false;
        items.forEach(sel => {
            const isTarget = sel.dataset.shift_id === dataId;
            if (isTarget) {
                sel.classList.add("active");
                isCurrentRevealed = true;

                const temp = sel;
                setTimeout(() => {
                    temp.classList.remove("prev", "next");
                }, animationDelay);
            } else {
                sel.classList.remove("prev", "next", "active");
                sel.classList.add(isCurrentRevealed ? "next" : "prev");
            }
        });
    }
    const initShift = shift => {
        let isCurrentRevealed = false;
        const handles = Array.from(shift.querySelectorAll(".shift__handle"));
        const items = Array.from(shift.querySelectorAll(".shift__item"));

        if (shift.classList.contains("shift--form")) {
            shift.addEventListener("submit", e => {
                if (!checkFieldsetValidityAll(shift)) {
                    e.preventDefault();
                    alert("아직 입력하지 않은 정보가 있습니다. 내용을 확인해주세요.");
                    return false;
                }
            })
        }

        let temp;
        temp = shift.querySelector(".shift__handle.active");
        if (!temp) {
            if (handles.length > 0) {
                temp = handles[0];
                handles[0].classList.add("active");
            }
        }

        temp = shift.querySelector(".shift__item.active");
        if (!temp) {
            if (items.length > 0) {
                temp = handles[0];
                items[0].classList.add("active");
            }
        }
        shift.dataset.id = temp ? temp.dataset.shift_id : "1";

        handles.forEach((sel, index) => {
            const isCurrentItem = sel.classList.contains("active");
            if (isCurrentItem) {
                isCurrentRevealed = true;
            } else {
                sel.classList.remove("prev", "next", "active");
                sel.classList.add(isCurrentRevealed ? "next" : "prev");
            }
            sel.dataset.shift_id = sel.dataset.shift_id || (index + 1).toString();
        });
        isCurrentRevealed = false;
        items.forEach((sel, index) => {
            const isCurrentItem = sel.classList.contains("active");
            if (isCurrentItem) {
                isCurrentRevealed = true;
            } else {
                sel.classList.remove("prev", "next", "active");
                sel.classList.add(isCurrentRevealed ? "next" : "prev");
            }
            sel.dataset.shift_id = sel.dataset.shift_id || (index + 1).toString();
        });

        const shiftIdMap = items.map(i => i.dataset.shift_id);
        handles.forEach(el => {
            el.addEventListener('click', () => {
                showShiftItem(shift, handles, items, el.dataset.shift_id);
            });
        });
        shift.querySelectorAll(".shift__left").forEach(leftEl => leftEl.addEventListener('click', () => showShiftItem(shift, handles, items, shiftIdMap[shiftIdMap.indexOf(shift.dataset.id) - 1] || shift.dataset.id)))
        shift.querySelectorAll(".shift__right").forEach(rightEl => rightEl.addEventListener('click', () => showShiftItem(shift, handles, items, shiftIdMap[shiftIdMap.indexOf(shift.dataset.id) + 1] || shift.dataset.id)))
    };
    document.querySelectorAll(".shift").forEach(initShift);
}

window.addEventListener('load', function () {
    initSlides();
    initShifts();
});
