import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

let API_BASE_URL: string;

// @ts-ignore
if (process.env.NODE_ENV == "production") {
	API_BASE_URL = "";
} else {
	API_BASE_URL = "http://localhost:3005";
}

const firebaseConfig = {
	apiKey: process.env.CONFIG_FIREBASE_API_KEY,
	databaseURL: process.env.DB_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	authDomain: process.env.CONFIG_FIREBASE_AUTH_DOMAIN,
};

const app = initializeApp(firebaseConfig);

export { API_BASE_URL, getDatabase, ref, onValue, app };
