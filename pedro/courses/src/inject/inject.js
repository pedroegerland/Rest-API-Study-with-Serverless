const AWS = require('aws-sdk');
const courses = require('./coursesList');

AWS.config.update({
  region: 'us-east-1',
});

const credentials = new AWS.SharedIniFileCredentials({ profile: 'test' });
AWS.config.credentials = credentials;

const table = ['courses-dev', 'courses-staging', 'courses-prod'];

const dynamodb = new AWS.DynamoDB();

const docClient = new AWS.DynamoDB.DocumentClient();

async function createTable() {
  for (let i = 0; i < table.length; i++) {
    const params = {
      TableName: table[i],
      KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' }, // Partition key
      ],
      AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10,
      },
    };

    dynamodb.createTable(params, (err, data) => {
      if (err) {
        if (err.message === `Table already exists: ${table[i]}`) {
          console.log(`\ntable ${table[i]} already exists!!\n`);
        } else {
          console.error(
            'Unable to create table. Error JSON:',
            JSON.stringify(err, null, 2),
          );
        }
      } else {
        console.log(
          'Created table. Table description JSON:',
          JSON.stringify(data, null, 2),
        );
      }
    });
  }
}

async function ListofItens() {
  for (let i = 0; i < table.length; i++) {
    const allCourses = courses;
    allCourses.forEach((course) => {
      const params = {
        TableName: table[i],
        Item: {
          id: course.id,
          name: course.name,
          quantity: course.quantity,
          teacher: course.teacher,
          activated: course.activated,
          createdAt: course.createdAt,
          updatedAt: course.updatedAt,
        },
      };

      docClient.put(params, (err, data) => {
        if (err) {
          console.error(
            'Unable to add course',
            course.course,
            '. Error JSON:',
            JSON.stringify(err, null, 2),
          );
        } else {
          console.log('PutItem succeeded:', course.name);
        }
      });
    });
  }
}

async function init() {
  createTable();
  ListofItens();
}

init();
