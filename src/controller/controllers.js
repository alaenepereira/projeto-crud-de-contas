let bancoDeDados = require("../database");
let numero = 1;
let saldo = bancoDeDados.saldo;
const list = (req, res) => {
  return res.status(200).json(bancoDeDados.contas);
};

const addAccount = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome) {
    return res.status(400).send({ mensagem: "O nome é obrigatório" });
  }
  if (!cpf) {
    return res.status(400).send({ mensagem: "O cpf é obrigatório" });
  }
  if (!data_nascimento) {
    return res
      .status(400)
      .send({ mensagem: "A data de nascimento é obrigatório" });
  }
  if (!telefone) {
    return res.status(400).send({ mensagem: "O telefone é obrigatório" });
  }
  if (!email) {
    return res.status(400).send({ mensagem: "O email é obrigatório" });
  }
  if (!senha) {
    return res.status(400).send({ mensagem: "A senha é obrigatório" });
  }
  const verifyCpf = bancoDeDados.contas.find(
    (conta) => conta.usuario.cpf === cpf
  );
  const verifyEmail = bancoDeDados.contas.find(
    (item) => item.usuario.email === email
  );

  if (verifyEmail && verifyCpf) {
    return res
      .status(404)
      .json({ mensagem: "Já existe uma conta com o cpf ou e-mail informado!" });
  }

  const account = {
    numero,
    saldo,
    usuario: {
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha,
    },
  };
  numero++;
  bancoDeDados.contas.push(account);
  return res.status(201).json();
};

const updateAccount = (req, res) => {
  const { numeroConta } = req.params;

  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome) {
    return res.status(400).send({ mensagem: "O nome é obrigatório" });
  }
  if (!cpf) {
    return res.status(400).send({ mensagem: "O cpf é obrigatório" });
  }
  if (!data_nascimento) {
    return res
      .status(400)
      .send({ mensagem: "A data de nascimento é obrigatório" });
  }
  if (!telefone) {
    return res.status(400).send({ mensagem: "O telefone é obrigatório" });
  }
  if (!email) {
    return res.status(400).send({ mensagem: "O email é obrigatório" });
  }
  if (!senha) {
    return res.status(400).send({ mensagem: "A senha é obrigatório" });
  }
  const cpfExists = bancoDeDados.contas.find(
    (conta) => conta.usuario.cpf === cpf
  );
  if (cpfExists) {
    return res.status(404).json({
      mensagem: "O CPF informado já existe cadastrado!",
    });
  }

  const emailExists = bancoDeDados.contas.find(
    (conta) => conta.usuario.email === email
  );
  if (emailExists) {
    return res.status(404).json({
      mensagem: "O email informado já existe cadastrado!",
    });
  }
  let account = bancoDeDados.contas.find(
    (conta) => conta.numero === Number(numeroConta)
  );

  if (!account) {
    return res
      .status(404)
      .json({ mensagem: "A conta a ser atualizada nao existe" });
  }
account.usuario.nome = nome;
  account.usuario.data_nascimento = data_nascimento;
  account.usuario.telefone = telefone;
  account.usuario.email = email;
  account.usuario.senha = senha;
  res.status(200).json();
};

const deleteAccount = (req, res) => {
  const { numeroConta } = req.params;
  const account = bancoDeDados.contas.find(
    (account) => +account.numero === Number(numeroConta)
  );
  if (!account) {
    return res
      .status(404)
      .json({ mensagem: "A conta a ser excluida nao existe" });
  }

  if (saldo < 0) {
    return res.status(404).json({
      mensagem: "A conta só pode ser removida se o saldo for zero!",
    });
  }

  newAccounts = bancoDeDados.contas.filter(
    (conta) => conta.numero !== Number(numeroConta)
  );
  bancoDeDados.contas = newAccounts;

  return res.status(201).json();
};

const updateDeposit = (req, res) => {
  const { numeroConta, valor } = req.body;
  if (!numeroConta && !valor) {
    return res
      .status(400)
      .json({ mensagem: "O numero da conta e o valor sao obrigatorios" });
  }
  const account = bancoDeDados.contas.find(
    (account) => account.numero === Number(numeroConta)
  );
  if (!account) {
    return res.status(400).json({ mensagem: "A conta nao e valida" });
  }
  if (valor <= 0) {
    return res.status(400).json({ mensagem: "o valor e invalido" });
  }
  let date = new Date();
  const deposit = {
    data: date.toLocaleString("pt-BR", { timezone: "UTC" }),
    numero_conta: numeroConta,
    valor,
  };

  account.saldo += valor;
  bancoDeDados.depositos.push(deposit);
  return res.status(200).json(deposit);
};

const withdrawBank = (req, res) => {
  let { numeroConta, valor, senha } = req.body;
  const account = bancoDeDados.contas.find(
    (account) => account.numero === Number(numeroConta)
  );

  if (!account) {
    return res.status(400).json({ mensagem: "A conta precisa ser valida" });
  }

  if (!senha) {
    return res.status(400).json({ mensagem: "A senha precisa ser valida" });
  }

  if (senha !== account.usuario.senha) {
    return res
      .status(400)
      .json({ mensagem: "A senha invalida verifique e tente novamente" });
  }
  if (account.saldo <= 0) {
    return res.status(400).json({ mensagem: "O saldo e insuficiente" });
  }
  let date = new Date();
  const saque = {
    data: date.toLocaleString("pt-BR", { timezone: "UTC" }),
    numero_conta: numeroConta,
    valor,
  };

  account.saldo = account.saldo - valor;
  bancoDeDados.saques.push(saque);

  return res.status(200).json(saque);
};

const bankTransfer = (req, res) => {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

  let accountStatement = bancoDeDados.contas.find(
    (account1) => account1.numero === Number(numero_conta_origem)
  );

  let accountExist = bancoDeDados.contas.find(
    (account2) => account2.numero === Number(numero_conta_destino)
  );

  if (!accountStatement) {
    return res
      .status(400)
      .json({ mensagem: "A conta de origem precisa ser valida" });
  }

  if (!accountExist) {
    return res
      .status(400)
      .json({ mensagem: "A conta de destino precisa ser valida" });
  }

  if (senha !== accountStatement.usuario.senha) {
    return res
      .status(400)
      .json({ mensagem: "A senha e invalida verifique e tente novamente" });
  }

  if (valor > accountStatement.saldo) {
    return res.status(400).json({ mensagem: "Saldo insuficiente!" });
  }
  let date = new Date();
  const tranferencia = {
    data: date.toLocaleString("pt-BR", { timezone: "UTC" }),
    numero_conta_origem,
    numero_conta_destino,
    valor,
  };

  accountStatement.saldo = accountStatement.saldo - valor;
  accountExist.saldo = accountExist.saldo + valor;
  bancoDeDados.transferencias.push(tranferencia);
  return res.status(200).json(tranferencia);
};

const accountBalance = (req, res) => {
  const { numeroConta, senha } = req.query;

  if (!numeroConta && !senha) {
    return res
      .status(400)
      .json({ mensagem: "O numero da conta e senha sao obrigatorios" });
  }
  const account = bancoDeDados.contas.find(
    (conta) => conta.numero === Number(numeroConta)
  );

  if (!account) {
    return res.status(400).json({ mensagem: "Conta bancária não encontada!" });
  }

  if (senha !== account.usuario.senha) {
    return res.status(400).json({ mensagem: "A senha precisa ser valida" });
  }
  return res.status(200).json(account.saldo);
};
const accountStatement = (req, res) => {
  const { numeroConta, senha } = req.query;
  if (!numeroConta && !senha) {
    return res
      .status(400)
      .json({ mensagem: "O numero da conta e senha sao obrigatorios" });
  }
  const account = bancoDeDados.contas.find(
    (conta) => conta.numero === Number(numeroConta)
  );

  if (!account) {
    return res.status(400).json({ mensagem: "Conta bancária não encontada!" });
  }

  if (senha !== account.usuario.senha) {
    return res.status(400).json({ mensagem: "A senha precisa ser valida" });
  }

  let statement = {
    depositos: bancoDeDados.depositos.filter(
      (deposito) => +deposito.numero_conta === Number(numeroConta)
    ),
    saques: bancoDeDados.saques.filter(
      (saque) => +saque.numero_conta === Number(numeroConta)
    ),
    transferenciasEnviadas: bancoDeDados.transferencias.filter(
      (transferencia) =>
        +transferencia.numero_conta_origem === Number(numeroConta)
    ),
    transferenciasRecebidas: bancoDeDados.transferencias.filter(
      (transferencia) =>
        +transferencia.numero_conta_destino === Number(numeroConta)
    ),
  };

  return res.status(200).json(statement);
};
module.exports = {
  addAccount,
  list,
  updateAccount,
  deleteAccount,
  updateDeposit,
  withdrawBank,
  bankTransfer,
  accountBalance,
  accountStatement,
};
