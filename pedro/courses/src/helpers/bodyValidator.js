const fields = ['name', 'teacher'];
const quantityFields = ['quantity'];
const updateFields = ['createdAt', 'id', 'updatedAt', 'activated'];

function isDefined(variable) {
  const kind = typeof variable;

  if (kind === 'undefined') return false;

  if (kind === 'string') return !/^\s*$/.test(variable);

  if (kind === 'number') return !/^\d*$/.test(variable);

  if (kind === 'object') {
    if (variable === null) return false;

    if (Object.keys(variable).length === 0) return false;
  }
  return true;
}

function bodyValidator(body) {
  const errors = [];
  console.log('---> bodyValdiator [body]', body);

  fields.forEach((field) => {
    if (!isDefined(body[field])) {
      errors.push({
        statusCode: 422,
        identifier: field,
        message: `The field ${field} cannot be empty or null`,
      });
    }
  });

  updateFields.forEach((field) => {
    if (isDefined(body[field])) {
      errors.push({
        statusCode: 422,
        identifier: field,
        message: `The field ${field} cannot be used`,
      });
    }
  });

  quantityFields.forEach((field) => {
    if (isDefined(body[field])) {
      errors.push({
        statusCode: 422,
        identifier: field,
        message: `The field ${field} is a number`,
      });
    }
  });
  return { errors };
}

module.exports = { bodyValidator };
