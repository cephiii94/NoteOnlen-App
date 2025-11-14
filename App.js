// Nama file: App.js

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Impor 'auth' dari Firebase
import { auth } from './firebaseConfig';
// Impor 'alat' untuk mengecek status login
import { onAuthStateChanged } from 'firebase/auth';

// Impor dua halaman yang tadi kita buat
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

// 'Stack' itu ibarat tumpukan kartu. Kita bisa pindah dari satu 'kartu' (halaman) ke 'kartu' lain.
const Stack = createNativeStackNavigator();

export default function App() {
  // Kita siapkan 'papan tulis' untuk mencatat siapa user yang sedang login
  // Awalnya 'null' (kosong), karena kita belum tahu
  const [user, setUser] = useState(null);

  // 'useEffect' itu seperti instruksi: "Lakukan ini satu kali saat aplikasi pertama kali dibuka"
  useEffect(() => {
    // Kita bilang ke Firebase: "Hei, tolong awasi status login."
    // 'onAuthStateChanged' akan jalan setiap kali ada yang login atau logout
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // 'currentUser' adalah data user yang login, atau 'null' jika sudah logout
      setUser(currentUser); // Kita update 'papan tulis' kita
    });

    // 'unsubscribe' adalah fungsi untuk 'berhenti mengawasi' saat komponen ditutup
    return unsubscribe; 
  }, []); // Tanda [] artinya "lakukan sekali saja"

  return (
    // 'NavigationContainer' adalah pembungkus utama untuk semua navigasi
    <NavigationContainer>
      <Stack.Navigator>
        {/* Ini adalah logika "Satpam" kita */}
        {user ? (
          // JIKA 'user' ADA (sudah login):
          // Tampilkan 'HomeScreen'
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Catatan Saya' }} // Judul di atas
          />
        ) : (
          // JIKA 'user' TIDAK ADA (null / belum login):
          // Tampilkan 'LoginScreen'
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }} // Sembunyikan judul di halaman login
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}