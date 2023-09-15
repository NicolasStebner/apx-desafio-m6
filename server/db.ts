import * as admin from "firebase-admin";
var serviceAccount = require("./key.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as any),
	databaseURL: "https://apx-desafio-m6-9550f-default-rtdb.firebaseio.com/",
});

const firestore = admin.firestore(); //ingreso al firestore
const rtdb = admin.database(); //ingreso al backend REALTIME

export { firestore, rtdb };
