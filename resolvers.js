const { AuthenticationError } = require("apollo-server");
const { GraphQLScalarType } = require("graphql");
const { kind } = require("./typeDefs");
const AppointmentController = require("./controllers/appointmentController");

const authenticated = (next) => (root, args, ctx, info) => {
  if (!ctx.authenticated) {
    throw new AuthenticationError("You must be logged in.");
  }

  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    fetchAppointments: authenticated(async (root, args, ctx, info) => {
      const appointments = await AppointmentController.fetchAppointments();
      return appointments;
    }),
  },
  Mutation: {
    createAppointment: authenticated(async (_, { appointment }) => {
      const savedAppointment = await AppointmentController.createAppointment(
        appointment
      );
      return savedAppointment;
    }),
  },
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      if (value.kind === kind.STRING) {
        return value;
      }
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
};
