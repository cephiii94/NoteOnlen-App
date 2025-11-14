// Nama file: screens/HomeScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig'; // Impor auth lagi
import { signOut } from 'firebase/auth'; // Impor 'alat' untuk logout

const HomeScreen = () => {

  // Fungsi untuk logout
  const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selamat Datang!</Text>
      <Text style={styles.subtitle}>Ini adalah Halaman Catatan Tuan Cecep</Text>
      
      {/* Kita akan tambahkan daftar catatan di sini nanti */}

      <Button title="Logout" onPress={handleLogout} color="red" />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: 'gray',
  }
});