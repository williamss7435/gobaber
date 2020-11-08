const yup = require('yup');
const User = require('../models/Users');
const Users = require('../models/Users');
const File = require('../models/File');

class UsersController {
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation Fails',
      });
    }

    const userExists = await Users.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({
        error: 'User already exists',
      });
    }

    const {
      id, name, email, provider,
    } = await Users.create(req.body);

    return res.json({
      id, name, email, provider,
    });
  }

  async update(req, res) {
    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      oldPassword: yup.string().min(6),
      password: yup.string().min(6).when('oldPassword', (oldPassword, field) => (oldPassword ? field.required() : field)),
      confirmPassword: yup.string().when('password', (password, field) => (password ? field.required().oneOf([yup.ref('password')]) : field)),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation Fails',
      });
    }

    const { email, oldPassword } = req.body;
    const user = await Users.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await Users.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await user.update(req.body);

    const {
      id, name, provider, avatar,
    } = await Users.findByPk(req.userId, {
      include: [
        { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
      ],
    });

    return res.json({
      id, name, provider, avatar, email,
    });
  }
}

module.exports = new UsersController();
