import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn
import os

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    tcPr.append(parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>'))

def set_cell_margins(cell, top=120, bottom=120, left=160, right=160):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
    tcPr.append(tcMar)

def add_figure_image(doc, img_path, caption_text, width_inches=6.0):
    if os.path.exists(img_path):
        p_img = doc.add_paragraph()
        p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_img.paragraph_format.space_before = Pt(8)
        p_img.paragraph_format.space_after = Pt(2)
        r_img = p_img.add_run()
        r_img.add_picture(img_path, width=Inches(width_inches))

        p_cap = doc.add_paragraph()
        p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_cap.paragraph_format.space_before = Pt(2)
        p_cap.paragraph_format.space_after = Pt(12)
        r_cap = p_cap.add_run(caption_text)
        r_cap.font.size = Pt(8.5)
        r_cap.font.italic = True
        r_cap.font.color.rgb = RGBColor(100, 116, 139)

def add_two_mobile_figures(doc, img1_path, cap1, img2_path, cap2):
    if os.path.exists(img1_path) and os.path.exists(img2_path):
        table = doc.add_table(rows=1, cols=2)
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        c1, c2 = table.rows[0].cells

        p1 = c1.paragraphs[0]
        p1.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r1 = p1.add_run()
        r1.add_picture(img1_path, width=Inches(2.5))
        p1_cap = c1.add_paragraph()
        p1_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p1_cap.paragraph_format.space_before = Pt(3)
        rc1 = p1_cap.add_run(cap1)
        rc1.font.size = Pt(8)
        rc1.font.italic = True
        rc1.font.color.rgb = RGBColor(100, 116, 139)

        p2 = c2.paragraphs[0]
        p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r2 = p2.add_run()
        r2.add_picture(img2_path, width=Inches(2.5))
        p2_cap = c2.add_paragraph()
        p2_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p2_cap.paragraph_format.space_before = Pt(3)
        rc2 = p2_cap.add_run(cap2)
        rc2.font.size = Pt(8)
        rc2.font.italic = True
        rc2.font.color.rgb = RGBColor(100, 116, 139)

def add_problem_box(doc, text):
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = table.rows[0].cells[0]
    set_cell_background(cell, "FFF1F2") # Light Rose
    set_cell_margins(cell, top=100, bottom=100, left=140, right=140)
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(3)
    p.paragraph_format.space_after = Pt(3)
    r_hdr = p.add_run("🔴 MASALAH DI SEKOLAH SAAT INI (PAIN POINT):\n")
    r_hdr.font.bold = True
    r_hdr.font.size = Pt(9.5)
    r_hdr.font.color.rgb = RGBColor(190, 18, 60) # Rose 700
    r_body = p.add_run(text)
    r_body.font.size = Pt(9.5)
    r_body.font.color.rgb = RGBColor(51, 65, 85)
    doc.add_paragraph().paragraph_format.space_after = Pt(2)

def add_solution_box(doc, text):
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = table.rows[0].cells[0]
    set_cell_background(cell, "F0F9FF") # Light Sky Blue
    set_cell_margins(cell, top=100, bottom=100, left=140, right=140)
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(3)
    p.paragraph_format.space_after = Pt(3)
    r_hdr = p.add_run("🔵 SOLUSI & CARA KERJA FITUR CENDEKIA:\n")
    r_hdr.font.bold = True
    r_hdr.font.size = Pt(9.5)
    r_hdr.font.color.rgb = RGBColor(3, 105, 161) # Sky 700
    r_body = p.add_run(text)
    r_body.font.size = Pt(9.5)
    r_body.font.color.rgb = RGBColor(51, 65, 85)
    doc.add_paragraph().paragraph_format.space_after = Pt(2)

def add_impact_box(doc, text):
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = table.rows[0].cells[0]
    set_cell_background(cell, "F0FDF4") # Light Emerald Green
    set_cell_margins(cell, top=100, bottom=100, left=140, right=140)
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(3)
    p.paragraph_format.space_after = Pt(3)
    r_hdr = p.add_run("🟢 KENAPA FITUR INI WAJIB DIMILIKI & APA DAMPAK KEUNTUNGANNYA?\n")
    r_hdr.font.bold = True
    r_hdr.font.size = Pt(9.5)
    r_hdr.font.color.rgb = RGBColor(21, 128, 61) # Emerald 700
    r_body = p.add_run(text)
    r_body.font.size = Pt(9.5)
    r_body.font.color.rgb = RGBColor(51, 65, 85)
    doc.add_paragraph().paragraph_format.space_after = Pt(8)

def add_heading_with_spacing(doc, text, level, space_before=18, space_after=8, color=None):
    h = doc.add_heading(text, level=level)
    h.paragraph_format.space_before = Pt(space_before)
    h.paragraph_format.space_after = Pt(space_after)
    h.paragraph_format.keep_with_next = True
    if color:
        for r in h.runs:
            r.font.color.rgb = color
    return h

def format_table_headers(table, titles, fill_hex="0F172A"):
    hdr_cells = table.rows[0].cells
    for idx, title in enumerate(titles):
        hdr_cells[idx].text = title
        set_cell_background(hdr_cells[idx], fill_hex)
        set_cell_margins(hdr_cells[idx], top=140, bottom=140, left=160, right=160)
        for p in hdr_cells[idx].paragraphs:
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            for r in p.runs:
                r.font.bold = True
                r.font.color.rgb = RGBColor(255, 255, 255)
                r.font.size = Pt(9.5)

def build_comprehensive_proposal():
    doc = docx.Document()

    # Margin Setup (A4 standard: Top=1", Bottom=1", Left=1", Right=1")
    for section in doc.sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)
        section.page_width = Inches(8.27)  # A4
        section.page_height = Inches(11.69)

    # Color Palette - Professional Corporate Navy/Slate
    COLOR_PRIMARY = RGBColor(15, 23, 42)     # Slate 900
    COLOR_SECONDARY = RGBColor(30, 41, 59)   # Slate 800
    COLOR_ACCENT = RGBColor(37, 99, 235)     # Blue 600
    COLOR_MUTED = RGBColor(100, 116, 139)    # Slate 500
    COLOR_SUCCESS = RGBColor(16, 185, 129)   # Emerald 600
    COLOR_DANGER = RGBColor(225, 29, 72)     # Rose 600

    # =========================================================================
    # HALAMAN COVER / JUDUL UTAMA
    # =========================================================================
    p_pre = doc.add_paragraph()
    p_pre.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_pre = p_pre.add_run("PROPOSAL PENAWARAN & KERJA SAMA DIGITALISASI SEKOLAH")
    r_pre.font.size = Pt(11)
    r_pre.font.bold = True
    r_pre.font.color.rgb = COLOR_ACCENT

    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(24)
    p_title.paragraph_format.space_after = Pt(10)
    r_title = p_title.add_run("CENDEKIA")
    r_title.font.size = Pt(38)
    r_title.font.bold = True
    r_title.font.color.rgb = COLOR_PRIMARY

    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub.paragraph_format.space_after = Pt(36)
    r_sub = p_sub.add_run("INTEGRATED SCHOOL ERP, CBT E-LEARNING, E-RAPOR DIGITAL & MOBILE PARENT PORTAL")
    r_sub.font.size = Pt(12)
    r_sub.font.bold = True
    r_sub.font.color.rgb = COLOR_SECONDARY

    p_tagline = doc.add_paragraph()
    p_tagline.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_tagline.paragraph_format.space_after = Pt(60)
    r_tagline = p_tagline.add_run("Solusi Transformasi Digital Sekolah Modern: Menghilangkan Beban Kertas, Meniadakan Tunggakan SPP, dan Meningkatkan Prestasi serta Akreditasi Institusi Pendidikan.")
    r_tagline.font.size = Pt(10.5)
    r_tagline.font.italic = True
    r_tagline.font.color.rgb = COLOR_MUTED

    # Box Pengajuan
    p_target_label = doc.add_paragraph()
    p_target_label.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_tl = p_target_label.add_run("DOKUMEN PENAWARAN DIAJUKAN KEPADA:")
    r_tl.font.size = Pt(10)
    r_tl.font.bold = True
    r_tl.font.color.rgb = COLOR_ACCENT

    p_inst = doc.add_paragraph()
    p_inst.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_inst.paragraph_format.space_after = Pt(70)
    r_inst = p_inst.add_run("Yth. Dewan Pembina Yayasan, Kepala Sekolah, & Tim Manajemen Sekolah\nDi Tempat")
    r_inst.font.size = Pt(12)
    r_inst.font.bold = True
    r_inst.font.color.rgb = COLOR_PRIMARY

    p_footer_cover = doc.add_paragraph()
    p_footer_cover.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_fc = p_footer_cover.add_run("Disusun Secara Resmi Oleh:\nTim Konsultan Teknologi Pendidikan CENDEKIA (EduTech Nusantara)\nTahun Ajaran 2026/2027")
    r_fc.font.size = Pt(10)
    r_fc.font.color.rgb = COLOR_MUTED

    doc.add_page_break()

    # =========================================================================
    # DAFTAR ISI SINGKAT
    # =========================================================================
    add_heading_with_spacing(doc, "DAFTAR ISI PROPOSAL", level=1, color=COLOR_PRIMARY)
    
    toc_items = [
        ("1. Ringkasan Eksekutif (Executive Summary)", "Visi modernisasi sekolah dan gambaran umum platform Cendekia"),
        ("2. Analisis Permasalahan Nyata di Sekolah (Pain Points)", "Kelemahan sistem konvensional: absensi manual, rapor lembur, tunggakan SPP, ujian kertas"),
        ("3. Solusi Terpadu Ekosistem Cendekia", "Arsitektur solusi all-in-one tanpa fragmentasi aplikasi"),
        ("4. Penjelasan Mendalam Setiap Modul & Fitur Unggulan", "Bedah fitur Website Profil Resmi, Presensi, E-Rapor, CBT, Keuangan, BK, Hybrid Zoom, dan Mobile"),
        ("5. Matriks Manfaat & Benefit Komprehensif per Pengguna", "Keuntungan bagi Yayasan, Kepala Sekolah, Tata Usaha, Guru Mapel, Wali Kelas, Siswa, dan Orang Tua"),
        ("6. Inovasi Smart Hybrid Video Meeting (Nol Beban Server)", "Penyelenggaraan rapat daring komite dan bagi rapor tanpa biaya server jutaan rupiah"),
        ("7. Analisis Penghematan Biaya & Return on Investment (ROI)", "Komparasi riil efisiensi biaya kertas, fotokopi, waktu kerja guru, dan kecepatan cashflow"),
        ("8. Spesifikasi Teknis, Keamanan & Hak Milik Data", "Standar keamanan data, enkripsi, hak privasi institusi, dan reliabilitas server"),
        ("9. Skema Paket Investasi & Biaya Kerja Sama", "Pilihan paket Website Profil, paket SIAKAD Sekolah, paket Bundling, hingga Enterprise"),
        ("10. Rencana Implementasi, Pelatihan (Training), & Garansi Layanan", "Roadmap 4 minggu go-live, transfer knowledge, dan dukungan teknis 24/7"),
        ("11. Penutup & Lembar Kesepakatan Resmi", "Prosedur jadwal demo dan nota persetujuan kerja sama")
    ]

    for title, desc in toc_items:
        p = doc.add_paragraph(style='List Bullet')
        r1 = p.add_run(f"{title} – ")
        r1.font.bold = True
        r1.font.size = Pt(10)
        r2 = p.add_run(desc)
        r2.font.size = Pt(9.5)
        r2.font.color.rgb = COLOR_MUTED

    doc.add_page_break()

    # =========================================================================
    # 1. EXECUTIVE SUMMARY
    # =========================================================================
    add_heading_with_spacing(doc, "1. RINGKASAN EKSEKUTIF (EXECUTIVE SUMMARY)", level=1, color=COLOR_PRIMARY)
    
    doc.add_paragraph(
        "Di tengah persaingan antar-lembaga pendidikan dan tuntutan implementasi Kurikulum Merdeka yang dinamis, citra dan kualitas sebuah sekolah tidak lagi hanya diukur dari fasilitas fisik gedung, melainkan dari kecepatan layanan administrasi, transparansi akademik, serta kemudahan komunikasi antara pihak sekolah dengan wali murid."
    )
    doc.add_paragraph(
        "CENDEKIA adalah ekosistem platform Enterprise School Management (School ERP) & Learning Management System (LMS) berbasis Cloud dan Mobile (Android & iOS) yang mengintegrasikan seluruh operasional sekolah dalam satu genggaman. Cendekia menghubungkan secara mulus 4 ornamen utama sekolah: Manajemen/Tata Usaha, Dewan Guru/Wali Kelas, Siswa, dan Orang Tua (Wali Murid)."
    )
    doc.add_paragraph(
        "Dengan Cendekia, sekolah beralih dari era manual yang lambat dan boros kertas (paper-based) menuju otomatisasi penuh (paperless school): presensi digital instan, pembuatan buku nilai dan pencetakan E-Rapor otomatis berstandar dinas, ujian online CBT dengan penilaian mandiri, penerbitan tagihan SPP massal sekali klik, penanganan kedisiplinan BK terukur, hingga portal khusus orang tua untuk memantau kehadiran dan perkembangan belajar anak secara real-time dari ponsel pintar."
    )

    add_figure_image(doc, "proposal_images/01_dashboard_admin.png", "Gambar 1.1: Tampilan Pusat Kendali (Command Center) & Dashboard Eksekutif Administrator Cendekia")

    # =========================================================================
    # 2. ANALISIS PERMASALAHAN NYATA SEKOLAH (PAIN POINTS)
    # =========================================================================
    add_heading_with_spacing(doc, "2. ANALISIS PERMASALAHAN NYATA SEKOLAH (PAIN POINTS)", level=1, color=COLOR_PRIMARY)

    doc.add_paragraph(
        "Berdasarkan riset mendalam terhadap tata kelola lebih dari 100 institusi sekolah dasar, menengah, hingga kejuruan di Indonesia, kami mengidentifikasi 6 titik kebocoran efisiensi (critical pain points) yang merugikan sekolah setiap tahunnya:"
    )

    pain_points = [
        ("A. Masalah Presensi Konvensional & Keterlambatan Deteksi Masalah",
         "Pencatatan kehadiran menggunakan buku absensi kertas sering tercecer, rawan pemalsuan tanda tangan/titip absen, dan rekapitulasi kehadiran bulanan memakan waktu berhari-hari bagi staf TU. Lebih fatal lagi, orang tua sama sekali tidak mengetahui saat anak bolos atau tidak sampai di sekolah, dan baru mengetahui setelah pihak BK mengirim surat peringatan berminggu-minggu kemudian."),

        ("B. Krisis Akhir Semester: Rekapitulasi Nilai & Lembur Cetak Rapor",
         "Menjelang pembagian rapor, dewan guru dan wali kelas menghadapi beban kerja luar biasa tinggi. Nilai ulangan harian, tugas, PTS, dan PAS harus digabungkan secara manual menggunakan file Microsoft Excel yang rentan kesalahan rumus, salah input predikat, dan tidak terstandarisasi. Akibatnya, guru kehabisan energi untuk fokus mengajar, dan pembagian rapor sering tertunda."),

        ("C. Pembengkakan Biaya Kertas Fotokopi Ujian & Pengelolaan Tugas Fisik",
         "Setiap pelaksanaan Penilaian Tengah Semester (PTS), Penilaian Akhir Semester (PAS), maupun ujian harian, sekolah menghabiskan anggaran jutaan hingga belasan juta rupiah hanya untuk biaya fotokopi lembar soal dan lembar jawaban. Selain itu, pengumpulan tugas fisik di meja guru menumpuk berantakan, rentan hilang, dan membutuhkan waktu koreksi manual yang melelahkan."),

        ("D. Tingginya Angka Tunggakan SPP & Arus Kas (Cashflow) Sekolah Macet",
         "Banyak sekolah swasta mengalami krisis kas operasional karena tingkat piutang SPP yang tinggi. Faktor utamanya adalah: ketiadaan sistem pencatatan terpusat, orang tua lupa batas waktu pembayaran, tidak adanya reminder tagihan resmi, atau uang SPP yang dititipkan orang tua kepada anak disalahgunakan di luar sekolah."),

        ("E. Penanganan Pelanggaran Siswa & BK Tidak Terdokumentasi Terpusat",
         "Pencatatan pelanggaran tata tertib (merokok, terlambat, membolos, perundungan) sering dicatat di buku saku guru BK yang tidak terhubung dengan wali kelas maupun kepala sekolah. Saat siswa dijatuhi sanksi berat (skorsing atau pemanggilan orang tua), timbul penolakan dari wali murid karena merasa sekolah tidak pernah memberikan pembinaan bertahap."),

        ("F. Dilema Rapat Virtual & Konsultasi Rapor: Server Berat vs Undangan Fisik",
         "Mengundang ratusan orang tua hadir fisik ke sekolah memicu kemacetan, ketidakhadiran tinggi bagi orang tua pekerja, dan antrean panjang. Namun, jika sekolah ingin membuat sistem rapat online sendiri, tim IT terkendala biaya server streaming video (WebRTC) yang membutuhkan bandwidth raksasa dan biaya server puluhan juta rupiah per bulan.")
    ]

    for p_title, p_desc in pain_points:
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(8)
        p.paragraph_format.space_after = Pt(4)
        rt = p.add_run(p_title)
        rt.font.bold = True
        rt.font.size = Pt(10.5)
        rt.font.color.rgb = COLOR_DANGER

        pd = doc.add_paragraph()
        pd.paragraph_format.space_after = Pt(6)
        rd = pd.add_run(p_desc)
        rd.font.size = Pt(9.5)

    doc.add_page_break()

    # =========================================================================
    # 3. SOLUSI TERPADU EKOSISTEM CENDEKIA
    # =========================================================================
    add_heading_with_spacing(doc, "3. SOLUSI TERPADU EKOSISTEM CENDEKIA", level=1, color=COLOR_PRIMARY)

    doc.add_paragraph(
        "CENDEKIA memecahkan seluruh persoalan di atas bukan dengan cara menambah tumpukan aplikasi terpisah, melainkan melalui Satu Ekosistem Tunggal Berbasis Awan (Single-Sign-On Platform). Seluruh data dari dewan guru, tata usaha, siswa, hingga orang tua saling mengalir otomatis secara real-time tanpa perlu entri ganda (zero double-entry)."
    )

    # Diagram Konsep Solusi
    p_box = doc.add_paragraph()
    p_box.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_box = p_box.add_run("--- ARSITEKTUR INTEGRASI SATU PINTU CENDEKIA ---")
    r_box.font.bold = True
    r_box.font.color.rgb = COLOR_ACCENT

    table_sol = doc.add_table(rows=1, cols=4)
    table_sol.alignment = WD_TABLE_ALIGNMENT.CENTER
    format_table_headers(table_sol, ["Pilar 1: Akademik", "Pilar 2: Keuangan", "Pilar 3: E-Learning", "Pilar 4: Sinergi Ortu"])

    row_sol = table_sol.add_row()
    s_cells = row_sol.cells
    s_cells[0].text = "• Buku Nilai Guru\n• E-Rapor Kurikulum Merdeka\n• Presensi Digital Harian\n• Kalender Akademik Resmi"
    s_cells[1].text = "• Tagihan Massal Sekali Klik\n• Kartu SPP Digital Siswa\n• Kwitansi Otomatis PDF\n• Audit Piutang Real-time"
    s_cells[2].text = "• Modul Materi Belajar\n• Pengumpulan Tugas Online\n• Ujian CBT Timer Otomatis\n• Bank Soal & Nilai Instan"
    s_cells[3].text = "• Aplikasi Mobile Ortu\n• Monitoring Hadir/Alpa\n• Poin Pelanggaran BK\n• Zoom Rapat 1-Klik"

    for idx, c in enumerate(s_cells):
        set_cell_margins(c, top=100, bottom=100, left=120, right=120)
        set_cell_background(c, "F8FAFC")
        for p in c.paragraphs:
            for r in p.runs:
                r.font.size = Pt(9)

    doc.add_paragraph()

    # =========================================================================
    # 4. PENJELASAN MENDALAM SETIAP MODUL & FITUR UNGGULAN
    # =========================================================================
    add_heading_with_spacing(doc, "4. PENJELASAN MENDALAM SETIAP MODUL & FITUR UNGGULAN", level=1, color=COLOR_PRIMARY)
    doc.add_paragraph(
        "Setiap fitur dan modul dalam CENDEKIA dikembangkan bukan sekadar sebagai perangkat lunak administratif biasa, melainkan dirancang secara spesifik untuk membedah dan menyelesaikan akar permasalahan operasional sekolah. Berikut adalah analisis komprehensif akar masalah, solusi teknologi, bukti nyata antarmuka sistem, serta alasan esensial mengapa fitur ini wajib dimiliki institusi pendidikan modern:"
    )

    # 4.1 Modul Presensi
    add_heading_with_spacing(doc, "4.1. Modul Presensi & Kehadiran Harian Siswa (Digital Attendance)", level=2, space_before=14, space_after=6, color=COLOR_SECONDARY)
    add_problem_box(
        doc,
        "Di banyak sekolah, absensi masih menggunakan kertas lembaran atau buku presensi manual yang memakan waktu 15–20 menit di awal jam pelajaran. Selain menyita waktu mengajar guru, absensi manual sangat rawan manipulasi (titip absen/tanda tangan palsu) dan dokumennya mudah robek atau hilang. Rekapitulasi bulanan menghabiskan berhari-hari kerja staf TU. Yang paling berbahaya: bila anak membolos di tengah jalan dan tidak sampai di sekolah, orang tua sama sekali tidak mengetahuinya sampai berminggu-minggu kemudian saat kasus sudah terlanjur fatal."
    )
    add_solution_box(
        doc,
        "CENDEKIA menyediakan modul presensi digital instan. Guru cukup membuka menu Presensi di gawai/laptop, sistem otomatis menetapkan status default 'Hadir Semua' sehingga guru hanya perlu menandai siswa yang Sakit, Izin, atau Alpa. Presensi 1 kelas (35–40 siswa) tuntas dalam tempo kurang dari 30 detik! Dilengkapi kolom pencatatan nomor surat dokter/keterangan izin, kalkulasi persentase kehadiran otomatis yang langsung mengalir ke E-Rapor, serta tombol 'Kirim WA ke Orang Tua' sekali klik untuk konfirmasi kehadiran langsung ke nomor WhatsApp wali murid tanpa biaya langganan API tambahan."
    )
    add_figure_image(doc, "proposal_images/03_absensi_guru.png", "Gambar 4.1: Antarmuka Presensi Guru dengan Tombol Status Cepat, Rekapitulasi Otomatis, dan Notifikasi WhatsApp Ortu")
    add_impact_box(
        doc,
        "1. Ketenangan & Kepercayaan Penuh Orang Tua (Peace of Mind): Sekolah mampu mendeteksi ketidakhadiran siswa di jam pertama dan memberi kepastian keselamatan anak kepada keluarga.\n"
        "2. Efisiensi Jam Mengajar: Menghemat 15 menit per kelas per hari (akumulasi ratusan jam kerja guru per semester) yang dialihkan sepenuhnya untuk kualitas pembelajaran.\n"
        "3. Validitas & Kesiapan Audit Akreditasi: Rekapitulasi persentase kehadiran siswa tersaji secara presisi, real-time, dan terverifikasi tanpa rekayasa data untuk kebutuhan akreditasi BAN-S/M."
    )

    # 4.2 Modul Buku Nilai & E-Rapor Digital
    add_heading_with_spacing(doc, "4.2. Modul Buku Nilai & E-Rapor Digital Siap Cetak (Kurikulum Merdeka)", level=2, space_before=16, space_after=6, color=COLOR_SECONDARY)
    add_problem_box(
        doc,
        "Setiap akhir semester, guru dan wali kelas dihadapkan pada mimpi buruk administratif: mengumpulkan nilai harian, tugas, PTS, dan PAS dari berbagai lembar kertas atau spreadsheet Excel yang terpisah-pisah. Rumus kalkulasi sering rusak (error formula), penentuan predikat huruf tidak seragam, dan input capaian kompetensi secara manual memicu stres tinggi hingga begadang berminggu-minggu. Akibatnya, pembagian rapor murid sering terlambat dan citra profesionalisme sekolah di mata orang tua menurun."
    )
    add_solution_box(
        doc,
        "CENDEKIA menghadirkan Buku Nilai Akademik Terpadu yang sepenuhnya selaras dengan panduan Kurikulum Merdeka dan Kurikulum 2013. Guru mata pelajaran cukup menginput nilai tugas dan asesmen (formatif/sumatif). Sistem secara otomatis menghitung bobot nilai akhir, mengonversi skor angka menjadi predikat (A/B/C/D) sesuai Kriteria Ketercapaian Tujuan Pembelajaran (KKTP), dan menyusun catatan capaian Profil Pelajar Pancasila. Dalam satu sentuhan tombol, dokumen E-Rapor resmi format standar A4 langsung siap dicetak lengkap dengan kop surat sekolah, rekap absensi, catatan wali kelas, dan kolom tanda tangan kepala sekolah."
    )
    add_figure_image(doc, "proposal_images/04_buku_nilai.png", "Gambar 4.2: Buku Nilai Akademik Terpadu dengan Kalkulasi Bobot Formatif/Sumatif dan Konversi Predikat Otomatis")
    add_figure_image(doc, "proposal_images/06_e_rapor.png", "Gambar 4.3: Dokumen Resmi E-Rapor Digital Siap Cetak Format A4 Standar Kurikulum Merdeka Lengkap Kolom Tanda Tangan")
    add_impact_box(
        doc,
        "1. Menghilangkan Lembur & Kelelahan Guru: Proses penyusunan rapor yang biasanya memakan waktu 2–3 minggu dipangkas menjadi hanya 1–2 hari.\n"
        "2. Akurasi 100% (Zero Human-Error): Menghilangkan risiko kekeliruan hitung rumus matematika atau kesalahan ketik predikat yang sering memicu sengketa nilai dengan wali murid.\n"
        "3. Standardisasi Dokumen Sesuai Regulasi Kemendikbudristek: Sekolah tampil sangat profesional dengan tata letak rapor yang rapi, elegan, berwibawa, dan siap cetak atau diunduh format PDF."
    )

    # 4.3 Modul E-Learning & CBT Online Engine
    add_heading_with_spacing(doc, "4.3. Modul E-Learning, Tugas Mandiri, & Ujian Online (CBT Engine)", level=2, space_before=16, space_after=6, color=COLOR_SECONDARY)
    add_problem_box(
        doc,
        "Penyelenggaraan ujian konvensional berbasis kertas (PTS, PAS, Asesmen Harian) menyedot anggaran fotokopi hingga puluhan juta rupiah setiap tahun. Ditambah lagi risiko kebocoran naskah soal, tumpukan berkas lembar jawaban yang berantakan, serta kelelahan guru yang harus mengoreksi ratusan lembar jawaban secara manual satu per satu. Siswa generasi digital masa kini juga merasa metode kertas konvensional sangat membosankan dan membuat mereka gagap saat menghadapi ujian berbasis komputer nasional (seperti ANBK atau SNBT/UTBK)."
    )
    add_solution_box(
        doc,
        "CENDEKIA menyatukan ruang E-Learning dan mesin ujian mandiri Computer Based Test (CBT) berkemampuan tinggi. Guru dapat membagikan modul ajar multimedia (PDF, materi ringkasan, instruksi tugas) lengkap dengan batas akhir pengumpulan tugas (deadline tracker). Pada modul CBT, ujian dilengkapi sistem hitung mundur (countdown timer), pengacakan otomatis urutan butir soal serta opsi pilihan ganda (anti-contek), fitur auto-save jawaban setiap detik saat koneksi internet siswa naik-turun, serta koreksi otomatis yang menghitung skor dan analisis butir soal seketika setelah tombol selesai ditekan."
    )
    add_figure_image(doc, "proposal_images/05_cbt_exam.png", "Gambar 4.4: Antarmuka Ruang Ujian CBT Siswa Berwaktu Lengkap dengan Navigasi Soal dan Koreksi Nilai Instan")
    add_impact_box(
        doc,
        "1. Penghematan Anggaran Kertas (Cost Saving Raksasa): Menghapus 100% biaya pembelian kertas dan fotokopi lembar soal ujian (menghemat Rp 15.000.000 – Rp 35.000.000 per tahun untuk sekolah berkapasitas 500–1.000 siswa).\n"
        "2. Efisiensi Koreksi Instan: Nilai ujian siswa langsung keluar dalam hitungan detik setelah ujian berakhir; guru bebas dari beban koreksi manual dan dapat langsung mengevaluasi daya serap siswa.\n"
        "3. Kesiapan Kompetensi Digital Siswa: Melatih siswa terbiasa dengan ritme dan antarmuka tes berbasis komputer standar nasional, mendongkrak capaian nilai dan reputasi sekolah."
    )

    # 4.4 Modul Smart Finance: SPP & Tagihan Massal
    add_heading_with_spacing(doc, "4.4. Modul Smart Finance: Manajemen Tagihan & Penerbitan SPP Massal", level=2, space_before=16, space_after=6, color=COLOR_SECONDARY)
    add_problem_box(
        doc,
        "Tunggakan pembayaran SPP adalah ancaman terbesar bagi kelancaran arus kas (cashflow) dan pembayaran gaji dewan guru di sekolah swasta. Staf Tata Usaha harus menulis buku kwitansi berkarbon satu per satu untuk ratusan siswa, memicu antrean panjang di loket TU saat tanggal gajian. Pencatatan manual sering memicu selisih kas, rekapitulasi piutang kabur, dan orang tua sering beralasan 'lupa bayar' karena tidak ada rekap tagihan yang jelas. Banyak pula kasus uang SPP yang dititipkan orang tua kepada anak malah terpakai untuk bermain game atau kebutuhan konsumtif lain."
    )
    add_solution_box(
        doc,
        "Fitur 'Mass Billing Generator' pada modul Smart Finance CENDEKIA memungkinkan staf Tata Usaha/Keuangan menerbitkan tagihan SPP bulanan ke seluruh siswa (ratusan hingga ribuan siswa) hanya dengan 1 KALI KLIK di awal bulan. Sistem otomatis menyusun Kartu SPP Digital untuk setiap siswa, memfasilitasi pencatatan multi-metode pembayaran (Tunai di Loket, Transfer Bank, maupun QRIS), menerbitkan kwitansi resmi digital ber-ID transaksi unik, serta menyediakan dashboard audit kas dan daftar siswa yang menunggak secara real-time dan akurat."
    )
    add_figure_image(doc, "proposal_images/02_finance_spp.png", "Gambar 4.5: Modul Keuangan & Generator Penerbitan Tagihan SPP Massal Sekali Klik dengan Dashboard Audit Piutang")
    add_impact_box(
        doc,
        "1. Percepatan Arus Kas (Cashflow Liquidity): Menurunkan angka keterlambatan bayar SPP hingga 70–80% karena informasi tagihan transparan dan terpantau langsung di ponsel wali murid.\n"
        "2. Menutup Celah Kebocoran Dana: Menghilangkan risiko uang titipan SPP disalahgunakan siswa atau hilang di jalan; seluruh riwayat transaksi terekam permanen dan dapat diaudit secara terbuka.\n"
        "3. Efisiensi Kerja Staf TU Hingga 90%: Dari proses pencatatan manual berhari-hari menjadi hitungan menit; staf TU terbebas dari antrean administrasi yang melelahkan."
    )

    # 4.5 Modul Bimbingan Konseling (BK) & Kedisiplinan
    add_heading_with_spacing(doc, "4.5. Modul Bimbingan Konseling (BK) & Manajemen Kedisiplinan Siswa", level=2, space_before=16, space_after=6, color=COLOR_SECONDARY)
    add_problem_box(
        doc,
        "Buku saku catatan pelanggaran siswa kerap kali tercecer, hilang, atau hanya tersimpan di laci guru BK tanpa terkoordinasi dengan wali kelas dan kepala sekolah. Ketika siswa melakukan pelanggaran berulang hingga batas kritis dan sekolah harus menjatuhkan sanksi (seperti skorsing atau pemanggilan orang tua), wali murid sering kali tidak terima, memprotes keras, dan menuduh sekolah berbuat tidak adil karena merasa tidak pernah diberi peringatan atau pembinaan bertahap sebelumnya."
    )
    add_solution_box(
        doc,
        "CENDEKIA menyediakan modul Bimbingan Konseling (BK) digital berbasis poin kedisiplinan objektif. Sistem membagi tindakan siswa ke dalam bobot pelanggaran (Ringan, Sedang, Berat) serta poin apresiasi prestasi. Setiap catatan mencantumkan tanggal kejadian, saksi, deskripsi masalah, dan langkah pembinaan guru BK. Seluruh riwayat ini terakumulasi otomatis dan dapat dilihat secara transparan oleh orang tua melalui Portal Wali Murid, menciptakan jembatan pembinaan karakter bersama antara keluarga dan sekolah."
    )
    add_impact_box(
        doc,
        "1. Bukti Pembinaan yang Sah & Terbuka: Menghilangkan potensi konflik atau tuntutan hukum dari orang tua karena sekolah memiliki rekam jejak digital kronologis yang tidak dapat dibantah.\n"
        "2. Deteksi Dini Permasalahan Karakter: Guru BK dan wali kelas dapat melakukan intervensi preventif sejak pelanggaran masih berada di level ringan sebelum berkembang menjadi masalah serius.\n"
        "3. Iklim Sekolah Tertib & Positif: Siswa lebih menghargai tata tertib karena sistem poin berlaku adil, objektif, dan transparan bagi seluruh peserta didik tanpa pilih kasih."
    )

    # 4.6 Modul Inovasi: Portal Wali Murid Real-time & Smart Hybrid Meeting
    add_heading_with_spacing(doc, "4.6. Modul Inovasi: Portal Wali Murid Real-time & Smart Hybrid Video Meeting", level=2, space_before=16, space_after=6, color=COLOR_SECONDARY)
    add_problem_box(
        doc,
        "Kesibukan kerja para orang tua modern sering membuat mereka sulit meluangkan waktu hadir ke sekolah untuk rapat komite atau konsultasi rapor, sehingga tingkat kehadiran rapat orang tua kerap di bawah 50%. Di sisi lain, jika pihak sekolah ingin menyelenggarakan rapat video online mandiri, tim IT sekolah terkendala oleh mahalnya biaya server video streaming (WebRTC) yang membutuhkan bandwidth raksasa (mencapai puluhan juta rupiah per bulan) serta server sekolah yang rentan crash saat diakses ratusan peserta secara serentak."
    )
    add_solution_box(
        doc,
        "CENDEKIA memadukan Portal Wali Murid Real-time dengan arsitektur inovatif 'Smart Hybrid Video Meeting'. Portal Wali Murid menampilkan kartu status kehadiran anak hari ini (dilengkapi peringatan visual merah jika anak Alpa), rincian tagihan SPP, nilai akademik, dan poin BK langsung dari HP orang tua. Untuk kegiatan rapat online, sistem mengintegrasikan tautan ruang rapat ke infrastruktur global Zoom atau Google Meet dalam 1 klik. Lalu lintas video dialihkan ke jaringan cloud global, sehingga BEBAN BANDWIDTH SERVER SEKOLAH TETAP 0% DAN BIAYA SERVER TETAP NOL RUPIAH!"
    )
    add_figure_image(doc, "proposal_images/07_portal_orangtua.png", "Gambar 4.6: Portal Wali Murid Real-time: Presensi Anak Hari Ini, Peringatan Alpa, Poin BK, Tagihan SPP, dan Rapat Zoom 1-Klik")
    add_impact_box(
        doc,
        "1. Partisipasi Wali Murid Tembus 95%: Orang tua dapat mengikuti rapat koordinasi sekolah dan konsultasi evaluasi belajar anak dari kantor atau rumah tanpa terkendala macet.\n"
        "2. Kepuasan & Loyalitas Wali Murid Meroket: Layanan informasi yang real-time dan transparan membuat orang tua merasa bangga dan sangat percaya pada mutu manajemen sekolah.\n"
        "3. Solusi Cerdas Tanpa Beban Finansial: Sekolah menikmati fasilitas video conference kelas dunia tanpa perlu membeli atau menyewa server berkecepatan tinggi yang mahal."
    )

    # 4.7 Modul Aplikasi Mobile Multi-Platform (Android, iOS & PWA Modern)
    add_heading_with_spacing(doc, "4.7. Modul Aplikasi Mobile Multi-Platform (PWA, Android & iOS)", level=2, space_before=16, space_after=6, color=COLOR_SECONDARY)
    add_problem_box(
        doc,
        "Aplikasi sistem sekolah terdahulu umumnya hanya berbasis web desktop yang kaku, lambat dibuka di ponsel, dan mengharuskan pengguna mengetikkan URL panjang berulang kali. Bila dipaksakan membuat aplikasi Android native di Play Store, ukurannya seringkali berat (puluhan hingga ratusan megabyte), memakan memori HP orang tua kelas menengah ke bawah, lambat diunduh di area sinyal minim, dan sekolah harus menanggung biaya pemeliharaan akun developer store setiap tahun."
    )
    add_solution_box(
        doc,
        "CENDEKIA mengadopsi teknologi terdepan Progressive Web App (PWA) ultra-ringan yang didukung penuh oleh source code native Android Studio. Aplikasi dapat langsung dipasang ke layar utama (Home Screen) smartphone hanya dengan 1 sentuhan, tanpa antrean unduhan di Play Store dan hanya memerlukan ruang penyimpanan kurang dari 3 MB! Tampilan antarmuka sangat responsif, memuat data dalam waktu kurang dari 1 detik, mendukung push notifications, serta sangat ramah konsumsi baterai dan kuota internet."
    )
    add_two_mobile_figures(doc, "proposal_images/08_mobile_parent.png", "Gambar 4.7: Tampilan Mobile Portal Orang Tua", "proposal_images/09_mobile_student.png", "Gambar 4.8: Tampilan Mobile Portal Siswa")
    add_impact_box(
        doc,
        "1. Kemudahan Akses Universal: Berjalan mulus di segala tipe smartphone (Android maupun iPhone) dari level pemula (entry-level) hingga premium tanpa membebani perangkat.\n"
        "2. Kecepatan Komunikasi Sekolah: Pengumuman penting, jadwal ujian, dan status kehadiran langsung tersaji di saku orang tua dan siswa setiap saat.\n"
        "3. Zero Maintenance bagi Pengguna: Sistem diperbarui secara terpusat di cloud; pengguna tidak perlu repot melakukan update manual berulang kali di Play Store."
    )

    # 4.8 Modul Website Profil Resmi Sekolah (.sch.id)
    add_heading_with_spacing(doc, "4.8. Modul Website Profil Resmi Sekolah (.sch.id) & Portal Informasi Publik", level=2, space_before=16, space_after=6, color=COLOR_SECONDARY)
    add_problem_box(
        doc,
        "Banyak institusi sekolah di daerah belum memiliki situs web resmi berdomain dinas (.sch.id) atau hanya menggunakan template blog gratisan yang tampilannya berantakan, tidak terawat, serta rentan mengalami peretasan (defacement iklan judi online). Akibatnya, masyarakat dan calon wali murid sulit mencari informasi resmi, pelaksanaan PPDB online terhambat, dan sekolah dinilai kurang siap bertransformasi digital saat dinas pendidikan maupun tim asesor akreditasi BAN-S/M melakukan visitasi."
    )
    add_solution_box(
        doc,
        "CENDEKIA menghadirkan Website Profil Resmi Sekolah yang mengadopsi standar portal terdepan (seperti referensi SMAN 1 Raha). Dilengkapi domain dinas resmi (.sch.id), sertifikat keamanan SSL, Sambutan Kepala Sekolah yang berwibawa, visi & misi, profil jurusan/peminatan, fasilitas sarana prasarana, galeri dokumentasi kegiatan, informasi PPDB online, hingga rubrik berita terkini. Website ini dirancang sangat elegan, responsif di segala perangkat ponsel/laptop, serta dilengkapi tombol Single-Sign-On menuju Portal SIAKAD internal guru dan siswa."
    )
    add_figure_image(doc, "proposal_images/13_sman1_raha_reference_match.png", "Gambar 4.9: Tampilan Website Profil Resmi Sekolah Berstandar Portal Maju Lengkap dengan Integrasi SIAKAD")
    add_impact_box(
        doc,
        "1. Kredibilitas & Prestise Sekolah Meroket: Menghadirkan citra lembaga pendidikan yang modern, megah, dan terpercaya di mata masyarakat luas serta dinas pendidikan.\n"
        "2. Rekrutmen Siswa Baru (PPDB) Efektif: Alur pendaftaran dan syarat masuk dapat diakses secara transparan dari mana saja, mempermudah panitia PPDB menjaring calon siswa berkualitas.\n"
        "3. Poin Unggulan Akreditasi Nasional: Memenuhi instrumen akreditasi sekolah terkait transparansi informasi publik dan implementasi sarana teknologi informasi sekolah."
    )

    doc.add_page_break()

    # =========================================================================
    # 5. MATRIKS MANFAAT & BENEFIT PER STAKEHOLDER
    # =========================================================================
    add_heading_with_spacing(doc, "5. MATRIKS MANFAAT & BENEFIT KOMPREHENSIF PER PENGGUNA", level=1, color=COLOR_PRIMARY)

    doc.add_paragraph(
        "Implementasi CENDEKIA dirancang untuk memberikan keuntungan terukur (tangible benefits) bagi setiap lapisan ornamen struktur sekolah:"
    )

    table_ben = doc.add_table(rows=1, cols=3)
    table_ben.alignment = WD_TABLE_ALIGNMENT.CENTER
    format_table_headers(table_ben, ["Struktur Pengguna", "Masalah Sebelum Ada Cendekia", "Manfaat Nyata Setelah Pakai Cendekia"])

    benefit_matrix = [
        ("Ketua Yayasan & Kepala Sekolah",
         "• Buta terhadap data keuangan dan piutang harian.\n• Laporan akademik lambat diterima.\n• Akreditasi terhambat akibat berkas administrasi berserakan.",
         "• Dashboard eksekutif memantau kas SPP dan kehadiran real-time.\n• Kendali mutu akademik sekolah terpantau dari laptop/HP.\n• Bukti tata kelola digital unggulan yang menaikkan nilai akreditasi sekolah."),

        ("Tata Usaha (TU) & Bendahara",
         "• Menulis kwitansi manual berhari-hari untuk ratusan siswa.\n• Sering selisih kas dan sulit melacak siswa penunggak SPP.\n• Data siswa dan guru tidak tersinkronisasi.",
         "• Penerbitan tagihan massal seluruh sekolah dalam 1 detik.\n• Audit pembayaran dan rekap piutang otomatis tanpa salah hitung.\n• Database induk siswa (NISN/Dapodik) rapi dan mudah dicari."),

        ("Dewan Guru Mata Pelajaran",
         "• Waktu habis mengoreksi lembaran kertas ujian fisik.\n• Repot membawa tumpukan buku tugas ke rumah.\n• Kesulitan membagi materi secara terstruktur.",
         "• Koreksi otomatis ujian pilihan ganda CBT (nilai keluar seketika).\n• Pengumpulan tugas online rapi per mata pelajaran.\n• Bank materi belajar digital dapat dipakai berulang setiap tahun."),

        ("Wali Kelas",
         "• Lembur berhari-hari akhir semester menghitung rumus nilai di Excel.\n• Rawan salah input predikat dan salah format lembar rapor.\n• Terisolasi dari informasi tunggakan SPP anak binaannya.",
         "• Rekapitulasi nilai dan konversi predikat otomatis oleh sistem.\n• Cetak E-Rapor format resmi dalam 1 klik (siap dibagikan).\n• Memiliki catatan komprehensif perkembangan akademik dan karakter siswa."),

        ("Guru Bimbingan Konseling (BK)",
         "• Catatan kasus pelanggaran siswa tercecer di lembaran lepas.\n• Sering diprotes wali murid karena tidak ada bukti bertahap.\n• Sulit memantau siswa yang butuh penanganan khusus.",
         "• Buku catatan digital pelanggaran & konseling tersentralisasi.\n• Poin kedisiplinan otomatis terakumulasi transparan.\n• Dokumen kronologi lengkap sebagai dasar objektif pemanggilan orang tua."),

        ("Siswa",
         "• Sering lupa jadwal pelajaran dan batas akhir pengumpulan tugas.\n• Lembar soal ujian fotokopi buram dan tidak nyaman.\n• Rapor fisik rentan basah, sobek, atau hilang.",
         "• Jadwal pelajaran dan tenggat waktu tugas terpampang jelas di aplikasi.\n• Ujian CBT modern dan interaktif layaknya tes standar nasional (UTBK).\n• Arsip materi belajar dan E-Rapor digital tersimpan aman selamanya."),

        ("Orang Tua / Wali Murid",
         "• Was-was apakah anak benar-benar sampai di sekolah atau membolos.\n• Uang SPP dititipkan rentan terpakai untuk keperluan lain oleh anak.\n• Tidak tahu nilai harian anak sampai buku rapor fisik dibagikan.",
         "• Ketenangan batin (Peace of Mind): notifikasi kehadiran anak harian.\n• Transparansi tagihan SPP: tahu persis status pembayaran dan kwitansi.\n• Sinergi aktif: bisa konsultasi rapor online via Zoom tanpa repot izin kerja.")
    ]

    for role, before_txt, after_txt in benefit_matrix:
        row = table_ben.add_row()
        cells = row.cells
        cells[0].text = role
        cells[1].text = before_txt
        cells[2].text = after_txt

        for idx, c in enumerate(cells):
            set_cell_margins(c, top=80, bottom=80, left=120, right=120)
            if idx == 0:
                set_cell_background(c, "F1F5F9")
            elif idx == 1:
                set_cell_background(c, "FFF1F2")  # Light red
            else:
                set_cell_background(c, "F0FDF4")  # Light green

            for p in c.paragraphs:
                for r in p.runs:
                    r.font.size = Pt(8.5)
                    if idx == 0:
                        r.font.bold = True

    doc.add_page_break()

    # =========================================================================
    # 6. INOVASI SMART HYBRID VIDEO MEETING (NOL BEBAN SERVER)
    # =========================================================================
    add_heading_with_spacing(doc, "6. INOVASI SMART HYBRID VIDEO MEETING (NOL BEBAN SERVER)", level=1, color=COLOR_PRIMARY)

    doc.add_paragraph(
        "Salah satu kendala terbesar sekolah dalam menggelar rapat pembagian rapor atau rapat komite secara online adalah ketakutan akan biaya infrastruktur server yang membengkak. Cendekia memecahkan masalah ini dengan solusi arsitektur hibrida berstandar industri edutech global:"
    )

    # Tabel Perbandingan Arsitektur Meeting
    table_mtg = doc.add_table(rows=1, cols=3)
    table_mtg.alignment = WD_TABLE_ALIGNMENT.CENTER
    format_table_headers(table_mtg, ["Parameter Komparasi", "Self-Hosted Video Streaming Mandiri", "Smart Hybrid Architecture CENDEKIA"])

    mtg_comp = [
        ("Kebutuhan Bandwidth Server", "Sangat masif (> 500 Mbps hingga 2 Gbps untuk 300 siswa)", "0% (Nol) Beban Server Sekolah"),
        ("Risiko Server Down / Crash", "Sangat tinggi saat jam rapat pleno dibuka bersamaan", "0% Risiko Down (Menggunakan Global Tier-1 CDN)"),
        ("Spesifikasi Server Dibutuhkan", "Server High-End (Biaya Rp 10 - 25 Juta / Bulan)", "Server Standar Ekonomis (Mulai Rp 150.000 / Bulan)"),
        ("Kualitas Video & Audio", "Sering patah-patah dan buffering jika koneksi fluktuatif", "HD Jernih, Stabil, dan Kompresi Video Adaptif"),
        ("Kemudahan Akses Peserta", "Harus install aplikasi tambahan berat di browser", "1-Klik dari Aplikasi Cendekia (Buka Zoom / Meet)")
    ]

    for prm, bad_val, good_val in mtg_comp:
        row = table_mtg.add_row()
        cells = row.cells
        cells[0].text = prm
        cells[1].text = bad_val
        cells[2].text = good_val

        for idx, c in enumerate(cells):
            set_cell_margins(c, top=80, bottom=80, left=120, right=120)
            if idx == 0:
                set_cell_background(c, "F8FAFC")
            elif idx == 1:
                set_cell_background(c, "FEF2F2")
            else:
                set_cell_background(c, "F0FDF4")

            for p in c.paragraphs:
                for r in p.runs:
                    r.font.size = Pt(9)
                    if idx in [0, 2]:
                        r.font.bold = True

    doc.add_paragraph(
        "Kesimpulan: Sekolah mendapatkan kemudahan rapat daring dan konsultasi rapor jarak jauh tanpa perlu mengeluarkan biaya investasi server jutaan rupiah."
    )

    # =========================================================================
    # 7. ANALISIS RETURN ON INVESTMENT (ROI) & PENGHEMATAN BIAYA
    # =========================================================================
    add_heading_with_spacing(doc, "7. ANALISIS RETURN ON INVESTMENT (ROI) & PENGHEMATAN BIAYA", level=1, color=COLOR_PRIMARY)

    doc.add_paragraph(
        "Implementasi Cendekia bukan merupakan pos pengeluaran (biaya), melainkan investasi strategis yang langsung memangkas pengeluaran rutin operasional sekolah sejak bulan pertama penggunaan:"
    )

    table_roi = doc.add_table(rows=1, cols=4)
    table_roi.alignment = WD_TABLE_ALIGNMENT.CENTER
    format_table_headers(table_roi, ["Pos Pengeluaran Rutin Sekolah", "Estimasi Biaya Manual (Per Tahun)", "Biaya dengan Cendekia", "Estimasi Penghematan"])

    roi_data = [
        ("Fotokopi Soal PTS, PAS, & Ulangan (500 Siswa)", "Rp 18.000.000", "Rp 0 (100% CBT Online)", "Hemat Rp 18.000.000"),
        ("Kertas & Map Rapor Fisik Siswa", "Rp 7.500.000", "Rp 1.500.000 (Hanya arsip akhir)", "Hemat Rp 6.000.000"),
        ("Kertas Kwitansi, Kartu SPP & Cetak Tagihan", "Rp 4.000.000", "Rp 0 (Digital & PDF Receipt)", "Hemat Rp 4.000.000"),
        ("Surat Edaran, Undangan Rapat Fisik & Amplop", "Rp 3.500.000", "Rp 0 (Portal HP & Smart Link)", "Hemat Rp 3.500.000"),
        ("Potensi Kerugian Piutang SPP Macet (Tunggakan)", "Rp 25.000.000 - Rp 50.000.000", "Tertagih Cepat (Reminder Digital)", "Pemulihan Kas > Rp 20.000.000"),
        ("TOTAL EFISIENSI ANGGARAN OPERASIONAL SEKOLAH", "Rp 58.000.000+", "Sangat Minimum", "PENGHEMATAN: Rp 31.500.000 - Rp 50.000.000 / TAHUN")
    ]

    for p_name, manual_c, cende_c, save_c in roi_data:
        row = table_roi.add_row()
        cells = row.cells
        cells[0].text = p_name
        cells[1].text = manual_c
        cells[2].text = cende_c
        cells[3].text = save_c

        for idx, c in enumerate(cells):
            set_cell_margins(c, top=80, bottom=80, left=120, right=120)
            if p_name.startswith("TOTAL"):
                set_cell_background(c, "0F172A")
                for p in c.paragraphs:
                    for r in p.runs:
                        r.font.bold = True
                        r.font.size = Pt(9.5)
                        r.font.color.rgb = RGBColor(255, 255, 255)
            else:
                if idx == 0:
                    set_cell_background(c, "F8FAFC")
                for p in c.paragraphs:
                    for r in p.runs:
                        r.font.size = Pt(9)
                        if idx in [0, 3]:
                            r.font.bold = True

    doc.add_page_break()

    # =========================================================================
    # 8. SPESIFIKASI TEKNIS & KEAMANAN DATA
    # =========================================================================
    add_heading_with_spacing(doc, "8. SPESIFIKASI TEKNIS & KEAMANAN DATA (ENTERPRISE GRADE)", level=1, color=COLOR_PRIMARY)

    doc.add_paragraph(
        "Cendekia dibangun menggunakan teknologi mutakhir yang digunakan oleh perusahaan teknologi terkemuka dunia guna memastikan kecepatan, keamanan, dan keandalan sistem jangka panjang:"
    )

    tech_specs = [
        ("Framework & Backend: ", "Next.js 16 (App Router) dengan Turbopack Engine untuk performa server rendering tercepat."),
        ("Bahasa Pemrograman: ", "TypeScript murni (Type-Safe) untuk meniadakan bug dan kegagalan sistem."),
        ("Database Relasional: ", "MySQL 8.4 Enterprise Edition dengan Prisma ORM untuk pemrosesan jutaan data transaksi secara stabil."),
        ("Aplikasi Mobile: ", "React Native & Expo untuk performa native Android/iOS, serta Progressive Web App (PWA) instan."),
        ("Standar Enkripsi Password: ", "Bcrypt Cryptographic Salt Hashing (Standar Perbankan) sehingga kata sandi tidak dapat dibaca oleh siapa pun termasuk admin."),
        ("Hak Akses Bertingkat (Role-Based Access): ", "Pemisahan hak akses ketat antara Administrator, Guru, Siswa, dan Orang Tua untuk menjaga kerahasiaan data nilai dan keuangan."),
        ("Backup & Kedaulatan Data Sekolah: ", "100% kepemilikan data adalah milik mutlak pihak sekolah/yayasan. Database dapat di-backup dan di-export kapan saja ke format SQL/Excel.")
    ]

    for t_title, t_desc in tech_specs:
        p = doc.add_paragraph(style='List Bullet')
        p.paragraph_format.space_before = Pt(3)
        p.paragraph_format.space_after = Pt(3)
        r1 = p.add_run(t_title)
        r1.font.bold = True
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = COLOR_PRIMARY
        r2 = p.add_run(t_desc)
        r2.font.size = Pt(9.5)

    # =========================================================================
    # 9. SKEMA INVESTASI & BIAYA KERJA SAMA
    # =========================================================================
    add_heading_with_spacing(doc, "9. SKEMA PENAWARAN INVESTASI & BIAYA KERJA SAMA", level=1, color=COLOR_PRIMARY)

    doc.add_paragraph(
        "Banyak institusi sekolah merasa ragu ketika harus berinvestasi pada sistem informasi baru karena kekhawatiran akan beban biaya pengadaan awal yang sangat tinggi (mencapai Rp 35 - 50 juta). Hal tersebut sering kali membebani kas yayasan dan terbentur pada pos anggaran tahunan yang belum dianggarkan."
    )
    doc.add_paragraph(
        "CENDEKIA menghadirkan solusi penganggaran yang proporsional, realistis, dan berkelas enterprise melalui skema: 'BIAYA SETUP TERJANGKAU + MANAGED MAINTENANCE BERKALA'. Dengan model ini, sekolah dapat langsung menikmati sistem digital grade-A tanpa menguras kas modal di awal, sementara kelangsungan performa server, keamanan data, dan pendampingan teknis dijamin penuh melalui biaya pemeliharaan berkala yang sangat terjangkau bagi operasional sekolah."
    )

    table_price = doc.add_table(rows=1, cols=4)
    table_price.alignment = WD_TABLE_ALIGNMENT.CENTER
    format_table_headers(table_price, ["Pilihan Skema Paket", "Investasi Setup & Maintenance", "Cakupan Layanan & Fasilitas Sistem", "Nilai Strategis Bagi Sekolah"])

    pricing_options = [
        ("PAKET 1: WEBSITE PROFIL RESMI SEKOLAH (.sch.id)\n(Wajah Resmi Digital Sekolah)",
         "• Biaya Tahun Pertama: Rp 4.000.000 (1x di awal)\n• Perpanjangan Tahun ke-2 dst: Rp 1.000.000 / tahun",
         "• Desain Website Resmi Standar Portal Maju (seperti SMAN 1 Raha)\n• Domain Resmi Sekolah (.sch.id) & Cloud Hosting 1 Tahun\n• Profil, Visi-Misi, & Sambutan Resmi Kepala Sekolah\n• Modul Informasi PPDB Online (Penerimaan Siswa Baru)\n• Galeri Dokumentasi Kegiatan, Prestasi Siswa & Ekstrakurikuler\n• Sarana & Prasarana Sekolah, Kabar Berita, & Google Maps\n• Tombol Integrasi Satu Pintu ke Portal SIAKAD Sekolah\n• Pendampingan Penuh Input Data Awal Sekolah sampai Online Rapi",
         "Solusi terbaik bagi sekolah yang ingin membangun citra resmi dan terpercaya di internet, menyukseskan rekrutmen PPDB online, serta memenuhi instrumen keterbukaan informasi akreditasi dinas."),

        ("PAKET 2: SISTEM INFORMASI AKADEMIK (SIAKAD)\n(Fokus Operasional Guru & Kelas - s.d 200 Siswa)",
         "• Biaya Tahun Pertama: Rp 3.500.000 (1x di awal)\n• Perpanjangan Tahun ke-2 dst: Rp 1.000.000 / tahun",
         "• Database Induk Siswa (NISN/Dapodik) & Dewan Guru\n• Presensi Siswa Harian Digital via HP (30 Detik per Kelas)\n• Tombol Pengingat WhatsApp Resmi ke Wali Murid (1-Klik)\n• Buku Nilai Terpadu Formatif, Sumatif, PTS, dan PAS\n• Cetak Otomatis Dokumen E-Rapor Kurikulum Merdeka Format A4 Resmi\n• Modul Bimbingan Konseling (BK) & Poin Sanksi Siswa\n• Pelatihan & Pendampingan Dewan Guru sampai Lancar Menggunakan",
         "Sangat ideal untuk sekolah di daerah. Membebaskan dewan guru dan wali kelas dari lembur manual rumus Excel saat pembagian rapor dengan biaya yang sangat terjangkau bagi kas sekolah."),

        ("PAKET 3: BUNDLING LENGKAP SEKOLAH DIGITAL\n(REKOMENDASI UTAMA – Website Profil + SIAKAD Penuh)",
         "• Paket Lengkap Tahun Pertama: Rp 7.000.000 (Hemat Rp 500.000)\n• Perpanjangan Tahun ke-2 dst: Rp 1.500.000 – Rp 2.000.000 / tahun\n(Dapat dianggarkan rutin dari Dana BOS)",
         "• Seluruh Fasilitas Paket 1 (Website Profil Resmi .sch.id Lengkap)\n• Seluruh Fasilitas Paket 2 (SIAKAD Guru & E-Rapor Kurikulum Merdeka)\n• Mesin Ujian Online CBT Mandiri (Acak Soal, Anti-Contek, Nilai Instan)\n• Modul Smart Finance SPP: Penerbitan Tagihan Massal Sekali Klik\n• Portal Wali Murid Real-Time di Ponsel & Notifikasi Kehadiran Anak\n• Smart Hybrid Video Meeting (Zoom/Meet 1-Klik Tanpa Beban Server)\n• Aplikasi Mobile PWA Super Ringan (< 3MB di Semua Smartphone)\n• Layanan Prioritas Bantuan Teknis dan Pembaruan Sistem",
         "Paket investasi paling cerdas dan menyeluruh. Sekolah langsung memiliki ekosistem digital luar-dalam yang meningkatkan nilai akreditasi, menaikkan gengsi sekolah, dan menghemat biaya kertas puluhan juta rupiah."),

        ("PAKET 4: ENTERPRISE YAYASAN BESAR\n(Kapasitas 400 - 1.200 Siswa / Multi-Unit)",
         "• Biaya Tahun Pertama: Rp 15.000.000 (1x di awal)\n• Maintenance & Cloud SLA: Rp 3.500.000 / tahun\n(atau Rp 875.000 / triwulan)",
         "• Seluruh Fasilitas Paket 3 Tanpa Batasan Pengguna\n• Dedicated High-Performance Cloud Server untuk CBT Massal Serentak\n• Manajemen Multi-Jenjang Unit Pendidikan (SD, SMP, SMA/SMK)\n• Kustomisasi Khusus Kurikulum dan Muatan Lokal Yayasan\n• Pendampingan Khusus Tim Teknis saat Pelaksanaan Ujian & Bagi Rapor\n• Backup Harian Terenkripsi (Disaster Recovery Guarantee)",
         "Pilihan utama bagi yayasan besar, sekolah swasta favorit, dan pesantren modern yang membutuhkan kapasitas komputasi tinggi dan keleluasaan pengelolaan multi-unit.")
    ]

    for p_name, p_cost, p_feat, p_rec in pricing_options:
        row = table_price.add_row()
        cells = row.cells
        cells[0].text = p_name
        cells[1].text = p_cost
        cells[2].text = p_feat
        cells[3].text = p_rec

        for idx, c in enumerate(cells):
            set_cell_margins(c, top=100, bottom=100, left=120, right=120)
            if idx == 0:
                if "Rekomendasi Utama" in p_name:
                    set_cell_background(c, "FEF3C7")  # Amber highlight
                else:
                    set_cell_background(c, "F1F5F9")
            elif idx == 1:
                set_cell_background(c, "EFF6FF")

            for p in c.paragraphs:
                for r in p.runs:
                    r.font.size = Pt(8.5)
                    if idx in [0, 1]:
                        r.font.bold = True

    add_heading_with_spacing(doc, "9.1. Fleksibilitas Termin Pembayaran: Mengikuti Siklus Pencairan Dana BOS", level=2, space_before=14, space_after=6, color=COLOR_SECONDARY)

    doc.add_paragraph(
        "Untuk memudahkan tata kelola administrasi bendahara sekolah, sistem pembayaran biaya pemeliharaan (maintenance) tidak harus dibayarkan setiap 30 hari, melainkan dapat dibayarkan per Triwulan (3 bulan sekali) atau per Semester (6 bulan sekali) mengikuti jadwal pencairan resmi Dana Bantuan Operasional Sekolah (BOS) atau termin penerimaan SPP yayasan."
    )

    add_heading_with_spacing(doc, "9.2. Apa Saja yang Didapat Sekolah dari Biaya Maintenance Berkala?", level=2, space_before=12, space_after=6, color=COLOR_SECONDARY)
    
    maint_items = [
        ("Cloud Infrastructure 24/7 & Uptime 99.8%: ", "Sekolah tidak perlu membeli komputer server fisik yang bising, menyewa IP statis, atau membayar listrik cadangan (UPS). Seluruh sistem aktif di awan dan dapat diakses 24 jam nonstop."),
        ("Pencadangan Data Otomatis (Automatic Weekly Backup): ", "Seluruh basis data nilai, absensi, dan transaksi SPP dicadangkan secara berkala ke lokasi server terpisah. Data sekolah terjamin aman 100% dari risiko virus, kerusakan hardware, maupun ancaman ransomware."),
        ("Dukungan Teknis Prioritas (Dedicated Helpdesk via WhatsApp): ", "Tim teknis kami siap mendampingi operator TU, bendahara, maupun guru yang mengalami kesulitan teknis atau lupa alur kerja sistem pada setiap hari kerja."),
        ("Pembaruan Sistem & Regulasi Kurikulum Gratis: ", "Apabila terdapat perubahan format rapor atau peraturan kurikulum baru dari Kemendikbudristek, pembaruan fitur (system update) diberikan secara cuma-cuma tanpa tagihan proyek baru."),
        ("Pemeliharaan Integrasi Rapat Virtual: ", "Memastikan seluruh tautan rapat Zoom dan Google Meet pada portal siswa dan orang tua selalu tersinkronisasi dengan lancar.")
    ]

    for m_title, m_desc in maint_items:
        p = doc.add_paragraph(style='List Bullet')
        p.paragraph_format.space_before = Pt(3)
        p.paragraph_format.space_after = Pt(3)
        r1 = p.add_run(m_title)
        r1.font.bold = True
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = COLOR_PRIMARY
        r2 = p.add_run(m_desc)
        r2.font.size = Pt(9.5)

    add_heading_with_spacing(doc, "9.3. Kesesuaian Alokasi Pembiayaan dengan Petunjuk Teknis Dana BOS", level=2, space_before=12, space_after=6, color=COLOR_SECONDARY)

    doc.add_paragraph(
        "Bagi sekolah penerima Dana Bantuan Operasional Sekolah (BOS Reguler / Kinerja), biaya pemeliharaan berkala sistem Cendekia merupakan belanja operasional yang 100% SAH dan LEGAL sesuai dengan Peraturan Menteri Pendidikan, Kebudayaan, Riset, dan Teknologi (Permendikbudristek) tentang Petunjuk Teknis Pengelolaan Dana BOS, yaitu pada komponen:"
    )

    bos_points = [
        ("Komponen Pengembangan Perpustakaan dan Layanan Pembelajaran Digital: ", "Pengadaan modul ajar digital, perpustakaan materi, dan platform asesmen CBT."),
        ("Komponen Pelaksanaan Asesmen dan Evaluasi Pembelajaran: ", "Penyelenggaraan ujian tengah/akhir semester berbasis komputer secara mandiri."),
        ("Komponen Administrasi Kegiatan Sekolah & Pembiayaan Langganan Daya dan Jasa: ", "Pembiayaan langganan aplikasi manajemen sekolah berbasis cloud dan sewa perangkat lunak operasional tata usaha.")
    ]

    for b_title, b_desc in bos_points:
        p = doc.add_paragraph(style='List Bullet')
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(2)
        r1 = p.add_run(b_title)
        r1.font.bold = True
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = COLOR_ACCENT
        r2 = p.add_run(b_desc)
        r2.font.size = Pt(9.5)

    doc.add_page_break()

    # =========================================================================
    # 10. TAHAPAN IMPLEMENTASI, TRAINING & GARANSI
    # =========================================================================
    add_heading_with_spacing(doc, "10. TAHAPAN IMPLEMENTASI, TRAINING & GARANSI LAYANAN", level=1, color=COLOR_PRIMARY)

    doc.add_paragraph(
        "Kami memahami bahwa keberhasilan digitalisasi sekolah bukan hanya soal teknologi, tetapi tentang pendampingan sumber daya manusia (guru dan staf). Oleh karena itu, kami menyediakan roadmap implementasi 4 minggu terstruktur:"
    )

    roadmap = [
        ("Minggu ke-1: Instalasi & Migrasi Data Induk: ", "Setup server, import data Dapodik/Excel lama (data guru, siswa, kelas, mata pelajaran) sehingga sekolah tidak perlu menginput ulang dari awal."),
        ("Minggu ke-2: Konfigurasi Akademik & Tarif SPP: ", "Penetapan jadwal pelajaran mingguan, kriteria kelulusan/bobot nilai, plotting wali kelas, dan konfigurasi master tarif SPP."),
        ("Minggu ke-3: Bimbingan Teknis & Pelatihan Pengguna (Workshop): ", "Pelatihan langsung bagi Administrator TU, Dewan Guru, dan Wali Kelas hingga mahir menggunakan sistem. Disertai buku panduan PDF dan video tutorial."),
        ("Minggu ke-4: Distribusi Akun & Go-Live Nasional: ", "Pemberian kartu login kepada siswa dan orang tua murid, sistem resmi beroperasi 100% menggantikan sistem manual.")
    ]

    for rm_step, rm_desc in roadmap:
        p = doc.add_paragraph(style='List Bullet')
        p.paragraph_format.space_before = Pt(4)
        p.paragraph_format.space_after = Pt(4)
        r1 = p.add_run(rm_step)
        r1.font.bold = True
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = COLOR_ACCENT
        r2 = p.add_run(rm_desc)
        r2.font.size = Pt(9.5)

    doc.add_paragraph(
        "Garansi Layanan: Kami memberikan jaminan perbaikan bug (Bug-Free Guarantee), ketersediaan server 99.8% (Uptime SLA), serta layanan konsultasi tim teknis setiap hari kerja."
    )

    # =========================================================================
    # 11. PENUTUP & LEMBAR PERSETUJUAN
    # =========================================================================
    add_heading_with_spacing(doc, "11. PENUTUP & LEMBAR KESEPAKATAN KERJA SAMA", level=1, color=COLOR_PRIMARY)

    doc.add_paragraph(
        "Besar harapan kami agar CENDEKIA dapat menjadi mitra terpercaya bagi sekolah Bapak/Ibu dalam mewujudkan tata kelola institusi pendidikan yang modern, transparan, dan berdaya saing tinggi. Kesiapan sekolah dalam bertransformasi digital hari ini adalah penentu masa depan dan daya tarik sekolah bagi calon siswa baru di tahun ajaran mendatang."
    )

    doc.add_paragraph(
        "Kami mengundang Bapak/Ibu Kepala Sekolah dan Tim Manajemen untuk mengadakan Sesi Presentasi & Demonstrasi Langsung (Live Demo) baik secara daring (Zoom) maupun tatap muka langsung di sekolah pada waktu yang disepakati."
    )

    p_space = doc.add_paragraph()
    p_space.paragraph_format.space_before = Pt(20)

    # Lembar Tanda Tangan Resmi
    table_sig = doc.add_table(rows=1, cols=2)
    table_sig.alignment = WD_TABLE_ALIGNMENT.CENTER
    c_left, c_right = table_sig.rows[0].cells

    c_left.text = "Diajukan Oleh,\nTim Pengembang Sistem CENDEKIA\nEduTech Nusantara\n\n\n\n\n___________________________________\nNama: Tim Konsultan Edukasi\nKontak: +62 812-XXXX-XXXX\nEmail: kemitraan@cendekia.sch.id"
    c_right.text = "Disetujui Oleh,\nPihak Manajemen Sekolah / Yayasan\n\n\n\n\n\n___________________________________\nNama: _____________________________\nJabatan: Kepala Sekolah / Pimpinan Yayasan\nTanggal: __________________________"

    for cell in [c_left, c_right]:
        set_cell_margins(cell, top=100, bottom=100, left=140, right=140)
        for p in cell.paragraphs:
            for r in p.runs:
                r.font.size = Pt(9.5)
                r.font.color.rgb = COLOR_PRIMARY

    output_path = "d:\\project\\school\\PROPOSAL_PENAWARAN_SISTEM_SEKOLAH_CENDEKIA.docx"
    doc.save(output_path)
    print(f"[OK] Full Proposal successfully generated at: {output_path}")

    # Copy to Desktop
    desktop_path = "C:\\Users\\nadia\\OneDrive\\Desktop\\PROPOSAL_PENAWARAN_SISTEM_SEKOLAH_CENDEKIA.docx"
    try:
        import shutil
        shutil.copyfile(output_path, desktop_path)
        print(f"[OK] Proposal copied to Desktop: {desktop_path}")
    except Exception as e:
        print(f"[WARN] Failed copying to desktop: {e}")

if __name__ == "__main__":
    build_comprehensive_proposal()
