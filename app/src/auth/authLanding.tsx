import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AuthLanding() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to AgriSmart</Text>
      <Text style={styles.subtitle}>
        Empowering Farmers & Youth through Smart Agriculture
      </Text>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => router.push("/src/auth/login")}
      >
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerBtn}
        onPress={() => router.push("/src/auth/register")}
      >
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fff7",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2e7d32",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 40,
  },
  loginBtn: {
    backgroundColor: "#2e7d32",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 15,
  },
  registerBtn: {
    backgroundColor: "#66bb6a",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});