const { retrieve, update } = require('../services/service');
const { bodyValidator } = require('../helpers/bodyValidator');

module.exports.handler = async (event, context, callback) => {
  const body = JSON.parse(event.body);
  const { id } = event.pathParameters;
  let response;
  const course = await retrieve(id);

  try {
    if (body) {
      const { errors } = bodyValidator(body);
      console.log('---> POST [errors]', errors);

      if (errors.length > 0) {
        return { body: JSON.stringify({ errors }) };
      }
    }
    if (!course) {
      callback(null, {
        statusCode: 404,
        body: JSON.stringify({
          message: `Couldn't fetch this id '${id}' from course`,
          reason: 'Course not found or is disabled',
        }),
      });
    } else {
      body.name ? course.name = body.name : null;
      body.quantity ? course.quantity = body.quantity : null;
      body.teacher ? course.teacher = body.teacher : null;

      console.log('---> newCourse: ', course);

      update(course);
      response = {
        statusCode: 200,
        body: JSON.stringify({ ...course }),
      };
      callback(null, response);
    }
  } catch (err) {
    console.log('-----> update Course ERROR', err);
    response = {
      statusCode: 503,
      body: err,
    };
    callback(null, response);
  }
};
