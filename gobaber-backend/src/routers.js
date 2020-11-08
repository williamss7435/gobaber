const { Router } = require('express');

const routes = new Router();

const multer = require('multer');
const multerConfig = require('./config/multer');

const upload = multer(multerConfig);
const authMiddleware = require('./app/middlewares/auth');

const UsersController = require('./app/controllers/UsersController');
const SessionController = require('./app/controllers/SessionController');
const FileController = require('./app/controllers/FileController');
const ProviderController = require('./app/controllers/ProviderController');
const AppointmentsController = require('./app/controllers/AppointmentController');
const ScheduleController = require('./app/controllers/ScheduleController');
const NotificationController = require('./app/controllers/NotificationController');
const AvailabletionController = require('./app/controllers/AvailableController');

routes.post('/sessions', SessionController.store);
routes.post('/users', UsersController.store);

routes.use(authMiddleware);

routes.put('/users', UsersController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailabletionController.index);

routes.get('/appointments', AppointmentsController.index);
routes.post('/appointments', AppointmentsController.store);
routes.delete('/appointments/:id', AppointmentsController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

module.exports = routes;
