const { startOfDay, endOfDay, parseISO } = require('date-fns');
const { Op } = require('sequelize');

const Appointment = require('../models/Appointment');
const User = require('../models/Users');

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });

    if (!checkUserProvider) {
      return res.status(401).json({
        error: 'user is not a provider',
      });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [
            startOfDay(parsedDate), endOfDay(parsedDate),
          ],
        },
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
      order: ['date'],
    });

    return res.json({
      appointments,
    });
  }
}

module.exports = new ScheduleController();
