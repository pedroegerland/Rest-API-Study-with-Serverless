const { retrieveDeactivated, update } = require('../services/service');

module.exports.handler = async (event, context, callback) => {
  const { id } = event.pathParameters;
  const course = await retrieveDeactivated(id);
  let response;

  if (course) {
    course.activated = true;
    update(course);
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'The course has been successfully reactivated!!',
        data: { ...course },
      }),
    };
  } else {
    response = {
      statusCode: 404,
      body: JSON.stringify({
        message: `Couldn't delete this id '${id}' course`,
        reason: 'Course not found or is enabled',
      }),
    };
  }

  callback(null, response);
};
