// 1. CRIA O FUNDO AZUL
const meshBg = document.createElement('div');
meshBg.className = 'mesh-bg';
meshBg.innerHTML = `
    <div class="mesh-blob blob-1"></div>
    <div class="mesh-blob blob-2"></div>
    <div class="mesh-blob blob-3"></div>
`;
document.body.prepend(meshBg);

// 2. DEIXA A ROLAGEM DA PÁGINA MAIS LEVE
//  desliga os efeitos do mouse enquanto scrolla a página para não travar
let scrollTimeout;
document.addEventListener('scroll', () => {
    document.body.style.pointerEvents = 'none'; 
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        document.body.style.pointerEvents = 'auto'; 
    }, 150);
}, { passive: true });

// 3. FAZ OS CARDS DE IMÓVEIS ANDAREM (BOTÕES < E >)
function scrollCards(direction) {
    const container = document.getElementById('gridCards');
    if (container) {
        container.scrollBy({ left: direction * 350, behavior: 'smooth' });
    }
}

// 4. TROCA AS FOTOS NA PÁGINA DE DETALHES
document.addEventListener('DOMContentLoaded', () => {
    const imagemGrande = document.getElementById('imagemGrande');
    const miniaturas = document.querySelectorAll('.miniaturas img');
    const btnAnterior = document.getElementById('btnAnterior');
    const btnProximo = document.getElementById('btnProximo');

    if (imagemGrande && miniaturas.length > 0) {
        let indiceAtual = 0;
        const imagensSrc = Array.from(miniaturas).map(img => img.src);

        // Função que muda a foto principal
        function atualizarImagem(indice) {
            imagemGrande.src = imagensSrc[indice];
            miniaturas.forEach(m => m.classList.remove('ativa'));
            miniaturas[indice].classList.add('ativa');
        }

        // Clique nas fotinhos pequenas
        miniaturas.forEach((miniatura, index) => {
            miniatura.addEventListener('click', () => {
                indiceAtual = index;
                atualizarImagem(indiceAtual);
            });
        });

        // Botão de voltar foto
        if (btnAnterior) {
            btnAnterior.addEventListener('click', () => {
                indiceAtual = (indiceAtual === 0) ? imagensSrc.length - 1 : indiceAtual - 1;
                atualizarImagem(indiceAtual);
            });
        }

        // Botão de avançar foto
        if (btnProximo) {
            btnProximo.addEventListener('click', () => {
                indiceAtual = (indiceAtual === imagensSrc.length - 1) ? 0 : indiceAtual + 1;
                atualizarImagem(indiceAtual);
            });
        }

        atualizarImagem(0);
    }
});