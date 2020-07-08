import { observable, action, runInAction } from 'mobx';
import {
  getUserInfo,
  getUserPosts,
  getFollowers,
  getFollowing,
  getTeams,
} from '../api/profile';

export default class UserProfileStore {
  avatar = null;
  name = null;
  handle = null;
  bio = null;
  connections = null;
  sports = [];
  @observable dialogVisible = false;
  @observable following = null;
  @observable feed = [];
  @observable connectionArray = [];
  @observable loadingUserInfo = false;
  @observable loadingFeed = false;
  @observable loadingConnection = false;
  @observable loaded = false;

  constructor(userId) {
    this.userId = userId;
  }

  @action
  resetConnection = () => {
    this.connectionArray = [];
    this.loadingConnection = false;
  };

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
        this.following = userInfo.following;
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

  @action
  onFollowPress = () => {
    if (this.following) {
      this.connections = {
        ...this.connections,
        followers: this.connections.followers - 1,
      };
      this.following = false;
    } else {
      this.connections = {
        ...this.connections,
        followers: this.connections.followers + 1,
      };
      this.following = true;
    }
  };

  @action
  showDialog = () => {
    this.dialogVisible = true;
  };

  @action
  closeDialog = () => {
    this.dialogVisible = false;
  };

  onSubmitRating = (sportId, rating) => {
    const idx = this.sports.findIndex(sport => sport.sportId === sportId);
    this.sports[idx].rated = rating;
    this.closeDialog();
  };
}
