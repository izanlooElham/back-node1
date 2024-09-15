const { TransactionController } = require("../../http/controllers/payment/transactions");

const router = require("express").Router();
router.get("/list", TransactionController.getAllTransactions)
module.exports = {
    AdminApiTransactionRouter: router
}