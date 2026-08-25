/* ==========================================================================
   CONTATO.JS - Validação e simulação de envio do formulário de contato
   JavaScript puro (Vanilla JS), sem bibliotecas externas.

   O que este arquivo faz:
   1. Impede o envio real do formulário (não há servidor: o envio é simulado)
   2. Valida os três campos obrigatórios: nome, e-mail e mensagem
   3. Verifica se o e-mail informado tem um formato válido
   4. Exibe mensagens de erro específicas abaixo de cada campo
   5. Em caso de sucesso: limpa o formulário e exibe um modal de confirmação
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ----- Elementos do formulário utilizados ao longo do arquivo ----- */
    var formulario = document.getElementById("formulario-contato");

    // Se esta página não tiver o formulário, o script encerra aqui.
    if (!formulario) {
        return;
    }

    var campoNome = document.getElementById("nome");
    var campoEmail = document.getElementById("email");
    var campoMensagem = document.getElementById("mensagem");

    var modal = document.getElementById("modal-sucesso");
    var botaoFecharModal = document.getElementById("fechar-modal");

    /* Expressão regular que valida o formato do e-mail.
       Traduzindo a regra: um ou mais caracteres válidos, seguidos de "@",
       mais um domínio, um ponto e uma extensão de pelo menos 2 letras.
       Exemplo aceito: usuario@dominio.com */
    var PADRAO_EMAIL = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

    /* ======================================================================
       FUNÇÕES AUXILIARES DE EXIBIÇÃO DE ERRO
       ====================================================================== */

    /**
     * Exibe uma mensagem de erro abaixo de um campo e o marca visualmente.
     * @param {HTMLElement} campo - O input ou textarea com problema
     * @param {string} mensagem - O texto de erro a ser exibido
     */
    function exibirErro(campo, mensagem) {
        var elementoErro = document.getElementById("erro-" + campo.id);

        campo.classList.add("formulario__entrada--erro");
        // aria-invalid comunica o erro a leitores de tela
        campo.setAttribute("aria-invalid", "true");

        if (elementoErro) {
            elementoErro.textContent = mensagem;
        }
    }

    /**
     * Remove a marcação de erro de um campo.
     * @param {HTMLElement} campo - O input ou textarea a ser limpo
     */
    function limparErro(campo) {
        var elementoErro = document.getElementById("erro-" + campo.id);

        campo.classList.remove("formulario__entrada--erro");
        campo.setAttribute("aria-invalid", "false");

        if (elementoErro) {
            elementoErro.textContent = "";
        }
    }

    /** Remove a marcação de erro dos três campos de uma só vez. */
    function limparTodosOsErros() {
        limparErro(campoNome);
        limparErro(campoEmail);
        limparErro(campoMensagem);
    }

    /* ======================================================================
       VALIDAÇÃO DOS CAMPOS
       Cada função valida um campo e devolve true (válido) ou false.
       ====================================================================== */

    /** Valida o campo Nome: obrigatório e com pelo menos 3 caracteres. */
    function validarNome() {
        // trim() remove espaços no início e no fim, impedindo que o usuário
        // burle a validação digitando apenas espaços.
        var valor = campoNome.value.trim();

        if (valor === "") {
            exibirErro(campoNome, "Por favor, informe o seu nome.");
            return false;
        }

        if (valor.length < 3) {
            exibirErro(campoNome, "O nome deve ter pelo menos 3 caracteres.");
            return false;
        }

        limparErro(campoNome);
        return true;
    }

    /** Valida o campo E-mail: obrigatório e com formato válido. */
    function validarEmail() {
        var valor = campoEmail.value.trim();

        if (valor === "") {
            exibirErro(campoEmail, "Por favor, informe o seu e-mail.");
            return false;
        }

        // test() devolve true quando o valor corresponde à expressão regular
        if (!PADRAO_EMAIL.test(valor)) {
            exibirErro(campoEmail, "Informe um e-mail válido. Exemplo: usuario@dominio.com");
            return false;
        }

        limparErro(campoEmail);
        return true;
    }

    /** Valida o campo Mensagem: obrigatório e com pelo menos 10 caracteres. */
    function validarMensagem() {
        var valor = campoMensagem.value.trim();

        if (valor === "") {
            exibirErro(campoMensagem, "Por favor, escreva a sua mensagem.");
            return false;
        }

        if (valor.length < 10) {
            exibirErro(campoMensagem, "A mensagem deve ter pelo menos 10 caracteres.");
            return false;
        }

        limparErro(campoMensagem);
        return true;
    }

    /* ======================================================================
       MODAL DE CONFIRMAÇÃO
       ====================================================================== */

    /** Exibe o modal informando que a mensagem foi enviada. */
    function abrirModal() {
        modal.classList.add("modal--visivel");
        modal.setAttribute("aria-hidden", "false");

        // Move o foco do teclado para dentro do modal (acessibilidade)
        botaoFecharModal.focus();
    }

    /** Fecha o modal e devolve o foco para o campo Nome. */
    function fecharModal() {
        modal.classList.remove("modal--visivel");
        modal.setAttribute("aria-hidden", "true");
        campoNome.focus();
    }

    /* ======================================================================
       EVENTOS
       ====================================================================== */

    /* --- Envio do formulário --- */
    formulario.addEventListener("submit", function (evento) {
        // preventDefault impede o recarregamento da página: como não existe
        // servidor, o envio é apenas simulado pelo JavaScript.
        evento.preventDefault();

        /* Cada função é chamada separadamente (e não dentro de um "&&")
           para que TODOS os erros apareçam de uma vez, e não apenas o
           primeiro deles. */
        var nomeValido = validarNome();
        var emailValido = validarEmail();
        var mensagemValida = validarMensagem();

        if (nomeValido && emailValido && mensagemValida) {
            // SUCESSO: limpa os campos e confirma o envio ao usuário
            formulario.reset();
            limparTodosOsErros();
            abrirModal();
        } else {
            // ERRO: leva o usuário direto para o primeiro campo com problema
            if (!nomeValido) {
                campoNome.focus();
            } else if (!emailValido) {
                campoEmail.focus();
            } else {
                campoMensagem.focus();
            }
        }
    });

    /* --- Validação enquanto o usuário digita ---
       Assim que o usuário corrige um campo, a mensagem de erro desaparece,
       tornando o formulário mais agradável de usar. */
    var campos = [campoNome, campoEmail, campoMensagem];

    for (var i = 0; i < campos.length; i++) {
        campos[i].addEventListener("input", function () {
            if (this.classList.contains("formulario__entrada--erro")) {
                limparErro(this);
            }
        });

        // Ao sair do campo (evento blur), valida imediatamente aquele campo
        campos[i].addEventListener("blur", function () {
            if (this.value.trim() === "") {
                return; // Não acusa erro em campo ainda não preenchido
            }

            if (this === campoNome) {
                validarNome();
            } else if (this === campoEmail) {
                validarEmail();
            } else {
                validarMensagem();
            }
        });
    }

    /* --- Formas de fechar o modal --- */

    // 1. Clique no botão "Fechar"
    botaoFecharModal.addEventListener("click", fecharModal);

    // 2. Clique na área escurecida em volta da caixa do modal
    modal.addEventListener("click", function (evento) {
        if (evento.target === modal) {
            fecharModal();
        }
    });

    // 3. Tecla Esc
    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" && modal.classList.contains("modal--visivel")) {
            fecharModal();
        }
    });
});
