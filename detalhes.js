// ==============================
// CARREGA O IMÓVEL
// ==============================

const params = new URLSearchParams(window.location.search);

const id = Number(params.get("id"));

const imoveis = JSON.parse(localStorage.getItem("imoveis")) || [];

const imovel = imoveis.find(i => i.id == id);

if (!imovel) {

    document.querySelector("main").innerHTML = `
        <h1 style="text-align:center; margin-top:50px;">
            Imóvel não encontrado.
        </h1>
    `;

} else {

    //====================
    // DADOS
    //====================

    document.getElementById("titulo").textContent = imovel.titulo;

    document.getElementById("preco").textContent = imovel.valor;

    document.getElementById("negociacao").textContent = imovel.negociacao;

    document.getElementById("descricao").textContent = imovel.descricao;

    document.getElementById("endereco").textContent =
        "📍 " + imovel.endereco;

    document.getElementById("tipo").textContent =
        "🏠 " + imovel.tipo;

    //====================
    // GALERIA
    //====================

    const imagemGrande =
        document.getElementById("imagemGrande");

    const miniaturas =
        document.getElementById("miniaturas");

    let indiceAtual = 0;

    imagemGrande.src = imovel.imagens[0];

    miniaturas.innerHTML = "";

    imovel.imagens.forEach((imagem, indice) => {

        const img = document.createElement("img");

        img.src = imagem;

        if(indice === 0){
            img.classList.add("ativa");
        }

        img.onclick = () => {

            indiceAtual = indice;

            imagemGrande.src = imagem;

            document
                .querySelectorAll("#miniaturas img")
                .forEach(i => i.classList.remove("ativa"));

            img.classList.add("ativa");

        };

        miniaturas.appendChild(img);

    });

    //====================
    // BOTÃO ANTERIOR
    //====================

    document
        .getElementById("btnAnterior")
        .addEventListener("click", () => {

            indiceAtual--;

            if(indiceAtual < 0){

                indiceAtual = imovel.imagens.length - 1;

            }

            imagemGrande.src = imovel.imagens[indiceAtual];

            atualizarMiniaturas();

        });

    //====================
    // BOTÃO PRÓXIMO
    //====================

    document
        .getElementById("btnProximo")
        .addEventListener("click", () => {

            indiceAtual++;

            if(indiceAtual >= imovel.imagens.length){

                indiceAtual = 0;

            }

            imagemGrande.src = imovel.imagens[indiceAtual];

            atualizarMiniaturas();

        });

    //====================
    // DESTACA MINIATURA
    //====================

    function atualizarMiniaturas(){

        const fotos =
        document.querySelectorAll("#miniaturas img");

        fotos.forEach(foto =>
            foto.classList.remove("ativa")
        );

        fotos[indiceAtual].classList.add("ativa");

    }

}