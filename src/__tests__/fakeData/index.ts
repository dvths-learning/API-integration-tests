import { IUser } from '../../interfaces';

// GET
const homer: IUser = {
  id: 1,
  firstName: 'Homer',
  lastName: 'Simpson',
  email: 'homer@gmail.com',
  occupation: 'nuclear safety inspector',
};

const ragnar: IUser = {
  id: 2,
  firstName: 'Ragnar',
  lastName: 'Lodbrok',
  email: 'ragnar@gmail.com',
  occupation: 'king',
};

const eren: IUser = {
  id: 3,
  firstName: 'Eren',
  lastName: 'Yeager',
  email: 'eren.yeager@gmail.com',
  occupation: 'soldier',
};

const morty: IUser = {
  id: 4,
  firstName: 'Morty',
  lastName: 'Smith',
  email: 'msmith.125@gmail.com',
  occupation: 'student',
};

export const get = {
  mock: [homer, ragnar, eren, morty],
  response: [homer, ragnar, eren, morty],
};

// PUT
const updatedRagnar: IUser = {
  id: 2,
  firstName: 'Bjorn',
  lastName: 'Ironside',
  email: 'ragnar@gmail.com',
  occupation: 'king',
};

export const put = {
  getByIdMock: ragnar, // mock do UserRepository.getById()
  mock: updatedRagnar, // mock do UserRepository.update()
  request: {   // body da requisição
    firstName: updatedRagnar.firstName,
    lastName: updatedRagnar.lastName,
  },
  response: updatedRagnar, // body da resposta
};

