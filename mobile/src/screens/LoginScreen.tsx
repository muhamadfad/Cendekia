import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { loginApi } from "../services/api";

export default function LoginScreen({ onLoginSuccess }: { onLoginSuccess: (user: any) => void }) {
  const [email, setEmail] = useState("siswa@cendekia.sch.id");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await loginApi(email, password);
      if (res.success && res.data) {
        onLoginSuccess(res.data);
      } else {
        setError(res.message || "Email atau password salah.");
      }
    } catch (e: any) {
      setError("Gagal terhubung ke server sekolah.");
    } finally {
      setLoading(false);
    }
  };

  const setRoleQuickLogin = (role: "STUDENT" | "PARENT") => {
    if (role === "STUDENT") {
      setEmail("siswa@cendekia.sch.id");
      setPassword("password123");
    } else {
      setEmail("orangtua@cendekia.sch.id");
      setPassword("password123");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo / Header */}
        <View style={styles.header}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>C</Text>
          </View>
          <Text style={styles.appTitle}>Cendekia Mobile</Text>
          <Text style={styles.appSub}>Sistem Sekolah Terpadu (Siswa & Wali Murid)</Text>
        </View>

        {/* Quick Role Selector for testing */}
        <View style={styles.roleTabs}>
          <TouchableOpacity
            style={[styles.roleTab, email.includes("siswa") && styles.roleTabActive]}
            onPress={() => setRoleQuickLogin("STUDENT")}
          >
            <Text style={[styles.roleTabText, email.includes("siswa") && styles.roleTabTextActive]}>
              Portal Siswa
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleTab, email.includes("orangtua") && styles.roleTabActive]}
            onPress={() => setRoleQuickLogin("PARENT")}
          >
            <Text style={[styles.roleTabText, email.includes("orangtua") && styles.roleTabTextActive]}>
              Portal Wali Murid
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Masuk ke Akun Anda</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email / NISN</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Masukkan email atau NISN..."
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Masukkan password..."
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.loginBtnText}>Masuk ke Sistem</Text>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.footerNote}>
          SMA Swasta Cendekia Nusantara &bull; Versi 1.0.0
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  scrollContent: {
    padding: 24,
    justifyContent: "center",
    flexGrow: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  logoBadge: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },
  appTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: -0.5,
  },
  appSub: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 4,
  },
  roleTabs: {
    flexDirection: "row",
    backgroundColor: "#1E293B",
    borderRadius: 10,
    padding: 4,
    marginBottom: 16,
  },
  roleTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  roleTabActive: {
    backgroundColor: "#2563EB",
  },
  roleTabText: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "600",
  },
  roleTabTextActive: {
    color: "#FFFFFF",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 16,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 12,
    marginBottom: 12,
    backgroundColor: "#FEE2E2",
    padding: 8,
    borderRadius: 6,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#0F172A",
    backgroundColor: "#F8FAFC",
  },
  loginBtn: {
    backgroundColor: "#0F172A",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  loginBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  footerNote: {
    textAlign: "center",
    color: "#64748B",
    fontSize: 11,
    marginTop: 24,
  },
});
