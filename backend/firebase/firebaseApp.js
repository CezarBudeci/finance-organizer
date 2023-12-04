import { initializeApp } from 'firebase/app';
import Config from '../util/config.js';

Object.keys(Config.FIREBASE_CONFIG).forEach(key => {
    if (!Config.FIREBASE_CONFIG[key]) {
        throw new Error(`Incomplete firebase config, missing ${key}`);
    }
});

const app = initializeApp(Config.FIREBASE_CONFIG);

export default app;
