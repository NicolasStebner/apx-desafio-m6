import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

let API_BASE_URL: string;

// @ts-ignore
/* if (process.env.NODE_ENV == "production") {
	API_BASE_URL = "";
} else { }*/
API_BASE_URL = "http://localhost:3005";

const firebaseConfig = {
	apiKey: "603dde33f096e2b02b1b29076795ce1d8f611eec",
	databaseURL: "https://apx-desafio-m6-9550f-default-rtdb.firebaseio.com/",
	projectId: "apx-desafio-m6-9550f",
	authDomain: "apx-desafio-m6.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);

export { API_BASE_URL, getDatabase, ref, onValue, app };
