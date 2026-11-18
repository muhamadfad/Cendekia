import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    tcPr.append(parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>'))

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
    tcPr.append(tcMar)

def create_proposal():
    doc = docx.Document()

    # Set Margins
    for section in doc.sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)

    # Styles
    COLOR_PRIMARY = RGBColor(15, 23, 42)     # Slate 900
    COLOR_SECONDARY = RGBColor(30, 41, 59)   # Slate 800
    COLOR_ACCENT = RGBColor(37, 99, 235)     # Blue 600
    COLOR_MUTED = RGBColor(100, 116, 139)    # Slate 500

    # ==========================================
    # HALAMAN JUDUL / COVER
    # ==========================================
    p_pre = doc.add_paragraph()
    p_pre.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run_pre = p_pre.add_run("PROPOSAL PENAWARAN & KERJA SAMA SISTEM INFORMASI SEKOLAH")
    run_pre.font.size = Pt(11)
    run_pre.font.bold = True
    run_pre.font.color.rgb = COLOR_ACCENT

    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(20)
    p_title.paragraph_format.space_after = Pt(10)
    run_title = p_title.add_run("CENDEKIA")
    run_title.font.size = Pt(36)
    run_title.font.bold = True
    run_title.font.color.rgb = COLOR_PRIMARY

    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub.paragraph_format.space_after = Pt(40)
    run_sub = p_sub.add_run("Platform Manajemen Sekolah Terpadu, E-Learning (LMS), E-Rapor Digital & Portal Wali Murid Terintegrasi")
    run_sub.font.size = Pt(13)
    run_sub.font.color.rgb = COLOR_MUTED

    p_target = doc.add_paragraph()
    p_target.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_target.paragraph_format.space_before = Pt(80)
    p_target.paragraph_format.space_after = Pt(5)
    r = p_target.add_run("Diajukan Kepada:")
    r.font.size = Pt(11)
    r.font.bold = True

    p_inst = doc.add_paragraph()
    p_inst.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_inst.paragraph_format.space_after = Pt(100)
    r_inst = p_inst.add_run("Yth. Bapak / Ibu Pimpinan Yayasan & Kepala Sekolah\nDi Tempat")
    r_inst.font.size = Pt(12)
    r_inst.font.color.rgb = COLOR_PRIMARY

    p_meta = doc.add_paragraph()
    p_meta.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_meta = p_meta.add_run("Disusun Oleh:\nTim Pengembang Sistem Cendekia (EduTech Solutions)\nTahun 2026/2027")
    r_meta.font.size = Pt(10)
    r_meta.font.color.rgb = COLOR_MUTED

    doc.add_page_break()

    # ==========================================
    # 1. LATAR BELAKANG & EXECUTIVE SUMMARY
    # ==========================================
    h1 = doc.add_heading("1. RINGKASAN EKSEKUTIF & LATAR BELAKANG", level=1)
    h1.style.font.color.rgb = COLOR_PRIMARY

    doc.add_paragraph(
        "Di era modernisasi pendidikan dan implementasi Kurikulum Merdeka saat ini, kecepatan, akurasi, dan transparansi tata kelola sekolah menjadi faktor penentu utama akreditasi dan reputasi sebuah institusi pendidikan. Banyak sekolah masih menghadapi kendala operasional yang berulang setiap tahunnya, di antaranya:"
    )

    bullet_points = [
        ("Administrasi Terfragmentasi: ", "Pencatatan data siswa, absensi harian, nilai akademik, dan keuangan SPP masih tersebar di lembaran kertas atau file Excel terpisah yang rentan hilang atau keliru."),
        ("Beban Berat Akhir Semester bagi Guru: ", "Wali kelas dan guru mata pelajaran menghabiskan waktu berhari-hari hanya untuk merekap nilai dan mencetak lembar rapor secara manual."),
        ("Tingkat Piutang & Tunggakan SPP Tinggi: ", "Sekolah kesulitan melacak siapa saja siswa yang belum membayar SPP, ketiadaan tagihan otomatis, dan orang tua seringkali lupa batas waktu pembayaran."),
        ("Minimnya Keterlibatan Orang Tua: ", "Wali murid sering kali tidak mengetahui apakah anaknya hadir di sekolah hari ini, berapa nilai tugas harian mereka, hingga muncul masalah pelanggaran kedisiplinan yang terlambat ditangani.")
    ]

    for bold_txt, norm_txt in bullet_points:
        p = doc.add_paragraph(style='List Bullet')
        r1 = p.add_run(bold_txt)
        r1.font.bold = True
        r1.font.color.rgb = COLOR_PRIMARY
        r2 = p.add_run(norm_txt)

    doc.add_paragraph(
        "Sistem Informasi Sekolah CENDEKIA hadir sebagai platform digital terpadu (All-in-One Enterprise School Management & LMS) yang dirancang khusus untuk memecahkan seluruh persoalan di atas dalam satu ekosistem terintegrasi yang mudah digunakan oleh seluruh ornamen struktur sekolah."
    )

    # ==========================================
    # 2. NILAI JUAL UTAMA (KILLER FEATURES)
    # ==========================================
    h2 = doc.add_heading("2. NILAI JUAL UTAMA APLIKASI CENDEKIA", level=1)
    h2.style.font.color.rgb = COLOR_PRIMARY

    doc.add_paragraph(
        "Berbeda dengan aplikasi sekolah konvensional yang kaku dan rumit, CENDEKIA dikembangkan dengan filosofi modern, data-dense, dan user-friendly yang langsung memberikan nilai tambah nyata bagi sekolah:"
    )

    usp_list = [
        ("1. E-Rapor Otomatis Siap Cetak (Kurikulum Merdeka / K13)", "Perhitungan nilai akhir, konversi predikat (A/B/C/D), rekap absensi otomatis, catatan capaian sikap spiritual dan sosial dari wali kelas terkompilasi otomatis menjadi dokumen E-Rapor resmi siap cetak format PDF."),
        ("2. Smart Finance & Penerbitan SPP Massal Sekali Klik", "Tata Usaha dapat menerbitkan tagihan SPP ke seluruh 500+ siswa hanya dengan 1 tombol di awal bulan, lengkap dengan nomor Virtual Account, riwayat tunggakan, dan kwitansi resmi digital."),
        ("3. E-Learning & Ujian CBT Mandiri (Computer Based Test)", "Guru dapat mengunggah modul digital, memberikan tugas dengan deadline counter, serta membuat ujian pilihan ganda yang otomatis terkoreksi dan nilainya keluar instan."),
        ("4. Portal Khusus Wali Murid (Buku Penghubung Digital)", "Orang tua memiliki akses mandiri melalui smartphone/laptop untuk memantau presensi harian anak secara real-time, melihat nilai akademik, mengecek tunggakan SPP, dan memantau poin kedisiplinan (BK)."),
        ("5. Integrasi Rapat Virtual & Konsultasi Rapor Daring (Zoom / G-Meet)", "Fitur penjadwalan rapat sekolah, sosialisasi wali murid, dan konsultasi rapor online menggunakan integrasi tautan pintar (Zoom/Google Meet) yang hemat bandwidth dan TIDAK membebani server sekolah.")
    ]

    for title, desc in usp_list:
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(6)
        p.paragraph_format.space_after = Pt(4)
        rt = p.add_run(title)
        rt.font.bold = True
        rt.font.size = Pt(11)
        rt.font.color.rgb = COLOR_ACCENT
        p_desc = doc.add_paragraph()
        p_desc.paragraph_format.space_after = Pt(8)
        p_desc.add_run(desc)

    # ==========================================
    # 3. MATRIKS FITUR BERDASARKAN PENGGUNA
    # ==========================================
    h3 = doc.add_heading("3. MATRIKS FITUR LENGKAP PER STRUKTUR PENGGUNA", level=1)
    h3.style.font.color.rgb = COLOR_PRIMARY

    table = doc.add_table(rows=1, cols=3)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    hdr_cells = table.rows[0].cells
    hdr_cells[0].text = "Peran Pengguna"
    hdr_cells[1].text = "Modul Utama"
    hdr_cells[2].text = "Manfaat & Fungsionalitas Operasional"

    for cell in hdr_cells:
        set_cell_background(cell, "0F172A")
        set_cell_margins(cell, top=140, bottom=140, left=180, right=180)
        for p in cell.paragraphs:
            for run in p.runs:
                run.font.bold = True
                run.font.color.rgb = RGBColor(255, 255, 255)
                run.font.size = Pt(10)

    modules_data = [
        ("Kepala Sekolah & Yayasan", "Executive Command Center & Audit", "Statistik real-time pemasukan SPP, rasio kehadiran sekolah hari ini, grafik tren nilai akademik siswa, dan pemantauan kinerja dewan guru."),
        ("Tata Usaha & Keuangan", "Billing SPP & Master Data", "Penerbitan tagihan massal bulanan, pengelolaan data pokok siswa (NISN/Dapodik), data guru (NIP), inventaris rombel, mapel, dan cetak struk pembayaran."),
        ("Bimbingan Konseling (BK)", "Disiplin & Poin Pelanggaran", "Pencatatan pelanggaran tata tertib siswa, akumulasi poin sanksi, monitoring pembinaan karakter, dan pembuatan riwayat kesiswaan."),
        ("Guru Mata Pelajaran", "Presensi, Nilai & LMS", "Input kehadiran siswa per jam pelajaran dengan 1 klik, pengisian buku nilai akademik, publikasi materi belajar digital, tugas mandiri, dan paket soal CBT."),
        ("Wali Kelas", "Manajemen E-Rapor", "Evaluasi rekap nilai rombel, pengisian predikat sikap spiritual & sosial, perangkingan kelas, catatan evaluasi rapor, dan pencetakan rapor PDF resmi."),
        ("Siswa", "Ruang Belajar Digital", "Melihat jadwal pelajaran harian, mengunduh bahan ajar, mengumpulkan tugas secara online, mengerjakan ujian CBT berwaktu, dan melihat E-Rapor."),
        ("Wali Murid / Orang Tua", "Portal Pantau Anak", "Notifikasi presensi anak hari ini (Hadir/Sakit/Alpa), informasi tagihan dan riwayat pembayaran SPP, grafik nilai anak, dan link rapat komite/rapor online.")
    ]

    for role, mod, desc in modules_data:
        row = table.add_row()
        r_cells = row.cells
        r_cells[0].text = role
        r_cells[1].text = mod
        r_cells[2].text = desc

        for idx, cell in enumerate(r_cells):
            set_cell_margins(cell, top=100, bottom=100, left=140, right=140)
            if idx == 0:
                set_cell_background(cell, "F8FAFC")
            for p in cell.paragraphs:
                for run in p.runs:
                    run.font.size = Pt(9.5)
                    if idx == 0:
                        run.font.bold = True

    # ==========================================
    # 4. SOLUSI MEETING ONLINE & RAPAT SEKOLAH
    # ==========================================
    h4 = doc.add_heading("4. ARSITEKTUR SMART MEETING ONLINE (HEMAT BIAYA & BANDWIDTH)", level=1)
    h4.style.font.color.rgb = COLOR_PRIMARY

    doc.add_paragraph(
        "Banyak institusi sekolah khawatir bahwa menyelenggarakan rapat online (seperti Rapat Pembagian Rapor atau Pertemuan Komite Sekolah) di dalam aplikasi akan membutuhkan server berukuran raksasa dan bandwidth mahal. Kekhawatiran tersebut sangat beralasan apabila video streaming di-hosting secara mandiri (self-hosted video streaming membutuhkan bandwidth hingga puluhan Gbps dan biaya server belasan juta per bulan)."
    )

    doc.add_paragraph(
        "Oleh karena itu, CENDEKIA mengadopsi Arsitektur Hybrid Smart Meeting Link (Standar Internasional Google Classroom & Canvas LMS):"
    )

    hybrid_points = [
        ("Beban Server Sekolah 0% (Nol Beban Streaming): ", "Seluruh transmisi video dan audio dialihkan langsung ke infrastruktur global Zoom atau Google Meet yang memiliki server stabil dan kapasitas tak terbatas."),
        ("Satu Pintu Akses Terjadwal: ", "Wali kelas atau panitia sekolah cukup membuat agenda 'Konsultasi Rapor' atau 'Rapat Wali Murid' di Cendekia, lalu menempelkan link pertemuan Zoom/Meet. Tautan ini otomatis muncul di layar Dashboard Orang Tua & Siswa dengan tombol 'Masuk Rapat'."),
        ("Biaya Server Tetap Sangat Hemat: ", "Sekolah hanya memerlukan server standar berbasis Cloud VPS (biaya mulai dari Rp 100.000 - Rp 300.000/bulan) tanpa risiko server down saat rapat diikuti ratusan peserta sekaligus.")
    ]

    for bp_title, bp_desc in hybrid_points:
        p = doc.add_paragraph(style='List Bullet')
        r1 = p.add_run(bp_title)
        r1.font.bold = True
        r2 = p.add_run(bp_desc)

    # ==========================================
    # 5. ESTIMASI BIAYA & MODEL INVESTASI
    # ==========================================
    h5 = doc.add_heading("5. SKEMA PENAWARAN INVESTASI & BIAYA KERJA SAMA", level=1)
    h5.style.font.color.rgb = COLOR_PRIMARY

    doc.add_paragraph(
        "Kami menawarkan fleksibilitas skema pembiayaan yang dapat disesuaikan dengan anggaran dan kebijakan yayasan/sekolah:"
    )

    p_table = doc.add_table(rows=1, cols=4)
    p_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    p_hdr = p_table.rows[0].cells
    p_hdr[0].text = "Paket"
    p_hdr[1].text = "Skema Pembiayaan"
    p_hdr[2].text = "Fitur & Layanan"
    p_hdr[3].text = "Keterangan"

    for cell in p_hdr:
        set_cell_background(cell, "1E293B")
        set_cell_margins(cell, top=120, bottom=120, left=150, right=150)
        for p in cell.paragraphs:
            for run in p.runs:
                run.font.bold = True
                run.font.color.rgb = RGBColor(255, 255, 255)
                run.font.size = Pt(10)

    pricing_data = [
        ("Paket Starter (SaaS Bulanan)", "Rp 3.500 / siswa / bulan", "Semua Modul: Admin, Guru, Siswa, Rapor, SPP, LMS Tugas, dan Hosting Cloud terkelola.", "Sangat terjangkau, cocok untuk uji coba semester berjalan tanpa komitmen besar."),
        ("Paket Sekolah Mandiri (Tahunan)", "Rp 35.000 / siswa / tahun (Hemat 20%)", "Semua Modul Lengkap + Pelatihan Guru + Domain Sekolah (cendekia.sekolah.sch.id) + Backup Mingguan.", "Pilihan paling populer bagi sekolah swasta dan negeri berakreditasi A."),
        ("Paket Lisensi Penuh (Beli Putus / Enterprise)", "Hubungi Tim Pengembang (One-Time Fee)", "Instalasi di server lokal yayasan / VPS mandiri, hak akses penuh, modifikasi khusus sesuai kurikulum yayasan.", "Investasi jangka panjang tanpa biaya iuran bulanan per siswa.")
    ]

    for p_name, p_price, p_feats, p_note in pricing_data:
        row = p_table.add_row()
        cells = row.cells
        cells[0].text = p_name
        cells[1].text = p_price
        cells[2].text = p_feats
        cells[3].text = p_note

        for idx, cell in enumerate(cells):
            set_cell_margins(cell, top=100, bottom=100, left=140, right=140)
            if idx == 0:
                set_cell_background(cell, "F1F5F9")
            for p in cell.paragraphs:
                for run in p.runs:
                    run.font.size = Pt(9.5)
                    if idx in [0, 1]:
                        run.font.bold = True

    # ==========================================
    # 6. RENCANA IMPLEMENTASI & JADWAL KERJA
    # ==========================================
    h6 = doc.add_heading("6. TAHAPAN IMPLEMENTASI & PELATIHAN", level=1)
    h6.style.font.color.rgb = COLOR_PRIMARY

    timeline_points = [
        ("Minggu 1: Persiapan & Migrasi Data: ", "Setup server, import data induk siswa dan dewan guru dari database Dapodik / Excel lama sekolah."),
        ("Minggu 2: Konfigurasi Kurikulum & Jadwal: ", "Penyusunan rombel, plotting jadwal pelajaran guru, dan setting tarif tagihan SPP bulanan."),
        ("Minggu 3: Workshop & Pelatihan Guru/Staf: ", "Sesi pelatihan tatap muka atau daring untuk Administrator, Guru Mata Pelajaran, dan Wali Kelas."),
        ("Minggu 4: Sosialisasi Orang Tua & Go-Live: ", "Pembagian akun login kepada siswa dan orang tua, sistem resmi aktif digunakan 100%.")
    ]

    for t_step, t_desc in timeline_points:
        p = doc.add_paragraph(style='List Bullet')
        r1 = p.add_run(t_step)
        r1.font.bold = True
        r2 = p.add_run(t_desc)

    # ==========================================
    # 7. PENUTUP & LEMBAR PERSETUJUAN
    # ==========================================
    h7 = doc.add_heading("7. PENUTUP & LEMBAR KESEPAKATAN", level=1)
    h7.style.font.color.rgb = COLOR_PRIMARY

    doc.add_paragraph(
        "Demikian proposal penawaran Sistem Informasi Sekolah Cendekia ini kami ajukan. Kami berkomitmen penuh untuk menjadi mitra strategis sekolah dalam mewujudkan institusi pendidikan modern yang efisien, transparan, dan berdaya saing tinggi."
    )

    doc.add_paragraph(
        "Untuk demonstrasi sistem secara langsung (Live Demo) atau konsultasi penyesuaian fitur, kami siap hadir di sekolah Bapak/Ibu pada waktu yang disepakati."
    )

    # Signature Block
    sig_table = doc.add_table(rows=1, cols=2)
    sig_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    c1, c2 = sig_table.rows[0].cells
    c1.text = "Diajukan Oleh,\nTim Pengembang Cendekia\n\n\n\n_______________________\nKonsultan EduTech"
    c2.text = "Disetujui Oleh,\nPihak Sekolah / Yayasan\n\n\n\n_______________________\nKepala Sekolah / Ketua Yayasan"

    for cell in [c1, c2]:
        for p in cell.paragraphs:
            for run in p.runs:
                run.font.size = Pt(10)

    # Save to file
    output_path = "PROPOSAL_PENAWARAN_SISTEM_SEKOLAH_CENDEKIA.docx"
    doc.save(output_path)
    print(f"Proposal successfully generated at: {output_path}")

create_proposal()
