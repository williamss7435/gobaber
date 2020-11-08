const jwt = require('jsonwebtoken');
const yup = require('yup');

const User = require('../models/Users');
const File = require('../models/File');
const authConfig = require('../../config/auth');

class SessionController {
  async store(req, res) {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),

    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation Fails',
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [
        { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
      ],
    });

    if (!user) {
      return res.status(401).json({
        error: 'User not found',
      });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({
        error: 'Password does not match',
      });
    }

    const {
      id, name, avatar, provider,
    } = user;

    return res.json({
      user: {
        id, name, email, avatar, provider,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

module.exports = new SessionController();
