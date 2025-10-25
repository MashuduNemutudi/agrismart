import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Register() {
  const router = useRouter();

  const [userType, setUserType] = useState<"Farmer" | "Youth">("Youth"); // added user type
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = () => {
    if (!username || !password || !confirmPassword || !email) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    // Mock registration success
    Alert.alert(
      "Success",
      `Account created successfully!\nUser Type: ${userType}`,
      [
        {
          text: "OK",
          onPress: () => router.push("/src/auth/login"),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join AgriSmart today!</Text>

        <View style={styles.inputContainer}>
          {/* User Type Selection */}
          <Text style={styles.label}>User Type</Text>
          <View style={styles.userTypeContainer}>
            <TouchableOpacity
              style={[
                styles.userTypeBtn,
                userType === "Youth" && styles.userTypeSelected,
              ]}
              onPress={() => setUserType("Youth")}
            >
              <Text
                style={[
                  styles.userTypeText,
                  userType === "Youth" && styles.userTypeSelectedText,
                ]}
              >
                Youth
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.userTypeBtn,
                userType === "Farmer" && styles.userTypeSelected,
              ]}
              onPress={() => setUserType("Farmer")}
            >
              <Text
                style={[
                  styles.userTypeText,
                  userType === "Farmer" && styles.userTypeSelectedText,
                ]}
              >
                Farmer
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Choose a username"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Create a password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Re-enter your password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/src/auth/login")}>
          <Text style={styles.linkText}>
            Already have an account? Login here
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5fff7",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2e7d32",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginBottom: 35,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2e7d32",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#66bb6a",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  registerBtn: {
    backgroundColor: "#2e7d32",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  linkText: {
    color: "#388e3c",
    fontSize: 15,
    textAlign: "center",
    marginTop: 15,
  },

  // New User Type Styles
  userTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  userTypeBtn: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#66bb6a",
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  userTypeSelected: {
    backgroundColor: "#2e7d32",
  },
  userTypeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2e7d32",
  },
  userTypeSelectedText: {
    color: "#fff",
  },
});