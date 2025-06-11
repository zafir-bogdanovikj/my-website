
// Функција за анимација на круговите (за јазици)
function animateCircles() {
    document.querySelectorAll('.circle').forEach(circle => {
        const u = parseInt(circle.getAttribute('data-understanding')) || 0;
        const r = parseInt(circle.getAttribute('data-reading')) || 0;
        const w = parseInt(circle.getAttribute('data-writing')) || 0;

        // Зголемена резолуција за подобра квалитет
        const canvas = document.createElement('canvas');
        const size = 240; // Зголемена резолуција
        canvas.width = size;
        canvas.height = size;
        canvas.style.width = '120px'; // Се прикажува половина големина за поостри линии
        canvas.style.height = '120px';
        const ctx = canvas.getContext('2d');
        ctx.scale(2, 2); // Зголемување на резолуцијата
        circle.innerHTML = '';
        circle.appendChild(canvas);

        // Функција за анимирано цртање
        function drawSegment(percent, color, radius, delay) {
            setTimeout(() => {
                let current = 0;
                const interval = setInterval(() => {
                    if (current >= percent) {
                        clearInterval(interval);
                        // // Додај текст
                        // ctx.fillStyle = color;
                        // ctx.font = 'bold 14px Arial';
                        // ctx.textAlign = 'center';
                        // ctx.textBaseline = 'middle';
                        // ctx.fillText(`${percent}%`, 60, 60);
                        return;
                    }
                    current++;
                    ctx.beginPath();
                    ctx.arc(60, 60, radius, -0.5 * Math.PI, (-0.5 + 2 * current/100) * Math.PI);
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 8;
                    ctx.stroke();
                }, 20);
            }, delay);
        }

        // Цртање на сегменти
        drawSegment(u, '#00c87b', 50, 100);   // Understanding (надворешен)
        drawSegment(r, '#00f0ff', 35, 300);   // Reading (среден)
        drawSegment(w, '#00bcd4', 20, 500);  // Writing (внатрешен)
    });
}

// Функција за анимација на прогресс баровите (за вештини)
function animateBars() {
    document.querySelectorAll('.bar-fill').forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = level + '%';
        }, 100);
    });
}

// Функција за активирање анимации при скролување
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');

                if (entry.target.classList.contains('bar-fill')) {
                    const level = entry.target.getAttribute('data-level');
                    entry.target.style.width = '0';
                    setTimeout(() => {
                        entry.target.style.width = level + '%';
                    }, 100);
                }

                if (entry.target.classList.contains('circle')) {
                    animateCircles();
                }
            }
        });
    }, observerOptions);

    // Набљудувај ги сите bar-fill и circle елементи
    document.querySelectorAll('.bar-fill, .circle').forEach(el => {
        observer.observe(el);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const bars = document.querySelectorAll('.bar-fill');

    bars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level + '%';
    });
});



// Иницијализација при вчитување на страницата
document.addEventListener('DOMContentLoaded', () => {
    setupScrollAnimations();
});