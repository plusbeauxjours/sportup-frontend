import {
  Ronaldo,
  Fahad,
  Messi,
  Ibrahimovic,
  Iniesta
} from './users';

const connections = {
  teams: 1,
  followers: 526,
  following: 123,
  rating: 4.6,
};

const rest = {
  bio: 'This is a test profile.',
  rated: 4,
  connections,
  sports: [{
    sportId: 0,
    rating: 4.5
  }, {
    sportId: 1,
    rating: 4.8
  }],
};

const RonaldoProfile = {
  ...Ronaldo,
  ...rest
};
const MessiProfile = {
  ...Messi,
  ...rest
};
const FahadProfile = {
  ...Fahad,
  ...rest
};
const IbraProfile = {
  ...Ibrahimovic,
  ...rest
};
const IniestaProfile = {
  ...Iniesta,
  ...rest
};

export default [
  MessiProfile,
  RonaldoProfile,
  FahadProfile,
  IniestaProfile,
  IbraProfile,
];