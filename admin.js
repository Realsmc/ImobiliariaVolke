let editandoId = null;

// =========================
// CONVERTER IMAGEM
// =========================

function converterImagem(arquivo) {

    return new Promise((resolve) => {

        const reader = new FileReader();

        reader.onload = function () {
            resolve(reader.result);
        };

        reader.readAsDataURL(arquivo);

    });

}

// =========================
// FORMULÁRIO
// =========================

document
.getElementById("formImovel")
.addEventListener("submit", salvarImovel);

// =========================
// SALVAR IMÓVEL
// =========================

async function salvarImovel(e){

    e.preventDefault();

    let imoveis =
    JSON.parse(localStorage.getItem("imoveis")) || [];

    const imagens = [];

    const arquivos =
    document.getElementById("fotos").files;

    for(const arquivo of arquivos){

        imagens.push(
            await converterImagem(arquivo)
        );

    }

    const novoImovel = {

        id: editandoId || Date.now(),

        titulo:
        document.getElementById("titulo").value,

        valor:
        document.getElementById("valor").value,

        endereco:
        document.getElementById("endereco").value,

        descricao:
        document.getElementById("descricao").value,

        negociacao:
        document.getElementById("negociacao").value,

        tipo:
        document.getElementById("tipo").value,

        imagens:
        imagens

    };

    if(editandoId){

        const antigo =
        imoveis.find(i => i.id == editandoId);

        if(imagens.length == 0){

            novoImovel.imagens =
            antigo.imagens;

        }

        imoveis =
        imoveis.map(i =>
            i.id == editandoId
            ? novoImovel
            : i
        );

        editandoId = null;

    }else{

        imoveis.push(novoImovel);

    }

    localStorage.setItem(
        "imoveis",
        JSON.stringify(imoveis)
    );

    document
    .getElementById("formImovel")
    .reset();

    carregarImoveis();

    alert("Imóvel salvo com sucesso!");

}

// =========================
// LISTAR IMÓVEIS
// =========================

function carregarImoveis(){

    const lista =
    document.getElementById("listaImoveis");

    if(!lista) return;

    const imoveis =
    JSON.parse(localStorage.getItem("imoveis")) || [];

    lista.innerHTML = "";

    if(imoveis.length == 0){

        lista.innerHTML =
        "<p>Nenhum imóvel cadastrado.</p>";

        return;

    }

    imoveis.forEach(imovel=>{

        lista.innerHTML += `

        <div class="imovel-admin">

            <div>

                <img
                src="${imovel.imagens[0]}"
                style="
                width:120px;
                height:80px;
                object-fit:cover;
                border-radius:10px;">

                <br><br>

                <strong>${imovel.titulo}</strong>

                <br>

                ${imovel.valor}

                <br>

                ${imovel.tipo}

                <br>

                ${imovel.negociacao}

            </div>

            <div>

                <button
                class="btn-enviar"
                onclick="editarImovel(${imovel.id})">

                Editar

                </button>

                <br><br>

                <button
                class="btn-enviar"
                onclick="excluirImovel(${imovel.id})">

                Excluir

                </button>

            </div>

        </div>

        <hr><br>

        `;

    });

}

// =========================
// EDITAR
// =========================

function editarImovel(id){

    const imoveis =
    JSON.parse(localStorage.getItem("imoveis")) || [];

    const imovel =
    imoveis.find(i => i.id == id);

    if(!imovel) return;

    editandoId = id;

    document.getElementById("titulo").value =
    imovel.titulo;

    document.getElementById("valor").value =
    imovel.valor;

    document.getElementById("endereco").value =
    imovel.endereco;

    document.getElementById("descricao").value =
    imovel.descricao;

    document.getElementById("negociacao").value =
    imovel.negociacao;

    document.getElementById("tipo").value =
    imovel.tipo;

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

// =========================
// EXCLUIR
// =========================

function excluirImovel(id){

    if(!confirm("Deseja excluir este imóvel?")){

        return;

    }

    let imoveis =
    JSON.parse(localStorage.getItem("imoveis")) || [];

    imoveis =
    imoveis.filter(i => i.id != id);

    localStorage.setItem(

        "imoveis",

        JSON.stringify(imoveis)

    );

    carregarImoveis();

}

// =========================
// INICIAR
// =========================

carregarImoveis();