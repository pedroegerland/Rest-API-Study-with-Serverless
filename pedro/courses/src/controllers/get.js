const { retrieve } = require('../services/service');

module.exports.handler = async (event, context, callback) => {
  const { id } = event.pathParameters;
  const course = await retrieve(id);
  let response;

  if (course) {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        ...course,
      }),
    };
  } else {
    response = {
      statusCode: 404,
      body: JSON.stringify({
        message: `Couldn't retrieve this id '${id}' course`,
        reason: 'Course not found or is disabled',
      }),
    };
  }

  callback(null, response);
};
