    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Розміри канваса
    canvas.width = window.innerWidth / 2; // Ліва половина екрана
    canvas.height = window.innerHeight;

    // Створення точок
    let points = [];
    let lines = [];

    function createRandomPoint() {
        const point = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: Math.random() * 1 - 0.5,  // швидкість по X
            dy: Math.random() * 1 - 0.5   // швидкість по Y
        };
        points.push(point);
    }

    // Створення точок (менше 100 точок)
    for (let i = 0; i < 50; i++) {
        createRandomPoint();
    }

    // Функція для малювання ліній між точками
    function drawLines() {
        lines = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищуємо канвас

        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const dx = points[i].x - points[j].x;
                const dy = points[i].y - points[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 80) {  // Якщо відстань між точками менше 80px
                    ctx.beginPath();
                    ctx.moveTo(points[i].x, points[i].y);
                    ctx.lineTo(points[j].x, points[j].y);
                    ctx.strokeStyle = "white"; // Білий колір для ліній
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    // Функція для малювання точок
    function drawPoints() {
        for (let i = 0; i < points.length; i++) {
            ctx.beginPath();
            ctx.arc(points[i].x, points[i].y, 2, 0, Math.PI * 2);
            ctx.fillStyle = "white"; // Білий колір для точок
            ctx.fill();
        }
    }

    // Оновлення положення точок
    function updatePoints() {
        for (let i = 0; i < points.length; i++) {
            points[i].x += points[i].dx;
            points[i].y += points[i].dy;

            // Зміна напрямку, якщо точка виходить за межі канваса
            if (points[i].x <= 0 || points[i].x >= canvas.width) {
                points[i].dx *= -1;
            }
            if (points[i].y <= 0 || points[i].y >= canvas.height) {
                points[i].dy *= -1;
            }
        }
    }

    // Основна функція анімації
    function animate() {
        updatePoints();
        drawLines();
        drawPoints();
        requestAnimationFrame(animate); // Викликає анімацію кожного кадру
    }

    animate(); // Запускаємо анімацію