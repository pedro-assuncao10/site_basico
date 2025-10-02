document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery-image');
    let currentIndex = 0;

    function showNextImage() {
        if (images.length === 0) return;

        // Esconde a imagem atual
        images[currentIndex].classList.remove('active');
        
        // Move para o próximo índice, voltando ao início se chegar ao fim
        currentIndex = (currentIndex + 1) % images.length;
        
        // Mostra a próxima imagem
        images[currentIndex].classList.add('active');
    }

    // Inicia o carrossel a cada 3 segundos (3000 ms)
    setInterval(showNextImage, 3000);
});