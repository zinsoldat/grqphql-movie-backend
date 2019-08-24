const { SchemaDirectiveVisitor } = require("graphql-tools");

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve } = field;
    field.resolve = async function (...args) {
      const result = await resolve.apply(this, args);
      const context = args[2];
      if(isAuthenticated(context)) {
        return result;
      }
      throw new Error("not authorized");
    };
  }
}

function isAuthenticated(context) {
  return context.auth && context.auth.user &&  context.auth.user.username;
}

module.exports = {
  AuthDirective,
};