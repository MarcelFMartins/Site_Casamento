// Mural de Recados (Firebase / Firestore)
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import {
    getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDS1Mj6-7XW585mvhE7Q60ct8zgd7nsskc",
    authDomain: "marlonecatia-241c8.firebaseapp.com",
    projectId: "marlonecatia-241c8",
    storageBucket: "marlonecatia-241c8.firebasestorage.app",
    messagingSenderId: "221775993706",
    appId: "1:221775993706:web:676db5dbd76cb26ddb6313"
};

const db = getFirestore(initializeApp(firebaseConfig));
const recados = collection(db, 'recados');

window.recadosDB = {
    async listar() {
        const snap = await getDocs(query(recados, orderBy('created_at', 'desc')));
        return snap.docs.map(d => {
            const r = d.data();
            return { nome: r.nome, mensagem: r.mensagem, created_at: r.created_at.toDate().toISOString() };
        });
    },
    async criar(nome, mensagem) {
        await addDoc(recados, { nome, mensagem, created_at: serverTimestamp() });
    }
};
