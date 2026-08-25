# Portfólio Pessoal — Reinaldo Gonçalves Pereira Neto

Currículo online desenvolvido como **Atividade Prática da disciplina Fundamentos da Programação Web** (UNINTER).

🔗 **Site publicado:** https://reinaldogpn.github.io/portfolio-web/

## Sobre o projeto

Portfólio pessoal com 4 páginas interligadas por um menu visível em todas elas:

| Página | Arquivo | Conteúdo |
|---|---|---|
| Sobre mim | `index.html` | Apresentação, hobbies e habilidades técnicas |
| Formação | `formacao.html` | Formação educacional, certificações e idiomas |
| Portfólio | `portfolio.html` | Projetos realizados, com links para o código-fonte |
| Contato | `contato.html` | Formulário com validação em JavaScript e canais diretos |

## Tecnologias

Construído **do zero**, sem frameworks, bibliotecas ou etapa de build:

- **HTML5** — marcação semântica (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **CSS3** — escrito à mão, com variáveis CSS, Flexbox, Grid e media queries
- **JavaScript (Vanilla JS)** — sem jQuery, React, Vue ou qualquer biblioteca

> Nenhum framework de CSS (Bootstrap, Tailwind, Bulma, Foundation, Materialize, Semantic UI)
> nem framework/biblioteca de JavaScript foi utilizado, conforme exigido pela atividade.
> O site também não depende de nenhum arquivo externo: as fontes são as do próprio
> sistema operacional e o ícone é um SVG local.

## Funcionalidades em JavaScript

- **Validação do formulário de contato** — verifica se nome, e-mail e mensagem estão preenchidos e se o e-mail tem formato válido, exibindo mensagens de erro específicas abaixo de cada campo
- **Simulação de envio** — após a validação, limpa os campos e exibe um modal de confirmação
- **Tema claro/escuro** — alternado por um botão no cabeçalho, com a preferência memorizada no `localStorage` e detecção do tema configurado no sistema operacional
- **Menu responsivo** — menu "hambúrguer" em telas pequenas, que fecha ao clicar em um link, ao clicar fora ou ao pressionar `Esc`

## Estrutura de arquivos

```
.
├── index.html            Página "Sobre mim"
├── formacao.html         Página "Formação"
├── portfolio.html        Página "Portfólio"
├── contato.html          Página "Contato"
├── css/
│   └── style.css         Folha de estilos única do site
├── js/
│   ├── main.js           Tema claro/escuro e menu responsivo
│   └── contato.js        Validação e simulação de envio do formulário
├── assets/
│   ├── favicon.svg       Ícone exibido na aba do navegador
│   └── img/
│       └── reinaldo.jpg  Foto de perfil
└── README.md
```

## Como executar localmente

O site é totalmente estático — basta abrir o arquivo `index.html` no navegador.

Para servi-lo por HTTP (recomendado, evita restrições de origem):

```bash
python -m http.server 8000
```

Depois, acesse `http://localhost:8000`.

## Acessibilidade e compatibilidade

- Layout responsivo testado em telas de smartphone, tablet e computador
- Navegação por teclado com contorno de foco visível
- Atributos `aria-*` no menu, no formulário e no modal
- Respeita a preferência de sistema `prefers-reduced-motion`
- Estilos específicos para impressão

## Autor

**Reinaldo Gonçalves Pereira Neto** — Desenvolvedor .NET

[GitHub](https://github.com/reinaldogpn) · [LinkedIn](https://www.linkedin.com/in/reinaldogpn/) · reinaldogpn@outlook.com
