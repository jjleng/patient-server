const models = require("../models");

const fetchAppointments = async () => {
  return await models.Appointment.findAll();
};

const createAppointment = async (appointment) => {
  return await models.Appointment.create({
    ...appointment,
  });
};

module.exports = {
  fetchAppointments,
  createAppointment,
};
