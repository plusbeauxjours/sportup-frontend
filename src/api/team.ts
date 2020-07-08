import users from '../temp/users';

export const getMembers = teamId => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(users.map(user => ({ ...user, bio: 'This is a test profile.' })));
    }, 1000);
  });
};

export const getInfo = teamId => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        cover:
          'https://media-public.fcbarcelona.com/20157/0/document_thumbnail/20197/220/138/127/58690268/1.0-11/58690268.jpg?t=1509365853000',
        name: 'FC Barcelona',
        sports: [
          { sportId: 0, rating: 3.5, rated: 3 },
          { sportId: 1, rating: 4 },
        ],
      });
    }, 1000);
  });
};
