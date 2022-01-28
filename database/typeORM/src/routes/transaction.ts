import express from "express";
import { Client } from "../entities/Client";
import { Transaction, TransactionTypes } from "../entities/Transaction";

const router = express.Router();

router.post("/:clientId", async (req, res) => {
  const { clientId } = req.params;
  const { type, amount } = req.body;

  const client = await Client.findOne(parseInt(clientId));

  if (!client) {
    return res.json({
      massage: "client not found",
    });
  }

  const transaction = Transaction.create({
    amount,
    type,
    client,
  });

  await transaction.save();

  if (type === TransactionTypes.DEPOSIT) {
    client.balance += amount;
  } else if (type === TransactionTypes.WITHDRAW) {
    client.balance -= amount;
  }

  await client.save();

  return res.json(transaction);
});

export { router as transaction };
