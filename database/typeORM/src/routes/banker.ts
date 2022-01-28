import express from "express";
import { Banker } from "../entities/Banker";
import { Client } from "../entities/Client";

const router = express.Router();

router.post("/", async (req, res) => {
  const { firstName, lastName, email, cardNumber, employeeNumber } = req.body;

  const banker = Banker.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    employee_number: employeeNumber,
  });

  await banker.save();

  return res.json(banker);
});

router.put("/:bankerId/client/:clientId", async (req, res) => {
  const { bankerId, clientId } = req.params;

  const banker = await Banker.findOne(parseInt(bankerId));

  const client = await Client.findOne(parseInt(clientId));

  if (!client || !banker) {
    return res.json({
      massage: "Banker or Client not found.",
    });
  }

  banker.clients = [...banker.clients, client];

  await banker.save();

  return res.json(banker);
});

export { router as banker };
