document.addEventListener("DOMContentLoaded", function () {

    // IMAGEM PRINCIPAL
    const imagemGrande = document.getElementById("imagemGrande");

    // TODAS AS MINIATURAS
    const miniaturas = document.querySelectorAll(".miniaturas img");

    // BOTÕES
    const btnAnterior = document.getElementById("btnAnterior");
    const btnProximo = document.getElementById("btnProximo");

    // ÍNDICE ATUAL
    let indiceAtual = 0;


    // =========================
    // TROCAR AO CLICAR
    // =========================
    miniaturas.forEach((miniatura, indice) => {

        miniatura.addEventListener("click", function () {

            imagemGrande.src = miniatura.src;

            indiceAtual = indice;

        });

    });


    // =========================
    // BOTÃO PRÓXIMO
    // =========================
    btnProximo.addEventListener("click", function () {

        indiceAtual++;

        // VOLTA PRO INÍCIO
        if (indiceAtual >= miniaturas.length) {

            indiceAtual = 0;

        }

        imagemGrande.src = miniaturas[indiceAtual].src;

    });


    // =========================
    // BOTÃO ANTERIOR
    // =========================
    btnAnterior.addEventListener("click", function () {

        indiceAtual--;

        // VOLTA PRO FINAL
        if (indiceAtual < 0) {

            indiceAtual = miniaturas.length - 1;

        }

        imagemGrande.src = miniaturas[indiceAtual].src;

    });


    // =========================
    // TELA CHEIA
    // =========================
    imagemGrande.addEventListener("click", function () {

        if (imagemGrande.requestFullscreen) {

            imagemGrande.requestFullscreen();

        }

    });

});