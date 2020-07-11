import users from '../temp/users';
import posts from '../temp/feed';
import { teamShort } from '../temp/team';

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
  sports: [
    { id: 1, rating: 4.8, rated: 5 },
    { id: 2, rating: 3.5 },
    { id: 3, rating: 3.0 },
  ],
};

export const getUserInfo = userId =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({ ...users[userId], ...rest });
    }, 1000);
  });

export const getUserPosts = userId =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(posts.map(post => ({ ...post, user: users[userId] })));
    }, 1500);
  });

export const getFollowers = userId =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(users.map(user => ({ ...user, bio: 'This is a test profile.' })));
    }, 1000);
  });

export const getFollowing = userId => getFollowers(userId);

export const getTeams = userId =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(teamShort);
    }, 1000);
  });
