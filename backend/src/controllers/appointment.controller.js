const appointmentService = require("../services/appointment.service");
const CreateAppointmentDTO = require("../dto/request/createAppointment.dto");
const AppointmentResponseDTO = require("../dto/response/appointment.response.dto");
const RescheduleDTO = require("../dto/request/reschedule.dto");

class AppointmentController {
  async createAppointment(req, res, next) {
    try {
      const dto = new CreateAppointmentDTO(req.body);

      const appointment = await appointmentService.createAppointment(
        req.user.id,
        dto,
      );

      return res.status(201).json({
        success: "true",
        data: new AppointmentResponseDTO(appointment),
      });
    } catch (err) {
      next(err);
    }
  }

  async rescheduleAppointment(req, res, next) {
    try {
      const dto = new RescheduleDTO(req.body);

      const rescheduledAppointment =
        await appointmentService.rescheduleAppointment(req.user,dto);

      res.status(201).json({
        rescheduledAppointment,
      });
    } catch (err) {
      next(err);
    }
  }
  

  async getMyAppointments(req, res, next) {
    try {
      const data = await appointmentService.getUserAppointments(req.user.id);

      res.status(200).json({
        success: "true",
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async getProviderAppointments(req, res, next) {
    try {
      const data = await appointmentService.getProviderAppointments(
        req.user.id,
      );

      res.status(200).json({
        success: "true",
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllAppointments(req, res, next) {
    try {
      const data = await appointmentService.getAllAppointments();
      res.status(200).json({
        success: "true",
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async getAvailableSlots( req, res, next){
    try {
        const { providerId } = req.params;

        

        const slots = await appointmentService.getAvailableSlots(providerId);

        res.status(200).json({
            success: true,
            data: slots
        })
        
    } catch (err) {
        next(err);
        
    }
  }

  async cancelAppointment(req, res, next) {
  try {
    const { appointmentId } = req.params;

    const result =
      await appointmentService.cancelAppointment(req.user, appointmentId);

    res.status(200).json({
      success: true,
      message: result.message
    });

  } catch (err) {
    next(err);
  }
}
}

module.exports = new AppointmentController();
