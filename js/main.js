/* ==========================================================================
   MAIN.JS - Comportamentos presentes em todas as páginas do portfólio
   JavaScript puro (Vanilla JS), sem jQuery, React ou qualquer biblioteca,
   conforme exigido pela atividade.

   Responsabilidades deste arquivo:
   1. Alternância entre tema claro e escuro, com a escolha memorizada
   2. Menu "hambúrguer" responsivo para telas pequenas
   3. Atualização automática do ano no rodapé

   OBSERVAÇÃO IMPORTANTE SOBRE O CARREGAMENTO:
   Este arquivo é carregado no <head> SEM o atributo "defer". Isso é
   proposital: o bloco 1 abaixo roda antes de a página ser desenhada, então
   o tema salvo já é aplicado no primeiro quadro e o usuário não vê o site
   "piscar" branco antes de ficar escuro.
   ========================================================================== */

/* ==========================================================================
   1. TEMA CLARO / ESCURO
   ========================================================================== */

/* Chave usada no localStorage para guardar a preferência entre visitas */
var CHAVE_TEMA = "portfolio-reinaldo-tema";

/**
 * Descobre qual tema deve ser exibido ao abrir a página.
 * A ordem de prioridade é:
 *   1. O tema que o usuário escolheu em uma visita anterior;
 *   2. A preferência configurada no sistema operacional do usuário;
 *   3. O tema claro, como padrão.
 * @returns {string} "claro" ou "escuro"
 */
function obterTemaInicial() {
    var temaSalvo = localStorage.getItem(CHAVE_TEMA);

    if (temaSalvo === "claro" || temaSalvo === "escuro") {
        return temaSalvo;
    }

    // matchMedia consulta a preferência de tema do sistema operacional
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "escuro";
    }

    return "claro";
}

/**
 * Aplica um tema à página inteira.
 * Basta trocar o atributo data-tema no elemento <html>: o CSS redefine
 * todas as variáveis de cor a partir desse atributo.
 * @param {string} tema - "claro" ou "escuro"
 */
function aplicarTema(tema) {
    document.documentElement.setAttribute("data-tema", tema);

    // Atualiza o ícone e o texto de acessibilidade do botão, quando ele
    // já existir na página (não existe ainda na primeira execução).
    var botao = document.getElementById("botao-tema");

    if (botao) {
        var icone = botao.querySelector(".botao-tema__icone");

        if (tema === "escuro") {
            if (icone) { icone.textContent = "☀️"; }
            botao.setAttribute("aria-label", "Mudar para o tema claro");
            botao.setAttribute("title", "Mudar para o tema claro");
        } else {
            if (icone) { icone.textContent = "🌙"; }
            botao.setAttribute("aria-label", "Mudar para o tema escuro");
            botao.setAttribute("title", "Mudar para o tema escuro");
        }
    }
}

/* Aplica o tema IMEDIATAMENTE, antes de o restante da página ser desenhado */
aplicarTema(obterTemaInicial());

/**
 * Inverte o tema atual e memoriza a escolha do usuário no navegador.
 */
function alternarTema() {
    var temaAtual = document.documentElement.getAttribute("data-tema");
    var novoTema = (temaAtual === "escuro") ? "claro" : "escuro";

    aplicarTema(novoTema);
    localStorage.setItem(CHAVE_TEMA, novoTema);
}

/* ==========================================================================
   2. INICIALIZAÇÃO APÓS O CARREGAMENTO DO HTML
   O evento DOMContentLoaded garante que os elementos já existem na página
   antes de tentarmos associar os eventos de clique a eles.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ----- Botão de alternância de tema ----- */
    var botaoTema = document.getElementById("botao-tema");

    if (botaoTema) {
        // Reaplica o tema atual só para acertar o ícone do botão
        aplicarTema(document.documentElement.getAttribute("data-tema"));
        botaoTema.addEventListener("click", alternarTema);
    }

    /* ----- Menu hambúrguer (telas pequenas) ----- */
    var botaoMenu = document.getElementById("botao-menu");
    var navegacao = document.getElementById("navegacao");

    if (botaoMenu && navegacao) {

        /**
         * Abre ou fecha o menu de navegação.
         * O atributo aria-expanded informa leitores de tela sobre o estado
         * do menu e também é usado pelo CSS para animar o ícone (vira "X").
         */
        function alternarMenu() {
            var estaAberto = navegacao.classList.toggle("navegacao--aberta");
            botaoMenu.setAttribute("aria-expanded", estaAberto ? "true" : "false");
            botaoMenu.setAttribute(
                "aria-label",
                estaAberto ? "Fechar menu de navegação" : "Abrir menu de navegação"
            );
        }

        /** Fecha o menu, se ele estiver aberto. */
        function fecharMenu() {
            if (navegacao.classList.contains("navegacao--aberta")) {
                alternarMenu();
            }
        }

        botaoMenu.addEventListener("click", alternarMenu);

        // Fecha o menu depois de clicar em um link, para não cobrir a página
        var links = navegacao.querySelectorAll(".navegacao__link");

        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener("click", fecharMenu);
        }

        // Fecha o menu ao clicar em qualquer área fora do cabeçalho
        document.addEventListener("click", function (evento) {
            var clicouNoMenu = navegacao.contains(evento.target);
            var clicouNoBotao = botaoMenu.contains(evento.target);

            if (!clicouNoMenu && !clicouNoBotao) {
                fecharMenu();
            }
        });

        // Fecha o menu quando o usuário pressiona a tecla Esc
        document.addEventListener("keydown", function (evento) {
            if (evento.key === "Escape") {
                fecharMenu();
            }
        });

        // Se a janela for ampliada até o menu voltar a ser horizontal,
        // remove o estado "aberto" para evitar comportamento inesperado.
        window.addEventListener("resize", function () {
            if (window.innerWidth > 860) {
                fecharMenu();
            }
        });
    }

    /* ----- Ano atual no rodapé -----
       Evita que o rodapé fique desatualizado com o passar do tempo. */
    var anoAtual = document.getElementById("ano-atual");

    if (anoAtual) {
        anoAtual.textContent = new Date().getFullYear();
    }
});
