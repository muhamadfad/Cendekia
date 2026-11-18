import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import StudentHomeScreen from "./src/screens/StudentHomeScreen";
import ParentHomeScreen from "./src/screens/ParentHomeScreen";

export default function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleLoginSuccess = (user: any) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {!currentUser ? (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      ) : currentUser.role === "STUDENT" ? (
        <StudentHomeScreen user={currentUser} onLogout={handleLogout} />
      ) : (
        <ParentHomeScreen user={currentUser} onLogout={handleLogout} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
});
