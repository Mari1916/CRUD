const User = require("../model/user");

const bcrypt = require("bcryptjs");

//JWT -> Token Aplicação
const jwt = require("jsonwebtoken");

const userController = {
  login: async (request, response) => {
    const { email, senha } = request.body;

    if (!email || !senha) {
      return response.status(400).json({
        msg: "Campos inválidos",
      });
    }

    //Select * FROM User WHERE email = email
    const userEncontrado = User.findAndCountAll({
      where: { email },
    });

    if (!userEncontrado) {
      return response.status(403).json({
        msg: "Email ou senha incorretos",
      });
    }

    const isCerto = await bcrypt.compare(senha, userEncontrado.senha);

    if (!isCerto) {
      return response.status(401).json({
        msg: "E-mail ou senha incorreta",
      });
    }

    //playload -> Conteúdo dentro de JWT
    const playload = {
      id: userEncontrado.id,
      email: userEncontrado.email,
    };

    const token = jwt.sign(playload, "palestra-italia", {
      expiresIn: "1h",
    });

    return response.status(200).json({
      token,
      msg: "usuario autenticado com sucesso",
    });
  },
  create: async (request, response) => {
    try {
      const { nome, email, senha } = request.body;

      const hashedSenha = await bcrypt.hash(senha, 10);

      await User.create({ nome, email, senha: hashedSenha });

      const userCriado = await User.create({ nome, email, senha });

      return response.status(201).json({
        msg: " O usuário foi crido com sucesso",
        userCriado,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        msg: " Ocorreu um erro ao acessar a API",
      });
    }
  },
  update: async (request, response) => {
    try {
      const { id } = request.params;
      const { nome, email, senha } = request.body;

      if (!nome || !email || !senha) {
        return response.status(400).json({
          msg: "Campo inconrreto ou vazio",
        });
      }

      const userExiste = await User.findByPk(id);
      if (!userExiste) {
        return response.status(400).json({
          msg: "Usuário não encontrado",
        });
      }

      await User.update(
        {
          nome,
          email,
          senha,
        },
        {
          where: {
            id: id,
          },
        }
      );
    } catch (error) {
      return response.status(500).json({
        msg: " Ocorreu um erro ao acessar a API",
      });
    }
  },
  findAll: async (request, response) => {
    try {
      const user = await User.findAll();

      return response.status(201).json(user);
    } catch (erro) {
      return response.status(500).json({
        msg: " Ocorreu um erro interno ao buscar todos os usuários",
      });
    }
  },
  delete: async (request, response) => {
    try {
      const { id } = request.params;
      const existeUser = await User.findByPk(id);

      if (!existeUser) {
        return response.status(400).json({
          msg: "Usuário não foi encontrado",
        });
      }
      await User.destroy({
        where: {
          id: id,
        },
      });
      return response.status(200).json({
        msg: " O usuário foi deletado com sucesso",
      });
    } catch (erro) {
      return response.status(500).json({
        msg: " Ocorreu um erro ao deletar o usuário",
      });
    }
  },
  findById: async (request, response) => {
    try {
      const { id } = request.params;

      const userEncontrado = await User.findByPk(id);

      if (!existeUser) {
        return response.status(204).json({
          msg: "Usuário não foi encontrado",
        });
      }
      return response.status(200).json(userEncontrado);
    } catch (error) {
      return response.status(500).json({
        msg: " Ocorreu um erro ao deletar o usuário",
      });
    }
  },
};

module.exports = userController;
