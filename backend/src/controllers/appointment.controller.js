const appointmentService = require("../services/appointment.service");
const CreateAppointmentDTO = require("../dto/request/createAppointment.dto");
const AppointmentResponseDTO = require("../dto/response/appointment.response.dto");
const RescheduleDTO = require("../dto/request/reschedule.dto");
const { success } = require("zod");

class AppointmentController {
  async createAppointment(req, res, next) {
    try {
      const dto = new CreateAppointmentDTO(req.body);

      const appointment = await appointmentService.createAppointment(
        req.user.id,
        dto,
      );

      return res.status(201).json({
        success: true,
        message: "Appointment Created Successfully",
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
        await appointmentService.rescheduleAppointment(req.user, dto);

      res.status(201).json({
        success: true,
        message: "Appointment Rescheduled",
        data: rescheduledAppointment,
      });
    } catch (err) {
      next(err);
    }
  }

  async getMyAppointments(req, res, next) {
    try {
      const data = await appointmentService.getUserAppointments(req.user.id);

      res.status(200).json({
        success: true,
        message: "Appointment fethced successfully",
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
        success: true,
        message: "Appointments fetched successfully",
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
        success: true,
        message: "Appointments fetched successfully",
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async cancelAppointment(req, res, next) {
    try {
      const { appointmentId } = req.params;

      const result = await appointmentService.cancelAppointment(
        req.user,
        appointmentId,
      );

      res.status(200).json({
        success: true,
        message: "Appointments Cancelled",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AppointmentController();
