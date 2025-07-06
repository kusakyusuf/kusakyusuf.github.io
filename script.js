document.addEventListener('DOMContentLoaded', () => {
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const container = document.querySelector('.container');
    const responseMessage = document.getElementById('responseMessage');
    const heartBackground = document.querySelector('.heart-background');

    // 'Evet' butonu üzerine gelindiğinde
    yesButton.addEventListener('mouseover', () => {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = yesButton.getBoundingClientRect();

        const padding = 50; // container'dan gelen padding

        const h1 = container.querySelector('h1');
        const h1ComputedStyle = getComputedStyle(h1);
        const h1Height = h1.offsetHeight;
        const h1MarginBottom = parseFloat(h1ComputedStyle.marginBottom);

        // Hareket edebileceği minimum Y pozisyonu (butonun merkezi)
        const minCenterY = (h1.getBoundingClientRect().bottom - containerRect.top) + h1MarginBottom + (buttonRect.height / 2) + 20; // 20px ek tampon

        // Hareket edebileceği maksimum X ve Y pozisyonları (butonun merkezi)
        const maxCenterX = containerRect.width - padding - (buttonRect.width / 2);
        const maxCenterY = containerRect.height - padding - (buttonRect.height / 2);

        // Hareket edebileceği minimum X pozisyonu (butonun merkezi)
        const minCenterX = padding + (buttonRect.width / 2);

        const rangeX = maxCenterX - minCenterX;
        const rangeY = maxCenterY - minCenterY;

        // --- HATA AYIKLAMA (DEBUGGING) LOGLARI ---
        console.group("Button Movement Debug");
        console.log("Container (W x H):", containerRect.width, "x", containerRect.height);
        console.log("Button (W x H):", buttonRect.width, "x", buttonRect.height);
        console.log("H1 Bottom (relative to container top):", h1.getBoundingClientRect().bottom - containerRect.top);
        console.log("H1 Margin Bottom:", h1MarginBottom);
        console.log("Calculated minCenterY (start of vertical range):", minCenterY);
        console.log("Calculated maxCenterY (end of vertical range):", maxCenterY);
        console.log("Calculated minCenterX (start of horizontal range):", minCenterX);
        console.log("Calculated maxCenterX (end of horizontal range):", maxCenterX);
        console.log("Effective Horizontal Range (pixels):", rangeX);
        console.log("Effective Vertical Range (pixels):", rangeY);
        if (rangeX <= 0 || rangeY <= 0) {
            console.error("WARNING: Hareket alanı geçersiz! Konteyner çok küçük veya buton çok büyük.");
        }
        console.groupEnd();
        // --- HATA AYIKLAMA (DEBUGGING) LOGLARI SONU ---

        if (rangeX <= 0 || rangeY <= 0) {
            return; // Geçerli bir hareket alanı yoksa işlemi durdur
        }

        // Yeni rastgele pozisyonlar (butonun merkezi için)
        const newLeft = Math.random() * rangeX + minCenterX;
        const newTop = Math.random() * rangeY + minCenterY;

        yesButton.style.left = `${newLeft}px`;
        yesButton.style.top = `${newTop}px`;
    });

    // 'Hayır' butonuna tıklanıldığında
    noButton.addEventListener('click', () => {
        yesButton.style.display = 'none';
        noButton.style.display = 'none';
        // Emoji kaldırıldı
        responseMessage.innerHTML = "Biliyordum zaten beni sevseydin bir yolunu bulup evete tıklardın!";
        responseMessage.style.display = 'block';
    });

    // MARK: - Kalp Animasyonu Oluşturma

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heartBackground.appendChild(heart);

        const startLeft = Math.random() * 100;
        const animationDuration = Math.random() * 5 + 7;
        const animationDelay = Math.random() * 5;
        const startSize = Math.random() * 0.5 + 0.5;

        heart.style.left = `${startLeft}vw`;
        heart.style.animationDuration = `${animationDuration}s`;
        heart.style.animationDelay = `${animationDelay}s`;
        heart.style.setProperty('--start-scale', startSize);

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    // Site açıldığında hemen kalpleri göstermek için ilk 30 kalbi oluştur
    const initialHeartCount = 30; // Başlangıçta ekranda olacak kalp sayısı
    for (let i = 0; i < initialHeartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heartBackground.appendChild(heart);

        const startLeft = Math.random() * 100;
        const animationDuration = Math.random() * 5 + 7;
        // Negatif gecikme ile kalplerin animasyona başlamış gibi görünmesini sağla
        const animationDelay = -Math.random() * animationDuration; 
        const startSize = Math.random() * 0.5 + 0.5;

        heart.style.left = `${startLeft}vw`;
        heart.style.animationDuration = `${animationDuration}s`;
        heart.style.animationDelay = `${animationDelay}s`;
        heart.style.setProperty('--start-scale', startSize);

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    // Daha yoğun kalp akışı için oluşturma aralığını kısalttık (200ms)
    setInterval(createHeart, 200); 
});