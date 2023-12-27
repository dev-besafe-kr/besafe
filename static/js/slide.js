window.addEventListener('load', function () {
    const animationDelay = 500;
    document.querySelectorAll(".slide").forEach((slide) => {
        const leftEl = slide.querySelector(".slide-left");
        const rightEl = slide.querySelector(".slide-right");
        const stopEl = slide.querySelector(".slide-stop");
        leftEl && leftEl.addEventListener('click', () => {
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
        });
        rightEl && rightEl.addEventListener('click', () => {
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
        });
        stopEl && stopEl.addEventListener('click', () => {
            slide.classList.add("stop");
        });

        // setInterval(() => {
        //     if (slide.classList.contains("stop")) return;
        //     rightEl && rightEl.click();
        // }, 3000);
    });

    document.querySelectorAll(".shift").forEach(shift => {
        let isCurrentRevealed = false;
        shift.querySelectorAll(".shift__handle").forEach(sel => {
            const isCurrentItem = sel.classList.contains("active");
            if (isCurrentItem) {
                isCurrentRevealed = true;
            } else {
                sel.classList.remove("prev", "next", "active");
                sel.classList.add(isCurrentRevealed ? "next" : "prev");
            }
        });

        isCurrentRevealed = false;
        shift.querySelectorAll(".shift__item").forEach(sel => {
            const isCurrentItem = sel.classList.contains("active");
            if (isCurrentItem) {
                isCurrentRevealed = true;
            } else {
                sel.classList.remove("prev", "next", "active");
                sel.classList.add(isCurrentRevealed ? "next" : "prev");
            }
        });
        shift.querySelectorAll(".shift__handle").forEach(el => {
            el.addEventListener('click', () => {
                const dataId = el.dataset.shift_id;
                let isCurrentRevealed = false;
                shift.querySelectorAll(".shift__handle").forEach(sel => {
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
                shift.querySelectorAll(".shift__item").forEach(sel => {
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
            });
        });
        const leftEl = shift.querySelector(".shift__left");
        const rightEl = shift.querySelector(".shift__right");
        leftEl && leftEl.addEventListener('click', () => {
        });
        rightEl && rightEl.addEventListener('click', () => {
        });

        setInterval(() => {
            if (shift.classList.contains("stop")) return;
            rightEl && rightEl.click();
        }, 3000);
    });
});
