const FIREBASE_CONFIG = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};

let MONGO_URL = undefined;

if (process.env.NODE_ENV === 'prod') {
    MONGO_URL = process.env.MONGODB_URL;
} else if (process.env.NODE_ENV === 'test') {
    MONGO_URL = process.env.TEST_MONGODB_URL;
} else {
    MONGO_URL = process.env.DEV_MONGODB_URL;
}

const PORT = process.env.PORT;

export default { PORT, FIREBASE_CONFIG, MONGO_URL };
