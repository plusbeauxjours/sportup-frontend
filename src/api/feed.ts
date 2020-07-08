import { initialFeed, morePosts } from '../temp/feed';

const error =
    'Error loading feed. Please check your internet connection and try again.';

let refreshCount = 0;
let shouldLoadMore = true;

export const getMainFeed = user =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (refreshCount < 3) {
                refreshCount += 1;
                shouldLoadMore = true;
                resolve(initialFeed);
            } else {
                reject(error);
            }
        }, 1000);
    });

export const loadMore = user =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldLoadMore) {
                shouldLoadMore = false;
                resolve(morePosts);
            } else {
                reject(error);
            }
        }, 1000);
    });
