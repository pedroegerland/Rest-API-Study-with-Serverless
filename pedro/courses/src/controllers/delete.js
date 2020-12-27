const { retrieve, update } = require('../services/service');

module.exports.handler = async (event, context, callback) => {
  const { id } = event.pathParameters;
  const course = await retrieve(id);
  let response;

  if (course) {
    course.activated = false;
    update(course);
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'The course has been successfully deactivated!!',
        data: { ...course },
      }),
    };
  } else {
    response = {
      statusCode: 404,
      body: JSON.stringify({
        message: `Couldn't delete this id '${id}' course`,
        reason: 'Course not found or is disabled',
      }),
    };
  }

  callback(null, response);
};
