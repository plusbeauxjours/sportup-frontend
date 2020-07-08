import { observable, action, runInAction } from 'mobx';
import { getMainFeed, loadMore } from '../api/feed';

export default class MainFeedStore {
  @observable isRefreshing = false;
  @observable loadingMore = false;
  @observable feedArray = [];

  @action
  getMainFeed = async () => {
    this.isRefreshing = true;
    try {
      const feed = await getMainFeed(global.userId);
      runInAction(() => {
        this.feedArray = feed;
        this.isRefreshing = false;
      });
      return null;
    } catch (error) {
      runInAction(() => {
        this.isRefreshing = false;
      });
      return Promise.reject(error);
    }
  };

  @action
  loadMore = async () => {
    this.loadingMore = true;
    try {
      const newPosts = await loadMore(global.userId);
      runInAction(() => {
        this.feedArray = this.feedArray.concat(newPosts);
        this.loadingMore = false;
      });
      return null;
    } catch (error) {
      runInAction(() => {
        this.loadingMore = false;
      });
      return Promise.reject(error);
    }
  };
}
