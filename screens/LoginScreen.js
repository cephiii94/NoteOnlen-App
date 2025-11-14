// Nama file: screens/LoginScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// Kita impor 'auth' yang sudah kita buat di file firebaseConfig.js
import { auth } from '../firebaseConfig'; 
// Ini adalah "alat" dari Firebase untuk mendaftar dan login
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';

// Ini adalah halaman kita
const LoginScreen = () => {
  // 'useState' itu seperti papan tulis kecil.
  // Kita siapkan 2 papan tulis: satu untuk 'email', satu untuk 'password'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fungsi ini akan dijalankan saat tombol "Register" ditekan
  const handleRegister = () => {
    // Jika email atau password kosong, kita kasih peringatan
    if (email === '' || password === '') {
      Alert.alert("Error", "Email dan Password tidak boleh kosong!");
      return; // Berhenti di sini
    }

    // Pergi ke Firebase untuk membuat user baru
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        // Kalau berhasil, userCredentials akan berisi data user
        const user = userCredentials.user;
        console.log('Berhasil mendaftar dengan:', user.email);
        // Kita tidak perlu pindah halaman, App.js akan mengaturnya
      })
      .catch((error) => {
        // Kalau gagal (misal: email sudah dipakai), tampilkan pesan error
        Alert.alert("Error Registrasi", error.message);
      });
  };

  // Fungsi ini akan dijalankan saat tombol "Login" ditekan
  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert("Error", "Email dan Password tidak boleh kosong!");
      return;
    }

    // Pergi ke Firebase untuk coba login
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        // Kalau berhasil
        const user = userCredentials.user;
        console.log('Berhasil login dengan:', user.email);
      })
      .catch((error) => {
        // Kalau gagal (misal: password salah), tampilkan pesan error
        Alert.alert("Error Login", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aplikasi Catatanku</Text>
      
      {/* Kotak untuk mengetik email */}
      <TextInput
        placeholder="Email"
        value={email} // Nilainya diambil dari 'papan tulis' email
        onChangeText={text => setEmail(text)} // Setiap ketikan, update 'papan tulis'
        style={styles.input}
        keyboardType="email-address" // Keyboard khusus email
        autoCapitalize="none" // Jangan otomatis huruf besar
      />
      
      {/* Kotak untuk mengetik password */}
      <TextInput
        placeholder="Password"
        value={password} // Nilainya diambil dari 'papan tulis' password
        onChangeText={text => setPassword(text)} // Update 'papan tulis'
        style={styles.input}
        secureTextEntry // Bikin jadi '****' (sensor password)
      />

      {/* Tombol-tombol */}
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
        <Button title="Register" onPress={handleRegister} color="#841584" />
      </View>
    </View>
  );
};

export default LoginScreen;

// Ini adalah 'CSS' untuk React Native, mengatur tampilan
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row', // Bikin tombolnya sebelahan
    justifyContent: 'space-around', // Kasih jarak antar tombol
    width: '100%',
  },
});