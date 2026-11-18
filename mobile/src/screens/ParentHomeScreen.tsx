import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  Linking,
} from "react-native";
import { getParentDashboard } from "../services/api";

export default function ParentHomeScreen({ user, onLogout }: { user: any; onLogout: () => void }) {
  const [data, setData] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    setRefreshing(true);
    const res = await getParentDashboard(user.parent?.id);
    if (res.success) {
      setData(res.data);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openZoomMeeting = () => {
    const url = data?.upcomingMeeting?.zoomUrl || "https://zoom.us/join";
    Linking.openURL(url).catch((err) => console.error("Could not open Zoom URL", err));
  };

  const callHomeroomTeacher = () => {
    const phone = data?.student?.homeroomPhone || "081298765432";
    Linking.openURL(`tel:${phone}`).catch((err) => console.error("Could not open dialer", err));
  };

  const isPresent = data?.todayAttendance?.status === "PRESENT";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData} />}
      >
        {/* Header Profile */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Portal Wali Murid</Text>
            <Text style={styles.userName}>{data?.parentName || user.name}</Text>
            <Text style={styles.userMeta}>
              Memantau Siswa: {data?.student?.name} ({data?.student?.class})
            </Text>
          </View>
          <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Keluar</Text>
          </TouchableOpacity>
        </View>

        {/* Real-time Today Attendance Status */}
        <View style={[styles.card, styles.attendanceCard]}>
          <View>
            <Text style={styles.cardLabel}>Presensi Siswa Hari Ini</Text>
            <Text style={styles.attendanceStatusText}>
              {isPresent ? "Hadir di Sekolah" : "Belum Masuk Kelas"}
            </Text>
            <Text style={styles.attendanceSub}>
              {data?.todayAttendance?.date || "Rabu, 18 November 2026"}
            </Text>
          </View>
          <View style={[styles.badge, isPresent ? styles.badgeSuccess : styles.badgeDanger]}>
            <Text style={[styles.badgeText, isPresent ? styles.badgeSuccessText : styles.badgeDangerText]}>
              {isPresent ? "Terverifikasi" : "Perhatian"}
            </Text>
          </View>
        </View>

        {/* Smart Meeting Banner (Zoom / G-Meet) */}
        {data?.upcomingMeeting ? (
          <View style={[styles.card, styles.meetingCard]}>
            <View style={styles.meetingTag}>
              <Text style={styles.meetingTagText}>Agenda Rapat Online</Text>
            </View>
            <Text style={styles.meetingTitle}>{data.upcomingMeeting.title}</Text>
            <Text style={styles.meetingTime}>
              {data.upcomingMeeting.date} &bull; {data.upcomingMeeting.time}
            </Text>
            <Text style={styles.meetingIdText}>
              Meeting ID: {data.upcomingMeeting.meetingId} &bull; Passcode: {data.upcomingMeeting.passcode}
            </Text>

            <TouchableOpacity style={styles.zoomBtn} onPress={openZoomMeeting}>
              <Text style={styles.zoomBtnText}>Masuk Zoom Meeting</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* SPP Tunggakan & VA */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Kewajiban Biaya Pendidikan (SPP)</Text>
          <Text style={styles.financeAmount}>
            {data?.finance?.totalPending === 0
              ? "Semua Tagihan Lunas"
              : `Rp ${data?.finance?.totalPending?.toLocaleString("id-ID")}`}
          </Text>
          <Text style={styles.financeSub}>
            Virtual Account Bank Mandiri: {data?.finance?.virtualAccount || "8872-0081-2345"}
          </Text>
        </View>

        {/* Kedisiplinan & Poin BK */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Catatan Kedisiplinan & Poin BK</Text>
          <View style={styles.violationRow}>
            <Text style={styles.violationPoints}>
              {data?.violations?.totalPoints || 0} Poin Pelanggaran
            </Text>
            <Text style={styles.violationStatus}>
              {data?.violations?.totalPoints === 0 ? "Tertib" : "Ada Catatan"}
            </Text>
          </View>
          <Text style={styles.violationSub}>
            Akumulasi 50 poin memicu pemanggilan wali murid ke sekolah.
          </Text>
        </View>

        {/* Kontak Wali Kelas */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Wali Kelas Binaan</Text>
          <Text style={styles.teacherName}>{data?.student?.homeroomTeacher || "Drs. Budi Santoso"}</Text>
          <TouchableOpacity style={styles.contactBtn} onPress={callHomeroomTeacher}>
            <Text style={styles.contactBtnText}>Hubungi Wali Kelas ({data?.student?.homeroomPhone || "0812-9876-5432"})</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0F172A",
    padding: 20,
    borderRadius: 14,
    marginBottom: 16,
  },
  greeting: {
    color: "#38BDF8",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  userName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 2,
  },
  userMeta: {
    color: "#94A3B8",
    fontSize: 11,
    marginTop: 2,
  },
  logoutBtn: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  logoutText: {
    color: "#F87171",
    fontSize: 12,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
    textTransform: "uppercase",
  },
  attendanceCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#059669",
  },
  attendanceStatusText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#059669",
    marginTop: 2,
  },
  attendanceSub: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeSuccess: {
    backgroundColor: "#ECFDF5",
  },
  badgeSuccessText: {
    color: "#059669",
    fontSize: 11,
    fontWeight: "bold",
  },
  badgeDanger: {
    backgroundColor: "#FEE2E2",
  },
  badgeDangerText: {
    color: "#DC2626",
    fontSize: 11,
    fontWeight: "bold",
  },
  meetingCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#2563EB",
    backgroundColor: "#FFFFFF",
  },
  meetingTag: {
    backgroundColor: "#EFF6FF",
    borderColor: "#BFDBFE",
    borderWidth: 1,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 6,
  },
  meetingTagText: {
    color: "#2563EB",
    fontSize: 10,
    fontWeight: "bold",
  },
  meetingTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0F172A",
  },
  meetingTime: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },
  meetingIdText: {
    fontSize: 10,
    color: "#94A3B8",
    fontFamily: "monospace",
    marginTop: 2,
  },
  zoomBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  zoomBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  financeAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    marginTop: 4,
  },
  financeSub: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },
  violationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  violationPoints: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F172A",
  },
  violationStatus: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#059669",
  },
  violationSub: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 4,
  },
  teacherName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0F172A",
    marginTop: 4,
  },
  contactBtn: {
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  contactBtnText: {
    color: "#0F172A",
    fontSize: 12,
    fontWeight: "600",
  },
});
