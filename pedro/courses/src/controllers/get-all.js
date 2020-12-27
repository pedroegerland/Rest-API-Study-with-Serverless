const { getAll } = require('../services/service');

module.exports.handler = async (event, context, callback) => {
  let response;

  try {
    const returnedList = await getAll();
    console.log('Processing Completed');
    response = {
      statusCode: 200,
      body: JSON.stringify({
        ...returnedList,
      }),
    };
    console.log('-----> returnedList', returnedList);
    console.log('-----> response', response);
    // console.log(allData);
  } catch (error) {
    response = {
      statusCode: 404,
      body: JSON.stringify({
        message: 'Couldnt retrieve this list',
        reason: 'Course not found',
      }),
    };
    console.log('-----> response', response);
  }
  callback(null, response);
};
