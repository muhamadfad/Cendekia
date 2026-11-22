import os
import time
from playwright.sync_api import sync_playwright

def capture_screenshots():
    os.makedirs("proposal_images", exist_ok=True)
    
    pages_to_capture = [
        {"name": "01_dashboard_admin.png", "url": "http://localhost:3000/admin", "width": 1366, "height": 820},
        {"name": "02_finance_spp.png", "url": "http://localhost:3000/admin/finance", "width": 1366, "height": 820},
        {"name": "03_absensi_guru.png", "url": "http://localhost:3000/guru/absensi", "width": 1366, "height": 820},
        {"name": "04_buku_nilai.png", "url": "http://localhost:3000/guru/nilai", "width": 1366, "height": 820},
        {"name": "05_cbt_exam.png", "url": "http://localhost:3000/siswa/tugas", "width": 1366, "height": 820},
        {"name": "06_e_rapor.png", "url": "http://localhost:3000/siswa/rapor", "width": 1366, "height": 900},
        {"name": "07_portal_orangtua.png", "url": "http://localhost:3000/orangtua", "width": 1366, "height": 820},
        {"name": "08_mobile_parent.png", "url": "http://localhost:3000/orangtua", "width": 412, "height": 892, "is_mobile": True},
        {"name": "09_mobile_student.png", "url": "http://localhost:3000/siswa", "width": 412, "height": 892, "is_mobile": True},
    ]

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        for item in pages_to_capture:
            is_mobile = item.get("is_mobile", False)
            context = browser.new_context(
                viewport={"width": item["width"], "height": item["height"]},
                device_scale_factor=2, # Retina crisp
                is_mobile=is_mobile,
                has_touch=is_mobile
            )
            page = context.new_page()
            try:
                print(f"Capturing {item['url']} -> {item['name']}...")
                page.goto(item["url"], wait_until="networkidle", timeout=25000)
                time.sleep(1) # Wait for animations and fonts
                out_path = os.path.join("proposal_images", item["name"])
                page.screenshot(path=out_path)
                print(f"Saved: {out_path}")
            except Exception as e:
                print(f"Failed to capture {item['url']}: {e}")
            finally:
                context.close()
        browser.close()

if __name__ == "__main__":
    capture_screenshots()
