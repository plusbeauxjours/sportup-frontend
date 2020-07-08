import { AsyncStorage } from 'react-native';
import { login, signup } from '../api/auth';

export default class AuthStore {
    handleLogin = async (email, password) => {
        try {
            const userId = await login(email, password);
            await AsyncStorage.setItem('BAEPLAY', userId.toString());
            // get small picture for server to use in drawer
            global.userId = userId;
            global.avatar =
                'https://scontent.fkhi6-1.fna.fbcdn.net/v/t1.0-1/c0.177.783.783/s40x40/21231949_1613499365350616_5879380150072247868_n.jpg?_nc_cat=0&oh=047fed68cf89ef82d1296c7ed951ee60&oe=5BD446A9';
            return null;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    handleSignup = async (name, email, handle, password) => {
        try {
            const userId = await signup(name, email, handle, password);
            await AsyncStorage.setItem('BAEPLAY', userId.toString());
            global.userId = userId;
            global.avatar =
                'https://scontent.fkhi6-1.fna.fbcdn.net/v/t1.0-1/c0.177.783.783/s40x40/21231949_1613499365350616_5879380150072247868_n.jpg?_nc_cat=0&oh=047fed68cf89ef82d1296c7ed951ee60&oe=5BD446A9';
            return null;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    handleLogout = async () => {
        global.userId = null;
        global.avatar = null;
        await AsyncStorage.clear();
    };
}
