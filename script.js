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


let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

if (!usuarios.some(u => u.usuario === "admin")) {
    usuarios.push({
        nome: "Administrador",
        email: "admin@volke.com",
        usuario: "admin",
        senha: "admin",
        tipo: "admin"
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function fazerLogin() {
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;
  const erro = document.getElementById('erro');
  const sucesso = document.getElementById('sucesso');   

  if (usuario === "" || senha === "") {
    erro.textContent = "Preencha todos os campos.";
    erro.style.display = 'block';
    sucesso.style.display = 'none';
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const encontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);

  if (encontrado) {
    erro.style.display = 'none';
    sucesso.style.display = 'block';

    // salva o usuário logado
    localStorage.setItem('usuarioLogado', JSON.stringify(encontrado));

    // redireciona conforme o tipo
    if (encontrado.tipo === 'admin') {
      window.location.href = "./paineladmin.html";
    } else {
      window.location.href = "./painelcliente.html";
    }

  } else {
    erro.textContent = "Usuario ou senha incorretos.";
    erro.style.display = 'block';
    sucesso.style.display = 'none';
  }
}

//novos usuarios

function criarUsuario() {

  const novoUsuario = document.getElementById('usuario_criacao').value;
  const novaSenha = document.getElementById('senha_criacao').value;
  const novaNome = document.getElementById('nome_criacao').value;
  const novaEmail = document.getElementById('email_criacao').value;

  const pergunta = document.getElementById('pergunta_criacao').value;
  const resposta = document.getElementById('resposta_criacao').value;

  const erro = document.getElementById('erroNovo');
  const sucesso = document.getElementById('sucessoNovo');

    const erroSenha = validarSenha(novaSenha);

if (erroSenha) {
    erro.textContent = erroSenha;
    erro.style.display = "block";
    sucesso.style.display = "none";
    return;
}

  if (
      novoUsuario === "" ||
      novaSenha === "" ||
      novaNome === "" ||
      novaEmail === "" ||
      pergunta === "" ||
      resposta === ""
  ) {
      erro.textContent = "Preencha todos os campos.";
      erro.style.display = "block";
      sucesso.style.display = "none";
      return;
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  const existe = usuarios.find(
      u => u.usuario === novoUsuario
  );

  if (existe) {
      erro.textContent = "Este usuário já existe.";
      erro.style.display = "block";
      sucesso.style.display = "none";
      return;
  }

  usuarios.push({
      nome: novaNome,
      email: novaEmail,
      usuario: novoUsuario,
      senha: novaSenha,
      pergunta: pergunta,
      resposta: resposta.toLowerCase()
  });

  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  sucesso.textContent = "Usuário criado com sucesso!";
  sucesso.style.display = "block";
  erro.style.display = "none";
}

let usuarioRecuperacao = null;

function buscarPergunta() {

    const usuario =
        document.getElementById('usuarioRecuperacao').value;

    const usuarios =
        JSON.parse(localStorage.getItem('usuarios')) || [];

    const encontrado =
        usuarios.find(u => u.usuario === usuario);

    if (!encontrado) {

        document.getElementById('mensagem').innerHTML =
            "Usuário não encontrado.";

        return;
    }

    usuarioRecuperacao = encontrado;

    let perguntaTexto = "";

    switch(encontrado.pergunta){

        case "nome_pet":
            perguntaTexto =
            "Qual o nome do seu primeiro pet?";
        break;

        case "cidade_nascimento":
            perguntaTexto =
            "Em que cidade você nasceu?";
        break;

        case "comida_favorita":
            perguntaTexto =
            "Qual sua comida favorita?";
        break;
    }

    document.getElementById('textoPergunta').innerHTML =
        perguntaTexto;

    document.getElementById('areaPergunta').style.display =
        "block";
}
function redefinirSenha() {

    const resposta =
        document.getElementById('respostaRecuperacao')
        .value
        .toLowerCase();

    const novaSenha =
        document.getElementById('novaSenha').value;

    if (resposta !== usuarioRecuperacao.resposta) {

        document.getElementById('mensagem').innerHTML =
            "Resposta incorreta.";

        return;
    }

    const usuarios =
        JSON.parse(localStorage.getItem('usuarios')) || [];

    const indice =
        usuarios.findIndex(
            u => u.usuario === usuarioRecuperacao.usuario
        );

        const erroSenha = validarSenha(novaSenha);

    if (erroSenha) {

    document.getElementById('mensagem').innerHTML =
        erroSenha;

    return;
}
    usuarios[indice].senha = novaSenha;

    localStorage.setItem(
        'usuarios',
        JSON.stringify(usuarios)
    );

    document.getElementById('mensagem').innerHTML =
        "Senha alterada com sucesso!";

    setTimeout(() => {

        window.location.href = "cliente.html";

    }, 2000);
}

function carregarUsuarios(){

    const lista =
    document.getElementById("listaUsuarios");

    const usuarios =
    JSON.parse(localStorage.getItem("usuarios")) || [];

    lista.innerHTML = "";

    usuarios.forEach((u,index)=>{

        lista.innerHTML += `
        <tr>

            <td>${u.nome || "-"}</td>
            <td>${u.usuario}</td>
            <td>${u.email || "-"}</td>
            <td>${u.tipo || "cliente"}</td>

            <td>

                <div class="acoes">

                    <button
                    class="editar"
                    onclick="editarUsuario(${index})">
                    Editar
                    </button>

                    <button
                    class="excluir"
                    onclick="excluirUsuario(${index})">
                    Excluir
                    </button>

                </div>

            </td>

        </tr>
        `;
    });

}

function excluirUsuario(indice) {

    const usuarios =
        JSON.parse(localStorage.getItem("usuarios")) || [];

    if (!confirm("Deseja excluir este usuário?")) {
        return;
    }

    usuarios.splice(indice, 1);

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    carregarUsuarios();
}

function editarUsuario(indice) {

    const usuarios =
        JSON.parse(localStorage.getItem("usuarios")) || [];

    const novoNome =
        prompt(
            "Novo nome:",
            usuarios[indice].nome
        );

    if (novoNome === null) return;

    usuarios[indice].nome = novoNome;

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    carregarUsuarios();
}
const usuarioLogado =
JSON.parse(localStorage.getItem("usuarioLogado"));

function validarSenha(senha) {

    if (senha.length < 8) {
        return "A senha deve ter pelo menos 8 caracteres.";
    }

    if (!/[A-Z]/.test(senha)) {
        return "A senha deve conter pelo menos uma letra maiúscula.";
    }

    if (!/[a-z]/.test(senha)) {
        return "A senha deve conter pelo menos uma letra minúscula.";
    }

    if (!/[0-9]/.test(senha)) {
        return "A senha deve conter pelo menos um número.";
    }

    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(senha)) {
        return "A senha deve conter pelo menos um caractere especial.";
    }

    return null;
}

function mostrarSenha(idCampo) {

    const campo = document.getElementById(idCampo);

    if (!campo) return;

    if (campo.type === "password") {
        campo.type = "text";
    } else {
        campo.type = "password";
    }

}
function sair() {

    localStorage.removeItem("usuarioLogado");

    window.location.href = "./index.html";

}