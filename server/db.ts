import * as admin from "firebase-admin";
import * as dotenv from "dotenv";
dotenv.config();

const serviceAccount = {
	type: "service_account",
	project_id: process.env.FIREBASE_PROJECT_ID,
	private_key_id: process.env.FIREBASE_KEY_ID,
	private_key:
		process.env.NODE_ENV === "production"
			? process.env.FIREBASE_PRIVATE_KEY
			: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
	client_email: process.env.FIREBASE_CLIENT_MAIL,
	client_id: process.env.FIREBASE_CLIENT_ID,
	auth_uri: process.env.FIREBASE_AUTH_URI,
	token_uri: process.env.FIREBASE_TOKEN_URI,
	auth_provider_x509_cert_url: process.env.FIREBASE_CERT,
	client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT,
};

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as any),
	databaseURL: "https://apx-desafio-m6-9550f-default-rtdb.firebaseio.com/",
});

const firestore = admin.firestore(); //ingreso al firestore
const rtdb = admin.database(); //ingreso al backend REALTIME

export { firestore, rtdb };
