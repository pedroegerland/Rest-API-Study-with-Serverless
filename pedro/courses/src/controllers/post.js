const { post } = require('../services/service');
const { bodyValidator } = require('../helpers/bodyValidator');

module.exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  let response;
  console.log('---> POST[body]: ', body);

  try {
    if (body) {
      const { errors } = bodyValidator(body);
      console.log('---> POST [errors]', errors);

      if (errors.length > 0) {
        return { body: JSON.stringify({ errors }) };
      }

      await post(body);
      response = {
        statusCode: 201,
        body: JSON.stringify({ ...body }),
      };
    } else {
      response = {
        statusCode: 503,
        body: 'Something went wrong',
      };
    }
  } catch (err) {
    console.log(err);
    response = {
      statusCode: 503,
      body: err,
    };
  }
  console.log('------> post [Response]', response);
  return response;
};
