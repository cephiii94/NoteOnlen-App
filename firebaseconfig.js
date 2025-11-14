// Nama file: firebaseConfig.js

// Import alat-alat yang kita butuhkan dari Firebase
import { initializeApp } from "firebase/app"; 
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Ganti konfigurasi di bawah ini dengan milik Tuan Cecep
// Ini adalah "kunci" untuk menghubungkan aplikasi kita ke Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDlOea99ikDbHSEQ8XswmjyXMCk0P8lFtY",
  authDomain: "project-notonlen.firebaseapp.com",
  projectId: "project-notonlen",
  storageBucket: "project-notonlen.firebasestorage.app",
  messagingSenderId: "592072676592",
  appId: "1:592072676592:web:e544183f12c61a9d261e35",
};


// Inisialisasi (menyalakan) Firebase
const app = initializeApp(firebaseConfig);

// Menyiapkan layanan yang akan kita pakai
// 'auth' untuk login/register
const auth = getAuth(app); 
// 'db' (Firestore) untuk menyimpan data catatan
const db = getFirestore(app); 

// Kita 'export' (kirim keluar) auth dan db agar file lain bisa menggunakannya
export { auth, db };