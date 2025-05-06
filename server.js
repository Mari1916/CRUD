const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const router = require("./routes/userRoutes");
const apiPort = 3000;
 
const app = express(); // Criando aplicação 
 
app.use(express.json());
app.use(cors());
 
sequelize.authenticate()
    .then(() => {
        console.log("Conexão estabelecida com MySQL");
    })
    .catch((err) => {
        console.error("Erro ao se conectar ao MySQL", err);
    });
 
sequelize.sync({ force: true })
    .then(() => {
        console.log("Sincronização bem-sucedida com MySQL");
    })
    .catch((err) => {
        console.error("Erro na sincronização com MySQL", err);
    });
 
app.use("/api", router); // Desejamos utilizar modelo de conversa JSON
 
app.listen(apiPort, () => {
    console.log(`API rodando com sucesso na porta ${apiPort}`);
});