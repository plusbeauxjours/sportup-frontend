import { observable, action, runInAction } from 'mobx';
import {
  getUserInfo,
  getUserPosts,
  getFollowers,
  getFollowing,
  getTeams,
} from '../api/profile';

export default class MyProfileStore {
  avatar = null;
  name = null;
  handle = null;
  bio = null;
  connections = null;
  sports = [];

  @observable
  feed = [];

  @observable
  connectionArray = [];

  @observable
  loadingUserInfo = false;

  @observable
  loadingFeed = false;

  @observable
  loadingConnection = false;

  @observable
  loaded = false;

  constructor(userId) {
    this.userId = userId;
  }

  @action
  resetConnection = () => {
    this.connectionArray = [];
    this.loadingConnection = false;
  };

  @action
  update = (name, handle, bio, password) =>
    new Promise(resolve => {
      setTimeout(() => {
        if (name !== this.name) {
          // async call to update name
          this.name = name;
        }

        if (handle !== this.handle) {
          // async call to update handle
          this.handle = handle;
        }

        if (bio !== this.bio) {
          // async call to update bio
          this.bio = bio;
        }

        if (password !== '') {
          // async call to update password
        }

        this.loaded = false;
        this.loaded = true;

        resolve();
      }, 1000);
    });

  @action
  getUserInfo = async () => {
    this.loadingUserInfo = true;
    try {
      const userInfo = await getUserInfo(this.userId);
      this.avatar = userInfo.avatar;
      this.name = userInfo.name;
      this.handle = userInfo.handle;
      this.bio = userInfo.bio;
      this.connections = userInfo.connections;
      this.sports = userInfo.sports;
      runInAction(() => {
        this.loadingUserInfo = false;
        this.loaded = true;
      });
      return null;
    } catch (error) {
      runInAction(() => {
        this.loadingUserInfo = false;
        this.loaded = false;
      });
      return Promise.reject(error);
    }
  };

  @action
  getUserPosts = async () => {
    this.loadingFeed = true;
    try {
      const newPosts = await getUserPosts(this.userId);
      runInAction(() => {
        this.feed = this.feed.concat(newPosts);
        this.loadingFeed = false;
      });
      return null;
    } catch (error) {
      runInAction(() => {
        this.loadingFeed = false;
      });
      return Promise.reject(error);
    }
  };

  @action
  getTeams = async () => { 
    this.loadingConnection = true;
    try {
      const newTeams = await getTeams(this.userId);
      runInAction(() => {
        this.connectionArray = this.connectionArray.concat(newTeams);
        this.loadingConnection = false;
      });
      return null;
    } catch (error) {
      runInAction(() => {
        this.loadingConnection = false;
      });
      return Promise.reject(error);
    }
  };

  @action
  getFollowers = async () => {
    this.loadingConnection = true;
    try {
      const newFollowers = await getFollowers(this.userId);
      runInAction(() => {
        this.connectionArray = this.connectionArray.concat(newFollowers);
        this.loadingConnection = false;
      });
      return null;
    } catch (error) {
      runInAction(() => {
        this.loadingConnection = false;
      });
      return Promise.reject(error);
    }
  };

  @action
  getFollowing = async () => {
    this.loadingConnection = true;
    try {
      const newFollowing = await getFollowing(this.userId);
      runInAction(() => {
        this.connectionArray = this.connectionArray.concat(newFollowing);
        this.loadingConnection = false;
      });
      return null;
    } catch (error) {
      runInAction(() => {
        this.loadingConnection = false;
      });
      return Promise.reject(error);
    }
  };
}
