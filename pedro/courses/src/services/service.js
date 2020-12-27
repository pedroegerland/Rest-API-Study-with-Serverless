/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
const format = require('date-format');
const { v4: uuid } = require('uuid');
const {
  create,
  get,
  getDeleted,
  list,
  listDeleted,
  overwrite,
} = require('../repository/courses');

const timestamp = format.asString('yyyy-MM-ddThh:mm:ss.SSSZ', new Date());

const post = async (course) => {
  course.id = uuid();
  course.activated = true,
  course.createdAt = timestamp,
  course.updatedAt = timestamp,
  console.log('post', course);
  await create(course);
};

const retrieve = async (id) => {
  const course = await get(id);
  return course;
};

const update = async (course) => {
  course.updatedAt = timestamp;
  overwrite(course);
};

const getAll = async () => {
  const courses = await list();
  return courses;
};

const getAllDeleted = async () => {
  const courses = await listDeleted();
  return courses;
};

const retrieveDeactivated = async (id) => {
  const course = await getDeleted(id);
  return course;
};

module.exports = {
  post, retrieve, retrieveDeactivated, getAll, getAllDeleted, update,
};
