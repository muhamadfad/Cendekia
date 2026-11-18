# Cendekia Mobile App (Android & iOS)

Aplikasi mobile resmi **Cendekia** untuk **Siswa** dan **Wali Murid (Orang Tua)**. Dibangun menggunakan teknologi **React Native & Expo**, mendukung build instan untuk Android (`.apk` / Google Play Store) dan iOS (`.ipa` / Apple App Store).

---

## 📱 Fitur Utama Aplikasi Mobile

### 1. Untuk Siswa (Student Portal)
* **Jadwal Pelajaran Harian**: Jadwal kelas, jam mulai-selesai, mata pelajaran, dan guru pengampu.
* **Ruang E-Learning & Tugas**: Daftar tugas aktif, batas waktu (deadline), dan status pengumpulan.
* **Ujian Online CBT**: Akses ujian pilihan ganda langsung dari smartphone.
* **Keuangan & SPP**: Cek status pelunasan SPP dan nomor Virtual Account Bank Mandiri.

### 2. Untuk Wali Murid (Parent Portal)
* **Presensi Real-time**: Mengetahui detik ini apakah anak sudah hadir di kelas atau izin/sakit/alpa.
* **Smart Rapat Online (Zoom / Meet)**: Tombol sekali klik untuk langsung membuka ruang rapat konsultasi rapor atau pertemuan komite sekolah tanpa perlu cari link di grup WA.
* **Poin Kedisiplinan (BK)**: Notifikasi jika anak mendapatkan poin pelanggaran tata tertib sekolah.
* **Tagihan SPP Transparan**: Rincian tagihan bulanan dan instruksi pembayaran.
* **Hubungi Wali Kelas**: Tombol panggil langsung ke nomor telepon/WhatsApp wali kelas.

---

## 🚀 Cara Menjalankan Aplikasi di HP / Emulator

### Prasyarat:
Pastikan Anda berada di direktori `mobile`:
```bash
cd d:\project\school\mobile
npm install
```

### Opsi 1: Buka di HP Fisik (Android / iPhone) - Paling Mudah!
1. Download aplikasi **Expo Go** secara gratis di:
   - **Android**: Google Play Store (cari: `Expo Go`)
   - **iPhone (iOS)**: Apple App Store (cari: `Expo Go`)
2. Di laptop Anda, jalankan:
   ```bash
   npx expo start
   ```
3. Scan QR Code yang muncul di terminal menggunakan kamera iPhone atau aplikasi Expo Go di Android. Aplikasi akan langsung berjalan di HP Anda secara live!

---

### Opsi 2: Jalankan di Android Emulator
```bash
npx expo run:android
```

---

### Opsi 3: Build Menjadi File APK Siap Install di Android (.apk)
Untuk membuat file installer `.apk` yang bisa dibagikan langsung ke murid dan orang tua via WhatsApp:
```bash
npx eas-cli build -p android --profile preview
```
File APK akan otomatis di-generate dan siap di-download untuk di-install di smartphone Android manapun!

---

## 🔐 Akun Login Bawaan (Default):
* **Siswa**:
  - Email: `siswa@cendekia.sch.id`
  - Password: `password123`
* **Wali Murid (Orang Tua)**:
  - Email: `orangtua@cendekia.sch.id`
  - Password: `password123`
