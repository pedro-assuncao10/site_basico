document.addEventListener('DOMContentLoaded', () => {
    // --- SELEÇÕES ---
    const images = document.querySelectorAll('.gallery-image');
    const prevBtn = document.querySelector('.gallery-btn.prev');
    const nextBtn = document.querySelector('.gallery-btn.next');

    // Segurança: se não houver imagens, aborta
    if (!images || images.length === 0) return;

    let currentIndex = 0;
    let autoplayIntervalId = null;
    const AUTOPLAY_DELAY = 3000;

    // --- FUNÇÕES DE EXIBIÇÃO ---
    const showImage = (index) => {
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
    };

    const showNextImage = () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    };

    const showPrevImage = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    };

    // --- AUTOPLAY CONTROLE ---
    const startAutoPlay = () => {
        stopAutoPlay(); // evita intervalos duplicados
        autoplayIntervalId = setInterval(showNextImage, AUTOPLAY_DELAY);
    };

    const stopAutoPlay = () => {
        if (autoplayIntervalId !== null) {
            clearInterval(autoplayIntervalId);
            autoplayIntervalId = null;
        }
    };

    // Inicia com a imagem inicial correta (caso o HTML defina outra)
    showImage(currentIndex);
    startAutoPlay();

    // --- EVENTOS DOS BOTÕES (se existirem) ---
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            stopAutoPlay();
            showNextImage();
            startAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            stopAutoPlay();
            showPrevImage();
            startAutoPlay();
        });
    }

    // Opcional: pausa ao entrar com o mouse sobre a galeria e retoma ao sair
    const galleryEl = document.querySelector('.gallery');
    if (galleryEl) {
        galleryEl.addEventListener('mouseenter', stopAutoPlay);
        galleryEl.addEventListener('mouseleave', startAutoPlay);
    }

    // --- RESTANTE DO CÓDIGO (modal) ---
    const modal = document.getElementById('horarioModal');
    const botaoHorario = document.getElementById('btn-horario');
    const closeButton = document.querySelector('.close-button');

    if (modal && botaoHorario && closeButton) {
        const abrirModal = () => (modal.style.display = 'block');
        const fecharModal = () => (modal.style.display = 'none');

        botaoHorario.addEventListener('click', (event) => {
            event.preventDefault();
            abrirModal();
        });

        closeButton.addEventListener('click', fecharModal);

        window.addEventListener('click', (event) => {
            if (event.target === modal) fecharModal();
        });
    }
});
