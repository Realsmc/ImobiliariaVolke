const grid = document.getElementById("imoveisGrid");

const imoveis =
JSON.parse(localStorage.getItem("imoveis")) || [];

// Filtra apenas imóveis para aluguel
const imoveisAluguel = imoveis.filter(imovel => imovel.negociacao === "Aluguel");

if(imoveisAluguel.length === 0){

    grid.innerHTML = `
        <p style="text-align:center;">
            Nenhum imóvel para aluguel cadastrado.
        </p>
    `;

}else{

    imoveisAluguel.forEach(imovel => {

        let imagem = "";

        if(
            imovel.imagens &&
            imovel.imagens.length > 0
        ){
            imagem = imovel.imagens[0];
        }

        grid.innerHTML += `

        <article class="imovel-card">

            <img
            src="${imagem}"
            alt="${imovel.titulo}">

            <div class="card-content">

                <h3>${imovel.titulo}</h3>

                <p>${imovel.descricao}</p>

                <p class="valor">
                    R$ ${imovel.valor}
                </p>

            </div>

            <a
            href="detalhes.html?id=${imovel.id}"
            class="btn-detalhes">

            Ver Detalhes

            </a>

            <a
            href="https://wa.me/55999999999"
            target="_blank"
            class="btn-whatsapp">

            WhatsApp

            </a>

        </article>

        `;
    });

}