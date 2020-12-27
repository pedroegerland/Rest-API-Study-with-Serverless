const { v4: uuidv4 } = require('uuid');
const format = require('date-format');

const timestamp = format.asString('yyyy-MM-ddThh:mm:ss.SSSZ', new Date());

const courses = [
  {
    id: uuidv4(),
    name: 'python for web scraping',
    quantity: 450,
    teacher: 'Marcos Serrano',
    activated: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: uuidv4(),
    name: 'Unreal Engine with C++',
    quantity: 1250,
    teacher: 'Carlos Macedo',
    activated: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: uuidv4(),
    name: 'Unreal Engine with Blueprint',
    quantity: 35,
    teacher: 'Thiago Sena',
    activated: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: uuidv4(),
    name: 'JS and Jquery for beginners',
    quantity: 22,
    teacher: 'Pedro Egerland',
    activated: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: uuidv4(),
    name: 'React.Js',
    quantity: 15,
    teacher: 'Gabriel Peixoto',
    activated: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: uuidv4(),
    name: 'AWS Cloud',
    quantity: 48,
    teacher: 'Fábio Nascimento',
    activated: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: uuidv4(),
    name: 'Angular 11',
    quantity: 888,
    teacher: 'Ricardo Leite',
    activated: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: uuidv4(),
    name: 'PHP for web',
    quantity: 76,
    teacher: 'Leandro Santos',
    activated: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: uuidv4(),
    name: 'C# for games',
    quantity: 5,
    teacher: 'Jesus Rubi',
    activated: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
  {
    id: uuidv4(),
    name: 'DevOps for beginners',
    quantity: 2,
    teacher: 'João Paulo',
    activated: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
];

module.exports = courses;
