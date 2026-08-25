const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, serverTimestamp } = require("firebase/firestore");

// Tomamos las claves de las variables de entorno de Netlify
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

exports.handler = async function(event, context) {
    // Solo permitimos peticiones POST
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        // Recibimos los datos que mandó el HTML
        const data = JSON.parse(event.body);

        // Guardamos en Firebase desde el servidor seguro
        await addDoc(collection(db, "resultados"), {
            nombre: data.nombre,
            puntaje: data.puntaje,
            fecha: serverTimestamp()
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Guardado exitosamente" })
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Ocurrió un error en el servidor" })
        };
    }
};