"use client";

import React, { useEffect, useState } from "react";
import { Bell, BellRing, CheckCircle2, AlertTriangle, Clock, X, Volume2 } from "lucide-react";

interface AttendanceNotif {
  id: string;
  status: "PRESENT" | "EXCUSED" | "ABSENT";
  statusLabel: string;
  studentName: string;
  className: string;
  date: string;
  time: string;
  notes?: string;
}

export default function ParentNotificationListener({ studentId }: { studentId?: string }) {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [activeToast, setActiveToast] = useState<AttendanceNotif | null>(null);
  const [tested, setTested] = useState(false);

  // Play subtle web audio notification chime
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5

      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch {
      // AudioContext not allowed or unsupported
    }
  };

  // Register Service Worker
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("Service Worker registered:", reg.scope);
        })
        .catch((err) => {
          console.warn("Service Worker registration failed:", err);
        });

      if ("Notification" in window) {
        setPermission(Notification.permission);
      }
    }
  }, []);

  const requestNotificationPermission = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      try {
        const res = await Notification.requestPermission();
        setPermission(res);
        if (res === "granted") {
          triggerSystemNotification({
            id: "test",
            status: "PRESENT",
            statusLabel: "Hadir di Sekolah",
            studentName: "Ahmad Fauzi",
            className: "X IPA 1",
            date: "Hari Ini",
            time: "Baru saja",
          });
        }
      } catch (e) {
        console.error("Failed requesting notification permission", e);
      }
    }
  };

  const triggerSystemNotification = (att: AttendanceNotif) => {
    playChime();
    setActiveToast(att);

    // Auto dismiss in-app toast after 8 seconds
    setTimeout(() => {
      setActiveToast((prev) => (prev?.id === att.id ? null : prev));
    }, 8000);

    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      try {
        const title =
          att.status === "PRESENT"
            ? `✅ Presensi: ${att.studentName} Hadir`
            : att.status === "EXCUSED"
            ? `ℹ️ Presensi: ${att.studentName} Izin/Sakit`
            : `⚠️ PERHATIAN: ${att.studentName} Tercatat Alpa`;

        const body = `Status: ${att.statusLabel} di kelas ${att.className} pada ${att.time}.`;

        if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
          navigator.serviceWorker.ready.then((reg) => {
            reg.showNotification(title, {
              body,
              icon: "/icon-192.png",
              badge: "/icon-192.png",
              data: { url: "/orangtua" },
            });
          });
        } else {
          new Notification(title, {
            body,
            icon: "/icon-192.png",
          });
        }
      } catch (err) {
        console.warn("Native notification display failed:", err);
      }
    }
  };

  // Poll for attendance updates
  useEffect(() => {
    let interval: any = null;

    const checkAttendance = async () => {
      try {
        const url = studentId
          ? `/api/notifications/attendance?studentId=${studentId}`
          : `/api/notifications/attendance`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.success && data.hasAttendance && data.attendance) {
          const currentId = data.attendance.id;
          const lastAlertedId = localStorage.getItem("cendekia_last_attendance_alert_id");

          // Only trigger if this is a newly recorded attendance that wasn't alerted yet
          if (lastAlertedId !== currentId) {
            localStorage.setItem("cendekia_last_attendance_alert_id", currentId);
            triggerSystemNotification(data.attendance);
          }
        }
      } catch (err) {
        // Network or fetch error
      }
    };

    // Check immediately on load
    checkAttendance();

    // Check every 8 seconds for new attendance
    interval = setInterval(checkAttendance, 8000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [studentId]);

  return (
    <>
      {/* Floating Permission Bar if not granted */}
      {permission !== "granted" && (
        <div className="bg-slate-900 border border-slate-700 text-white rounded-lg p-3 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <BellRing className="w-4 h-4 text-amber-400 shrink-0" />
            <p className="text-[12px] text-slate-200">
              <strong>Aktifkan Notifikasi Presensi:</strong> Dapatkan pemberitahuan pop-up instan di layar HP saat anak Anda diabsen oleh guru di kelas.
            </p>
          </div>
          <button
            onClick={requestNotificationPermission}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold rounded-md shadow-sm shrink-0 transition-colors"
          >
            Izinkan Notifikasi Pop-up
          </button>
        </div>
      )}

      {/* Interactive Toast Notification (In-App) */}
      {activeToast && (
        <div
          className={`fixed bottom-5 right-5 z-50 max-w-sm w-full p-4 rounded-xl shadow-2xl border transition-all transform animate-in slide-in-from-bottom-5 duration-300 ${
            activeToast.status === "PRESENT"
              ? "bg-white border-emerald-300 text-slate-900"
              : activeToast.status === "EXCUSED"
              ? "bg-white border-blue-300 text-slate-900"
              : "bg-white border-rose-300 text-slate-900"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-lg shrink-0 ${
                activeToast.status === "PRESENT"
                  ? "bg-emerald-100 text-emerald-700"
                  : activeToast.status === "EXCUSED"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              {activeToast.status === "PRESENT" ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : activeToast.status === "EXCUSED" ? (
                <Clock className="w-5 h-5" />
              ) : (
                <AlertTriangle className="w-5 h-5" />
              )}
            </div>

            <div className="flex-1 pr-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Notifikasi Presensi Baru
                </span>
                <span className="text-[10px] text-slate-400">&bull; {activeToast.time}</span>
              </div>
              <h4 className="text-[13px] font-bold text-slate-900 mt-0.5">
                {activeToast.studentName} ({activeToast.className})
              </h4>
              <p
                className={`text-[12px] font-semibold mt-0.5 ${
                  activeToast.status === "PRESENT"
                    ? "text-emerald-700"
                    : activeToast.status === "EXCUSED"
                    ? "text-blue-700"
                    : "text-rose-700"
                }`}
              >
                Status: {activeToast.statusLabel}
              </p>
              {activeToast.notes ? (
                <p className="text-[11px] text-slate-500 mt-1 italic">
                  Catatan: {activeToast.notes}
                </p>
              ) : null}
            </div>

            <button
              onClick={() => setActiveToast(null)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
