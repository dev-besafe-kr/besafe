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

const initShifts = () => {
    const animationDelay = 500;
    const showShiftItem = (shift, handles, items, dataId) => {
        shift.dataset.id = dataId;
        let isCurrentRevealed = false;
        handles.forEach(sel => {
            const isCurrentItem = sel.dataset.shift_id === dataId;
            if (isCurrentItem) {
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
            const isCurrentItem = sel.dataset.shift_id === dataId;
            if (isCurrentItem) {
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
