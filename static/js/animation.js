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
});
