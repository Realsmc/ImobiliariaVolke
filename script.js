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
      window.location.href = "./admin.html";
    } else {
      window.location.href = "./index.html";
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
  const erro = document.getElementById('erroNovo');
  const sucesso = document.getElementById('sucessoNovo');

  // valida se os campos estão preenchidos
  if (novoUsuario === "" || novaSenha === "") {
    erro.textContent = "Preencha todos os campos.";
    erro.style.display = 'block';
    sucesso.style.display = 'none';
    return;
  }

  // pega os usuários já salvos ou cria uma lista vazia
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // verifica se o usuário já existe
  const existe = usuarios.find(u => u.usuario === novoUsuario);
  if (existe) {
    erro.textContent = "Este usuário já existe.";
    erro.style.display = 'block';
    sucesso.style.display = 'none';
    return;
  }

  // adiciona o novo usuário na lista
  usuarios.push({ usuario: novoUsuario, senha: novaSenha });

  // salva a lista atualizada
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  sucesso.textContent = "Usuário criado com sucesso!";
  sucesso.style.display = 'block';
  erro.style.display = 'none';
}

