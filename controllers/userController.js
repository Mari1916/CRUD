const User = require('../models/user');

const UserController = {
    async listar(req, res) {
        const users = await User.findAll();
        res.json(users);
    },
    async criar(req, res) {
        const user = await User.create(req.body);
        res.json(user);
    },
    async atualizar(req, res) {
        await User.update(req.body, { where: { id: req.params.id } });
        res.json({ message: 'Usuário atualizado' });
    },
    async excluir(req, res) {
        await User.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Usuário deletado' });
    }
};

module.exports = UserController;
