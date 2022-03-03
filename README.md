Teste Técnico - Desenvolvedor React - QuikDev 
- Eduardo Raniero Silva
- eduardoraniero@gmail.com
- (11) 94983-6489

## Como interpretei o teste:

Como a aplicação adiciona/remove/edita postagens e comentários, assim como possue sistema de login, tomei decisões de logotipo e estilização pensando no produto final como uma "mini Rede Social".
## Stacks utilizadas

- Next.JS;
- SASS;
- React-Icons;
- SweetAlert;

## Porque de cada um

- _**Next.JS:**_ Devido ao seu modo de prcessamento, Server Side Rendering, as aplicações Next são previamente carregadas na camada intermediária entre o servidor e o cliente, sendo exibidas em tela com maior velocidade e sem a necessidade da `<div className="root">`, tornando assim o código indexável aos mecanismos de busca, melhorando o ranqueamento da página e a experiência do usuário;

- _**SASS:**_ Como decidi criar uma estilização do zero para este projeto e precisava ser eficiente, utilizei o SASS para que eu pudesse aninhar as linhas de css, tornando o processo de estilização mais rápido e o resultado final com melhor leiturabilidade, facilitando sua manutenção;

- _**React-Icons:**_ Essencial para facilitar a navegação do usuário através de ícones intuitivos, comunicando visualmente o que esperar de cada botão.

- _**SweetAlert:**_ Biblioteca utilizada para aprimorar a experiência do usuário ao preencher formulários de cadastro, de login, interagir com as opções de cada Post e afins.

## Como rodar essa aplicação

- No terminal, faça a cópia do repositório através do comando:
```bash
git clone https://github.com/eduardo-raniero/my-social-media.git
```

- Abra a pasta com o [Visual Studio Code](https://code.visualstudio.com/) ou seu editor de preferência.

- Para instalar corretamente as dependências, abra o terminal do editor, ou o prompt dentro da pasta do projeto, e execute o comando:
```bash
yarn
#ou
npm install
```

- Instaladas as dependências rode o comando `npm run dev` ou `yarn dev` para que o Front-End rode na url `localhost:3000`:

```bash
my-social-media> npm run dev
#ou
my-social-media> yarn dev
```

- Dentro de poucos segundos a aplicação será iniciada!





