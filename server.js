const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const UserRoutes = require('./routes/UserRoutes');
const User = require('./models/User');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(UserRoutes);

sequelize.sync().then(() => {
    console.log('Banco de dados sincronizado!');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 8080')
});
