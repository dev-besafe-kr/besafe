window.addEventListener('load', function () {
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
            ulEl.scrollTo(ulEl.scrollLeft + liEl.clientWidth, 0);

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

        setInterval(() => {
            if (slide.classList.contains("stop")) return;
            rightEl && rightEl.click();
        }, 3000);
    });

    document.querySelectorAll(".shift").forEach(shift => {
        shift.querySelectorAll(".shift__handle").forEach(el => {
            el.addEventListener('click', () => {
                const dataId = el.dataset.shift_id;
                shift.querySelectorAll(".shift__handle").forEach(nel => {
                    nel.classList.toggle("active", nel.dataset.shift_id === dataId);
                });
                shift.querySelectorAll(".shift__item").forEach(cel => {
                    cel.classList.toggle("active", cel.dataset.shift_id === dataId);
                })
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
