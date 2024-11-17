// import { openDb } from "./configDB.js";
// import {
//   createTable,
//   insertPessoa,
//   updatePessoa,
//   selectPessoas,
//   selectPessoa,
//   deletePessoa,
// } from "./Controler/Pessoa.js";

import express from "express";
import fs from "fs";
import https from "https";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

import router from "./routes.js";
app.use(router);

// openDb();

// createTable();

// app.get("/", function (req, res) {
//   res.send("Rota Raiz, Api está Rodando");
// });

// app.get("/pessoas", async function (req, res) {
//   let pessoas = await selectPessoas();
//   res.json(pessoas);
//   //   res.send("Rota Raiz, Api está Rodando");
// });

// app.get("/pessoa", async function (req, res) {
//   let pessoa = await selectPessoa(req.body.id);
//   res.json(pessoa);
// });

// app.post("/pessoa", function (req, res) {
//   console.log(req.body);
//   insertPessoa(req.body);

//   res.json({
//     statusCode: 200,
//   });
// });

// app.put("/pessoa", function (req, res) {
//   if (req.body && !req.body.id) {
//     res.json({
//       statusCode: "400",
//       msg: "Você precisa informar um id",
//     });
//   } else {
//     console.log(req.body);
//     updatePessoa(req.body);

//     res.json({
//       statusCode: 200,
//     });
//   }
// });

// app.delete("/pessoa", async function (req, res) {
//   let pessoa = await deletePessoa(req.body.id);
//   res.json(pessoa);
//   //   res.json({ message: "Successfully deleted" });
// });

app.listen(3000, () => console.log("Api Rodando"));

https
  .createServer(
    {
      cert: fs.readFileSync("src/SSL/code.crt"),
      key: fs.readFileSync("src/SSL/code.key"),
    },
    app
  )
  .listen(30001, () => console.log("Rodando em https")); // O correto seria ".listen(443)" usar a porta 443 pois é o padrão nos servidores para a porta SSL; Mas como não está no servidor pode ser que na sua maquina essa porta esteja bloqueada por segurança, mas em um servidor essa porta "443" vai está aberta para disponibilizar acesso ao "client"
