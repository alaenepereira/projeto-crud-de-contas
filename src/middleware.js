let validatePassword = (req, res, next) => {
  const { senha_banco } = req.query;
  if (!senha_banco) {
    return res
      .status(401)
      .json({ mensagem: "E obrigatorio colocar uma senha" });
  }
  if (senha_banco !== "Cubos123Bank") {
    return res
      .status(401)
      .json({ mensagem: "A senha do banco informada é inválida!" });
  }
  next();
};
module.exports = validatePassword;
