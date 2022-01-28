import express from "express";
import { createQueryBuilder } from "typeorm";

import { Client } from "../entities/Client";

const router = express.Router();

router.get("/", async (req, res) => {
  const client = await createQueryBuilder("client")
    .select("client.first_name")
    .addSelect("client.last_name")
    .from(Client, "client")
    .where("client.id = :clientId", { clientId: 1 })
    .getOne();

  return res.json(client);
});

router.post("/", async (req, res) => {
  const { firstName, lastName, email, cardNumber, balance } = req.body;

  const client = Client.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    balance,
  });

  await client.save();

  return res.json(client);
});

router.delete("/:clientId", async (req, res) => {
  const { clientId } = req.params;

  const client = await Client.delete(parseInt(clientId));

  return res.json(client);
});

export { router as client };
