import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { getStudentDashboard } from "../services/api";

export default function StudentHomeScreen({ user, onLogout }: { user: any; onLogout: () => void }) {
  const [data, setData] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    setRefreshing(true);
    const res = await getStudentDashboard(user.student?.id);
    if (res.success) {
      setData(res.data);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData} />}
      >
        {/* Header Profile */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Portal Siswa</Text>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userMeta}>
              NISN: {data?.student?.nisn || "-"} &bull; Rombel: {data?.student?.class || "X IPA 1"}
            </Text>
          </View>
          <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Keluar</Text>
          </TouchableOpacity>
        </View>

        {/* SPP Quick Card */}
        <View style={styles.financeCard}>
          <View>
            <Text style={styles.cardLabel}>Kewajiban SPP Bulanan</Text>
            <Text style={styles.financeAmount}>
              {data?.finance?.totalPending === 0
                ? "Semua Tagihan Lunas"
                : `Rp ${data?.finance?.totalPending?.toLocaleString("id-ID")}`}
            </Text>
            <Text style={styles.financeSub}>
              VA Bank Mandiri: {data?.finance?.virtualAccount || "8872-0081-2345"}
            </Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>
              {data?.finance?.totalPending === 0 ? "Tertib" : "Belum Bayar"}
            </Text>
          </View>
        </View>

        {/* Today's Schedule */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Jadwal Pelajaran Hari Ini</Text>
          {data?.todaySchedules && data.todaySchedules.length > 0 ? (
            data.todaySchedules.map((sch: any, idx: number) => (
              <View key={idx} style={styles.scheduleItem}>
                <View style={styles.timeBadge}>
                  <Text style={styles.timeText}>{sch.startTime}</Text>
                  <Text style={styles.timeTextSub}>{sch.endTime}</Text>
                </View>
                <View style={styles.scheduleDetails}>
                  <Text style={styles.subjectName}>{sch.subject?.name}</Text>
                  <Text style={styles.teacherName}>
                    Pengampu: {sch.teacher?.user?.name || "Guru Mapel"} &bull; Ruang Belajar
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>Tidak ada jadwal kelas untuk hari ini.</Text>
            </View>
          )}
        </View>

        {/* E-Learning & Tugas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Penugasan & Praktikum Terbuka</Text>
          {data?.assignments && data.assignments.length > 0 ? (
            data.assignments.map((a: any, idx: number) => (
              <View key={idx} style={styles.assignmentCard}>
                <View style={styles.assignmentHeader}>
                  <Text style={styles.assignmentSubject}>{a.subject}</Text>
                  {a.isSubmitted ? (
                    <Text style={styles.submittedBadge}>
                      Sudah Dikumpulkan {a.score ? `(Nilai: ${a.score})` : ""}
                    </Text>
                  ) : (
                    <Text style={styles.pendingBadge}>Menunggu Pengumpulan</Text>
                  )}
                </View>
                <Text style={styles.assignmentTitle}>{a.title}</Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>Belum ada penugasan baru.</Text>
            </View>
          )}
        </View>

        {/* CBT Online Exam */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ujian Berbasis Komputer (CBT)</Text>
          {data?.exams && data.exams.length > 0 ? (
            data.exams.map((e: any, idx: number) => (
              <View key={idx} style={styles.examCard}>
                <View style={styles.examHeader}>
                  <Text style={styles.examSubject}>{e.subject}</Text>
                  <Text style={styles.examDuration}>{e.duration} Menit</Text>
                </View>
                <Text style={styles.examTitle}>{e.title}</Text>
                {e.isCompleted ? (
                  <View style={styles.examScoreBadge}>
                    <Text style={styles.examScoreText}>Skor Anda: {e.score} / 100</Text>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.examActionBtn}>
                    <Text style={styles.examActionBtnText}>Mulai Ujian CBT</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))
          ) : (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>Tidak ada paket ujian CBT aktif.</Text>
            </View>
          )}
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
  financeCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
    textTransform: "uppercase",
  },
  financeAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    marginTop: 2,
  },
  financeSub: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: "#ECFDF5",
    borderColor: "#A7F3D0",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeText: {
    color: "#059669",
    fontSize: 11,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 10,
  },
  scheduleItem: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  timeBadge: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: "center",
    marginRight: 12,
    minWidth: 54,
  },
  timeText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#0F172A",
  },
  timeTextSub: {
    fontSize: 9,
    color: "#64748B",
  },
  scheduleDetails: {
    flex: 1,
  },
  subjectName: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#0F172A",
  },
  teacherName: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },
  assignmentCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  assignmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  assignmentSubject: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#2563EB",
    textTransform: "uppercase",
  },
  submittedBadge: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#059669",
  },
  pendingBadge: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#D97706",
  },
  assignmentTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0F172A",
  },
  examCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  examHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  examSubject: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#E11D48",
    textTransform: "uppercase",
  },
  examDuration: {
    fontSize: 10,
    color: "#64748B",
  },
  examTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 8,
  },
  examScoreBadge: {
    backgroundColor: "#ECFDF5",
    padding: 6,
    borderRadius: 6,
    alignItems: "center",
  },
  examScoreText: {
    color: "#059669",
    fontSize: 11,
    fontWeight: "bold",
  },
  examActionBtn: {
    backgroundColor: "#0F172A",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  examActionBtnText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  emptyBox: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#CBD5E1",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 12,
    color: "#94A3B8",
  },
});
