# CRUD-contas-Bancarias!
<br>
 <img src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fdevporai.com.br%2Fwp-content%2Fuploads%2F2021%2F01%2FO-que-e-CRUD.jpg&tbnid=qfdvTaKBvCbZHM&vet=12ahUKEwiv46rU-fCAAxVjI7kGHS70B-QQMygMegQIARBu..i&imgrefurl=https%3A%2F%2Fdevporai.com.br%2Fo-que-e-crud-e-porque-voce-deveria-aprender-a-criar-um%2F&docid=_yDElqOFrAc1NM&w=1600&h=900&q=readme%20de%20um%20crud%20de%20contas%20de%20um%20banco%20de%20dados%20javascript&ved=2ahUKEwiv46rU-fCAAxVjI7kGHS70B-QQMygMegQIARBu" alt="definiçao de um crud" title="" height="60" width="240" align="right"/>

### Table of Contents
**[Sobre](#sobre)**<br>
**[Operações de CRUD](#operações-de-crud)**<br>
    *[-- CREATE](#create)*<br>
    *[-- READ](#read)*<br>
    *[-- UPDATE](#update)*<br>
    *[-- DELETE](#delete)*<br>

    ## Sobre:

<p>Sistema de gerenciamento de contas com operações de <strong>CRUD</strong> e <strong>geração de relatórios</strong><p>
  
   
### Operações de CRUD:

  #### [READ](consultar.php "Código da operação")
  <p>Ao entrar no sistema, a página de consulta é aberta exibindo todos as contas armazenadas no banco de dados, com seus devidos atributos:</p>

   <div align="center"><img src="./img/listar.png" alt="Página de consulta"/></div>

   
  #### [CREATE](adicionar.php "Código da operação")
  <p>Clicando em adicionar conta, a página do body é exibida. Nela, o usuário pode cadastrar novas contas em banco de dados.</p>

  
   <div align="center"><img src="./img/cadastrar.png" alt="Página de consulta"/></div>

   
  <p>Ao clicar no botão "adicionar", a nova conta com suas respectivas características é salva no banco de dados se o usuário clicar de volta na página de consulta, exibirá as informações atualizadas.</p>

   
  #### [UPDATE](./php_action/update.php "Código da operação")
  <p>Clicando no botão de edição, a página de edição é aberta e o usuário pode editar o conteúdo dos atributos da conta respectiva se o mesmo for o titular:</p>

  <div align="center"><img src="./img/atualizar.png" alt="Página de consulta"/></div>

  
  <p>Ao clicar em atualizar, as alterações são salvas no banco de dados e as novas informações do usuário, exibirá atualizadas.</p>
  
  #### [DELETE](./php_action/delete.php "Código da operação")
  <p>Clicando em deletar conta, tem que adicionar um numero de conta no parametro da rota para a verificação se a conta e existente se a mesma for é exigida a senha para assim ocorrer a exclusão da respectiva conta.</p>

  
  <div align="center"><img src="./img/deletar.png" alt="Modal da operação delete"/></div>



  <p> Se novamente listar as contas a mesma estará excluida do banco de dados.</p>

  <p> como se trata de contas bancarias tambem e nescessario ter as respectivas caracteristicas listadas a baixo:</p>

  <br><br>

### Depósitar 

<div align="center"><img src="./img/sacar.png" alt="Modal da operação sacar"/></div>

### Sacar 

<div align="center"><img src="./img/sacar.png" alt="Modal da operação sacar"/></div>

### Transferir valores entre contas bancárias

<div align="center"><img src="./img/tranferencia.png" alt="Modal da operação transferir"/></div>

### Consultar saldo da conta bancária

<div align="center"><img src="./img/saldo.png" alt="Modal da operação mostrar saldo"/></div>

### Emitir extrato bancário

<div align="center"><img src="./img/extrato1.png" alt="Modal da operação mostrar saldo"/></div>
<br>
<div align="center"><img src="./img/extrato2.png" alt="Modal da operação mostrar saldo"/></div>



