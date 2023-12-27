window.addEventListener('load', () => {
    const observer = new IntersectionObserver(entries => {
        // Loop over the entries
        entries.forEach(entry => {
            // If the element is visible
            if (entry.isIntersecting) {
                // Add the animation class
                entry.target.classList.add('on');
                entry.target.animationQueue = entry.target.animationQueue || [];

                entry.target.animationQueue.forEach((animationFunc) => animationFunc());
            }
        });
    });

    document.querySelectorAll('.animation').forEach(el => {
        setTimeout(() => observer.observe(el), 500);
    });

    document.querySelectorAll("dialog").forEach(dialog => {
        dialog.addEventListener('click', ({target: dialog}) => {
            if (dialog.nodeName === 'DIALOG' && !dialog.getAttributeNames().find(n => n === "lock")) {
                dialog.close('dismiss');
            }
        });

        dialog.querySelectorAll(".close").forEach(el => el.addEventListener("click", () => dialog.close('dismiss')));
    });
});
