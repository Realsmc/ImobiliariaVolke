// script.js

// 1. INJETAR O FUNDO INTERATIVO (MESH GRADIENT)
const meshBg = document.createElement('div');
meshBg.className = 'mesh-bg';
meshBg.innerHTML = `
    <div class="mesh-blob blob-1"></div>
    <div class="mesh-blob blob-2"></div>
    <div class="mesh-blob blob-3"></div>
`;
// Adiciona o fundo logo no início do body
document.body.prepend(meshBg);

// 2. ANIMAÇÃO DAS ONDAS COM O SCROLL DO MOUSE
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const blob1 = document.querySelector('.blob-1');
    const blob2 = document.querySelector('.blob-2');
    const blob3 = document.querySelector('.blob-3');

    // Move as ondas em direções e velocidades diferentes para o efeito dinâmico
    if (blob1) blob1.style.transform = `translateY(${scrollY * 0.15}px) translateX(${scrollY * 0.05}px) rotate(${scrollY * 0.02}deg)`;
    if (blob2) blob2.style.transform = `translateY(${scrollY * -0.1}px) translateX(${scrollY * -0.05}px)`;
    if (blob3) blob3.style.transform = `translateY(${scrollY * 0.2}px) translateX(${scrollY * -0.1}px) scale(${1 + scrollY * 0.0002})`;
});

// 3. LÓGICA DO CARROSSEL DE IMÓVEIS (Página Inicial)
function scrollCards(direction) {
    const container = document.getElementById('gridCards');
    if (container) {
        // Move o carrossel suavemente para os lados
        container.scrollBy({ left: direction * 350, behavior: 'smooth' });
    }
}

// 4. LÓGICA DA GALERIA DE FOTOS (Página de Detalhes - pagina1.html)
document.addEventListener('DOMContentLoaded', () => {
    const imagemGrande = document.getElementById('imagemGrande');
    const miniaturas = document.querySelectorAll('.miniaturas img');
    const btnAnterior = document.getElementById('btnAnterior');
    const btnProximo = document.getElementById('btnProximo');

    // Só executa se estiver na página que tem galeria
    if (imagemGrande && miniaturas.length > 0) {
        let indiceAtual = 0;
        const imagensSrc = Array.from(miniaturas).map(img => img.src);

        function atualizarImagem(indice) {
            imagemGrande.src = imagensSrc[indice];
            miniaturas.forEach(m => m.classList.remove('ativa'));
            miniaturas[indice].classList.add('ativa');
        }

        miniaturas.forEach((miniatura, index) => {
            miniatura.addEventListener('click', () => {
                indiceAtual = index;
                atualizarImagem(indiceAtual);
            });
        });

        if (btnAnterior) {
            btnAnterior.addEventListener('click', () => {
                indiceAtual = (indiceAtual === 0) ? imagensSrc.length - 1 : indiceAtual - 1;
                atualizarImagem(indiceAtual);
            });
        }

        if (btnProximo) {
            btnProximo.addEventListener('click', () => {
                indiceAtual = (indiceAtual === imagensSrc.length - 1) ? 0 : indiceAtual + 1;
                atualizarImagem(indiceAtual);
            });
        }

        // Define a primeira imagem como ativa ao carregar a página
        atualizarImagem(0);
    }
});