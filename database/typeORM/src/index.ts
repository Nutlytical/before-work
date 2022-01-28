import { createConnection } from "typeorm";
import express from "express";

import { Banker } from "./entities/Banker";
import { Client } from "./entities/Client";
import { Transaction } from "./entities/Transaction";

import { banker } from "./routes/banker";
import { client } from "./routes/client";
import { transaction } from "./routes/transaction";

const app = express();

const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "password",
      database: "postgres",
      entities: [Client, Banker, Transaction],
      synchronize: true,
    });

    app.use(express.json());
    app.use("/api/client", client);
    app.use("/api/banker", banker);
    app.use("/api/transaction", transaction);

    app.listen(8080, () => {
      console.log("http://localhost:8080");
    });
  } catch (error) {
    console.log(error);
  }
};

main();
