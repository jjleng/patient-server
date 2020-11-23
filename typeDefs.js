const { gql } = require("apollo-server");

const Appointment = `
    name: String!
    dateOfBirth: Date!
    phoneNumber: String!
    email: String!
    address: String!
    time: Date!
    driverLicense: String!
`;

module.exports = gql`
  scalar Date

  type Appointment {
    id: ID
    ${Appointment}
  }

  input AppointmentInput {
    ${Appointment}
  }

  type Query {
    fetchAppointments: [Appointment!]
  }

  type Mutation {
    createAppointment(appointment: AppointmentInput!): Appointment!
  }
`;
