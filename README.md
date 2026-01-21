# 📱 Gerenciador de Clientes - Whatsapp Integration

![Status](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)

Um sistema web leve, moderno e responsivo para gerenciamento de clientes com integração direta ao Whatsapp. Desenvolvido com foco em **UX Premium**, **Clean Code** e perfomance, rodando inteiramente no navegador (Client-Side).

## 🚀 Funcionalidades

- **📋 Gestão de Lista**: Adicione e visualize seus clientes de forma organizada.
- **💬 Click-to-Chat**: Inicie conversas no Whatsapp com apenas um clique, sem precisar salvar o número na agenda do telemóvel.
- **💾 Persistência Automática**: Seus dados são salvos automaticamente no **LocalStorage** do navegador. Feche a aba ou reinicie o PC, seus dados estarão lá.
- **✨ UI/UX Moderna**:
  - Interface limpa baseada em Tailwind CSS.
  - **Modal Customizado** para ações destrutivas (nada de `alert` nativos feios).
  - **Toast Notifications** para feedback visual de sucesso/erro.
  - Animações suaves de entrada e saída.

## 🛠️ Stack Tecnológica

Este projeto foi construído seguindo princípios de **Arquitetura Limpa** adaptada para Frontend.

- **Frontend Core**: HTML5 Semântico, Vanilla JavaScript (ES6+).
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/) (Interface) & CSS3 Customizado (Animações).
- **Ícones**: SVG (Heroicons).
- **Ambiente**: Configurado com `jsconfig.json` para Intellisense avançado no VS Code.

## 📂 Estrutura do Projeto

```text
/
├── .vscode/            # Configurações do editor (Intellisense/Emmet)
├── docs/               # Documentação das fases do projeto
│   ├── phase-00-init.md
│   ├── phase-01-architecture.md
│   └── phase-02-setup.md
├── src/
│   ├── style.css       # Estilos globais e animações
│   └── script.js       # Lógica de negócio, UI e Persistência
├── index.html          # Ponto de entrada da aplicação
├── tailwind.config.js  # Configuração de suporte ao Tailwind
└── package.json        # Metadados do projeto
```

## ⚡ Como Rodar

Este é um projeto estático, ou seja, não necessita de um backend complexo (Node/PHP/Python) para funcionar.

### Opção 1: Simples (Navegador)

1. Baixe o repositório ou os arquivos.
2. Abra o arquivo `index.html` diretamente no seu navegador (Chrome, Edge, Firefox).

### Opção 2: Desenvolvedor (Live Server)

Para uma experiência melhor (com auto-reload):

1. Abra a pasta do projeto no **VS Code**.
2. Instale a extensão **Live Server**.
3. Clique em "Go Live" na barra inferior.

## 🔜 Próximos Passos (Roadmap)

- [ ] Implementar filtros de busca por nome.
- [ ] Adicionar opção de exportar lista para CSV/Excel.
- [ ] Criar categorias/tags para clientes (ex: "VIP", "Novo").
- [ ] Adicionar modo escuro (Dark Mode).

## 📝 Licença

Este projeto está sob a licença [MIT](LICENSE). Sinta-se livre para usar, estudar e modificar.

---

Desenvolvido com 💻 e foco em qualidade.
