const express  = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointment.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const  authorizeRoles = require('../middlewares/role.middleware');

router.post("/", authMiddleware, (req, res, next) => appointmentController.createAppointment(req, res, next),);

router.post("/reschedule", authMiddleware, (req, res, next) => appointmentController.rescheduleAppointment(req, res, next),);


router.get('/my', authMiddleware, appointmentController.getMyAppointments);

router.get('/provider',
  authMiddleware,
  authorizeRoles("PROVIDER"),
  appointmentController.getProviderAppointments
);

router.get('/',
  authMiddleware,
  authorizeRoles("ADMIN"),
  appointmentController.getAllAppointments
);



router.patch(
  '/:appointmentId/cancel',
  authMiddleware,
  appointmentController.cancelAppointment
);

module.exports = router;