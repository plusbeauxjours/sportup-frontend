import {
  Messi,
  Ronaldo,
  Fahad,
  Iniesta,
  Ibrahimovic
} from './users';
import {
  UPVOTED,
  DOWNVOTED
} from '../constants/strings';

const MessiPost = {
  id: 1,
  user: Messi,
  text: `
  I thank all the people who are here, for all their sacrifice, and all those who are in Argentina who were always with us. The shirt of the National Team is above all.

  I thank everyone who is out here for all of the sacrifices they've made, and also those back in Argentina who have always supported us. This shirt comes before everything else.

  - IOL`,
  media: 'https://scontent.fkhi6-1.fna.fbcdn.net/v/t1.0-9/36350010_2298438716842376_8012764482897969152_n.jpg?_nc_cat=0&oh=15e976c71e5a9929784f550406996be3&oe=5BE1F0ED',
  time: '2017-03-25T03:24:00',
  score: 532,
  interaction: UPVOTED,
};

const RonaldoPost = {
  id: 2,
  user: Ronaldo,
  text: 'O vosso apoio foi e sempre será fundamental para nós.',
  time: '2018-07-07T02:36:00',
  score: 489,
};

const FahadPost = {
  id: 3,
  user: Fahad,
  text: 'Is this the real life? Is this just fantasy?',
  media: 'https://ae01.alicdn.com/kf/HTB1Ny7bPVXXXXbfaFXXq6xXFXXXx/Custom-Canvas-Wall-Decor-Rock-Music-Queen-Band-Bohemian-Rhapsody-Poster-Freddie-Mercury-Wall-Stickers-Brian.jpg_640x640.jpg',
  time: '2018-04-07T12:26:00',
  score: -6,
  interaction: DOWNVOTED,
};

const IniestaPost = {
  id: 4,
  user: Iniesta,
  text: 'Un orgullo recibir este reconocimiento. Muchas gracias a todos.',
  time: '2016-09-21T22:13:00',
  score: 512,
};

const IbraPost = {
  id: 5,
  user: Ibrahimovic,
  text: 'Finally I have an enhancer that keeps my tattoos shine. Make sure you do the same!',
  media: 'https://pbs.twimg.com/media/DhWxaa9UEAE3G4Q.jpg',
  time: '2018-07-07T22:35:00',
  score: 666,
  interaction: UPVOTED,
};

export const initialFeed = [RonaldoPost, FahadPost, MessiPost];

export const morePosts = [IniestaPost, IbraPost];

export default [RonaldoPost, FahadPost, MessiPost, IniestaPost, IbraPost];