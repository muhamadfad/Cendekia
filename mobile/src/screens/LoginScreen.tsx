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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Silakan masukkan email/NISN dan password.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await loginApi(email.trim(), password);
      if (res.success && res.data) {
        onLoginSuccess(res.data);
      } else {
        setError(res.message || "Email atau password salah.");
      }
    } catch (e: any) {
      setError("Gagal terhubung ke server sekolah. Pastikan koneksi internet aktif.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Logo / Header */}
        <View style={styles.header}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>C</Text>
          </View>
          <Text style={styles.appTitle}>Cendekia Mobile</Text>
          <Text style={styles.appSub}>Sistem Informasi Akademik & Portal Sekolah</Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Masuk ke Akun Anda</Text>
          <Text style={styles.cardSubtitle}>
            Gunakan email terdaftar atau nomor NISN siswa beserta kata sandi yang diberikan oleh pihak sekolah.
          </Text>

          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email / NISN</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="nama@cendekia.sch.id atau NISN..."
              placeholderTextColor="#64748B"
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Kata Sandi</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Masukkan kata sandi..."
              placeholderTextColor="#64748B"
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

        <View style={styles.helpBox}>
          <Text style={styles.helpText}>
            Lupa kata sandi atau belum memiliki akun? Hubungi staf Tata Usaha (TU) sekolah Anda.
          </Text>
        </View>

        <Text style={styles.footerNote}>
          Sistem Informasi Sekolah Cendekia &bull; Versi 1.0.0
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
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
  },
  appTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: -0.5,
  },
  appSub: {
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 6,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#334155",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  cardSubtitle: {
    color: "#94A3B8",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 16,
  },
  errorBox: {
    backgroundColor: "#451A1A",
    borderWidth: 1,
    borderColor: "#F43F5E",
    padding: 10,
    borderRadius: 8,
    marginBottom: 14,
  },
  errorText: {
    color: "#FDA4AF",
    fontSize: 12,
    lineHeight: 16,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    color: "#E2E8F0",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#0F172A",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#FFFFFF",
    fontSize: 14,
  },
  loginBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  loginBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  helpBox: {
    marginTop: 20,
    alignItems: "center",
  },
  helpText: {
    color: "#64748B",
    fontSize: 11,
    textAlign: "center",
    lineHeight: 16,
  },
  footerNote: {
    color: "#475569",
    fontSize: 11,
    textAlign: "center",
    marginTop: 28,
  },
});
