window.addEventListener('load', function () {
    document.querySelectorAll(".slide-left").forEach((el) => {
        let slide = el.parentElement;
        while (slide.nodeName.toLowerCase() !== 'body') {
            if (slide.classList.contains("slide")) {
                break;
            }
            slide = slide.parentElement
        }
        el.addEventListener('click', () => {
            const ulEl = slide.querySelector(`.slide-ul[data-slide_id=${el.dataset.slide_id}]`);
            const liEl = ulEl.querySelector('li');
            ulEl.scrollTo(ulEl.scrollLeft - liEl.clientWidth, 0);

            const pagingEl = slide.querySelector(`.slide-paging[data-slide_id=${el.dataset.slide_id}]`);
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
    });
    document.querySelectorAll(".slide-right").forEach((el) => {
        let slide = el.parentElement;
        while (slide.nodeName.toLowerCase() !== 'body') {
            if (slide.classList.contains("slide")) {
                break;
            }
            slide = slide.parentElement
        }
        el.addEventListener('click', () => {
            const ulEl = slide.querySelector(`.slide-ul[data-slide_id=${el.dataset.slide_id}]`);
            const liEl = ulEl.querySelector('li');
            ulEl.scrollTo(ulEl.scrollLeft + liEl.clientWidth, 0);

            const pagingEl = slide.querySelector(`.slide-paging[data-slide_id=${el.dataset.slide_id}]`);
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
    });
});
