function isElementVisible(container, el) {
    const col = container.offsetLeft;
    const cor = container.offsetLeft + container.clientWidth;

    const ell = el.offsetLeft;
    const elr = el.offsetLeft + el.clientWidth;
    return (col >= ell && col <= elr) || (cor <= elr && ell <= cor) || (col <= ell && elr <= cor)
}

window.addEventListener('load', () => {
    document.querySelectorAll(".banner-marquee").forEach(bm => {
        const leftSideOfContainer = bm.getBoundingClientRect().left;
        bm.querySelectorAll(".banners").forEach(banners => {
            if (banners.classList.contains("left-to-right")) {
                let currentMarginValue = 0;
                setInterval(() => {
                    let firstBanner = banners.querySelector(".banner:first-of-type");
                    let lastBanner = banners.querySelector(".banner:last-of-type");
                    if (banners.offsetLeft > bm.offsetLeft) {
                        currentMarginValue = -1 * lastBanner.clientWidth - 16;
                        banners.insertBefore(lastBanner, firstBanner);
                    }

                    currentMarginValue++;
                    banners.style.marginLeft = `${currentMarginValue}px`;
                }, 10);
            }
            if (banners.classList.contains("right-to-left")) {
                let currentMarginValue = 0;
                setInterval(() => {
                    let firstBanner = banners.querySelector(".banner:first-of-type");
                    if (!isElementVisible(bm, firstBanner)) {
                        currentMarginValue = 16;
                        banners.appendChild(firstBanner);
                    }

                    currentMarginValue--;
                    banners.style.marginLeft = `${currentMarginValue}px`;
                }, 10);
            }
        });
    });
});
