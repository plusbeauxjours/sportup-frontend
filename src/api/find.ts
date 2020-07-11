import users from '../temp/users';
import { teamShort } from '../temp/team';

export const getPlayers = (userId, sports) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        users.map(user => ({
          ...user,
          bio: 'This is a test profile',
          sports: [
            { id: 0, rating: 4.5 },
            { id: 1, rating: 4.8 },
            { id: 2, rating: 3.5 },
            { id: 3, rating: 3.0 },
          ],
          team: {
            id: 0,
            name: 'FC Barcelona',
          },
        })),
      );
    }, 1000);
  });
};

export const getTeams = (userId, sports) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(teamShort);
    }, 1000);
  });
};
