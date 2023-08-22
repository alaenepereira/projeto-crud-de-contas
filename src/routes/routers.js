const express = require("express");
let validatePassword = require("../middleware");

const router = express();
const {
  addAccount,
  list,
  updateAccount,
  deleteAccount,
  updateDeposit,
  withdrawBank,
  bankTransfer,
  accountBalance,
  accountStatement,
} = require("../controller/controllers");

router.get("/contas", validatePassword, list);
router.post("/contas", addAccount);
router.put("/contas/:numeroConta/usuario", updateAccount);
router.delete("/contas/:numeroConta", deleteAccount);
router.post("/contas/transacoes/depositar", updateDeposit);
router.post("/contas/transacoes/sacar", withdrawBank);
router.post("/contas/transacoes/transferir", bankTransfer);
router.get("/contas/saldo", accountBalance);
router.get("/contas/extrato", accountStatement);

module.exports = router;
