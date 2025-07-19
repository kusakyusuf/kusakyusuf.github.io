// script.js
document.addEventListener('DOMContentLoaded', () => {
    const yesButton       = document.getElementById('yesButton');
    const noButton        = document.getElementById('noButton');
    const container       = document.querySelector('.container');
    const responseMessage = document.getElementById('responseMessage');

    // “Hayır” butonu üzerine gelindiğinde kaçsın
    noButton.addEventListener('mouseover', () => {
        const { width: cw, height: ch } = container.getBoundingClientRect();
        const { width: bw, height: bh } = noButton.getBoundingClientRect();
        const padding = 50;

        const minX = padding + bw / 2;
        const maxX = cw - padding - bw / 2;
        const minY = padding + bh / 2;
        const maxY = ch - padding - bh / 2;

        const rangeX = maxX - minX;
        const rangeY = maxY - minY;
        if (rangeX <= 0 || rangeY <= 0) return;

        noButton.style.left = `${Math.random() * rangeX + minX}px`;
        noButton.style.top  = `${Math.random() * rangeY + minY}px`;
    });

    // “Evet”e tıklandığında yanıtı göster
    yesButton.addEventListener('click', () => {
        yesButton.style.display       = 'none';
        noButton.style.display        = 'none';
        responseMessage.innerHTML     = "Ya tövbe edip imana gelirsiniz ya da güme gidersiniz :)";
        responseMessage.style.display = 'block';
    });
});
