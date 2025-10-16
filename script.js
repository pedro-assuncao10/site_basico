document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DA GALERIA ---
    const images = document.querySelectorAll('.gallery-image');
    const prevBtn = document.querySelector('.gallery-btn.prev');
    const nextBtn = document.querySelector('.gallery-btn.next');

    if (images && images.length > 0) {
        let currentIndex = 0;
        let autoplayIntervalId = null;
        const AUTOPLAY_DELAY = 3000;

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

        const startAutoPlay = () => {
            stopAutoPlay();
            autoplayIntervalId = setInterval(showNextImage, AUTOPLAY_DELAY);
        };

        const stopAutoPlay = () => {
            if (autoplayIntervalId !== null) {
                clearInterval(autoplayIntervalId);
                autoplayIntervalId = null;
            }
        };

        showImage(currentIndex);
        startAutoPlay();

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

        const galleryEl = document.querySelector('.gallery');
        if (galleryEl) {
            galleryEl.addEventListener('mouseenter', stopAutoPlay);
            galleryEl.addEventListener('mouseleave', startAutoPlay);
        }
    }

    // --- LÓGICA DO MODAL DE HORÁRIO DE FUNCIONAMENTO ---
    const modal = document.getElementById('horarioModal');
    const botaoHorario = document.getElementById('btn-horario');
    const closeButton = document.querySelector('.close-button');

    // Verifica se os elementos do modal existem na página
    if (modal && botaoHorario && closeButton) {
        // Função para abrir o modal
        const abrirModal = (event) => {
            event.preventDefault(); // Impede o link de navegar para '#'
            modal.style.display = 'block';
        };

        // Função para fechar o modal
        const fecharModal = () => {
            modal.style.display = 'none';
        };

        // Adiciona o evento de clique ao botão "Horário de Funcionamento"
        botaoHorario.addEventListener('click', abrirModal);

        // Adiciona o evento de clique ao botão de fechar (o 'X')
        closeButton.addEventListener('click', fecharModal);

        // Adiciona um evento para fechar o modal se o usuário clicar fora da caixa de conteúdo
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                fecharModal();
            }
        });
    }
});