const params = new URLSearchParams(window.location.search);

const id = Number(params.get("id"));

const imoveis =
JSON.parse(localStorage.getItem("imoveis")) || [];

const imovel =
imoveis.find(i => i.id === id);

if (!imovel) {

    document.querySelector("main").innerHTML =
    "<h1>Imóvel não encontrado.</h1>";

} else {

    document.getElementById("titulo").textContent =
    imovel.titulo;

    document.getElementById("preco").textContent =
    imovel.valor;

    document.getElementById("negociacao").textContent =
    imovel.negociacao;

    document.getElementById("descricao").textContent =
    imovel.descricao;

    document.getElementById("endereco").textContent =
    "📍 " + imovel.endereco;

    const imagemGrande =
    document.getElementById("imagemGrande");

    imagemGrande.src =
    imovel.imagens[0];

    const miniaturas =
    document.getElementById("miniaturas");

    let indiceAtual = 0;

    imovel.imagens.forEach((imagem, indice) => {

        const img =
        document.createElement("img");

        img.src = imagem;

        img.onclick = () => {

            indiceAtual = indice;

            imagemGrande.src = imagem;
        };

        miniaturas.appendChild(img);

    });

}