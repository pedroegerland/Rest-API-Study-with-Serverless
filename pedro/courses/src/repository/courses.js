const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.COURSES_TABLE;

const create = async (course) => {
  const params = {
    TableName,
    Item: {
      id: course.id,
      name: course.name,
      teacher: course.teacher,
      quantity: course.quantity,
      activated: course.activated,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    },
  };

  return dynamoDb.put(params).promise();
};

const get = async (id) => {
  const params = {
    TableName,
    Key: { id },
  };
  console.log('----> get params', params);
  const item = await dynamoDb.get(params).promise();
  const course = item.Item ? item.Item : undefined;
  console.log('----> get [course]', course);
  return course && course.activated ? course : undefined;
};

const overwrite = async (course) => {
  const params = {
    TableName,
    Item: {
      id: course.id,
      name: course.name,
      teacher: course.teacher,
      quantity: course.quantity,
      activated: course.activated,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    },
  };
  return dynamoDb.put(params).promise();
};

const getDeleted = async (id) => {
  const params = {
    TableName,
    Key: { id },
  };
  console.log('----> get params', params);
  const item = await dynamoDb.get(params).promise();
  const course = item.Item ? item.Item : undefined;
  console.log('----> get [course]', course);
  return course && !course.activated ? course : undefined;
};

const list = async () => {
  const params = {
    TableName,
    FilterExpression: '#act = :activated',
    ExpressionAttributeNames: {
      '#act': 'activated',
    },
    ExpressionAttributeValues: {
      ':activated': true,
    },
  };
  const items = await dynamoDb.scan(params).promise();
  console.log(items.Items);
  return items.Items ? items.Items : undefined;
};

const listDeleted = async () => {
  const params = {
    TableName,
    FilterExpression: '#act = :activated',
    ExpressionAttributeNames: {
      '#act': 'activated',
    },
    ExpressionAttributeValues: {
      ':activated': false,
    },
  };
  const items = await dynamoDb.scan(params).promise();
  console.log(items.Items);
  return items.Items ? items.Items : undefined;
};

module.exports = {
  create, get, overwrite, getDeleted, list, listDeleted,
};
