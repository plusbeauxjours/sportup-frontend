import AuthStore from './AuthStore';
import MainFeedStore from './MainFeedStore';

const authStore = new AuthStore();
const mainFeedStore = new MainFeedStore();

export default { authStore, mainFeedStore };
