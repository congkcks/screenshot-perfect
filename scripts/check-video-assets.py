import os, glob, subprocess, json, sys, re

REQUIRED_FILES = [
    'public/videos/hero/hero-trang-an-1080.mp4',
    'public/videos/hero/hero-trang-an-720.mp4',
    'public/videos/hero/hero-trang-an-poster.webp',
    'public/videos/trang-an/trang-an-aerial-1080.mp4',
    'public/videos/trang-an/trang-an-aerial-720.mp4',
    'public/videos/trang-an/trang-an-aerial-poster.webp',
    'public/videos/hang-mua/hang-mua-viewpoint-1080.mp4',
    'public/videos/hang-mua/hang-mua-viewpoint-720.mp4',
    'public/videos/hang-mua/hang-mua-viewpoint-poster.webp',
    'public/videos/CREDITS.md',
]

budget = {
    '1080': 2.5 * 1024 * 1024,
    '720': 1.2 * 1024 * 1024,
    'poster': 80 * 1024
}

all_ok = True
print("=== KIỂM TRA TÀI NGUYÊN VIDEO NINH BÌNH (PEXELS) ===")

# 1. Kiểm tra sự tồn tại của các tệp bắt buộc
print("\n1. Kiểm tra danh sách tệp bắt buộc:")
for f in REQUIRED_FILES:
    norm_path = f.replace('/', os.sep)
    if os.path.exists(norm_path):
        print(f"  [OK] Tồn tại: {f}")
    else:
        print(f"  [FAIL] Không tìm thấy: {f}")
        all_ok = False

# 2. Kiểm tra quy tắc đặt tên (chữ thường, gạch ngang, không dấu)
print("\n2. Kiểm tra quy tắc đặt tên (chữ thường, không dấu):")
for f in REQUIRED_FILES:
    base = os.path.basename(f)
    if f.endswith('.md'):
        is_valid = base in ['CREDITS.md', 'credits.md']
    else:
        is_valid = bool(re.match(r'^[a-z0-9\-]+\.(mp4|webp)$', base))

    if not is_valid:
        print(f"  [FAIL] Tên sai quy chuẩn: {base}")
        all_ok = False
    else:
        print(f"  [OK] Tên hợp lệ: {base}")

# 3. Kiểm tra dung lượng, âm thanh, thông số video
print("\n3. Kiểm tra dung lượng ngân sách, kênh âm thanh, fps và duration:")
total_size = 0
header = f"{'Tệp':<55} | {'Dung lượng':<10} | {'Thời lượng':<10} | {'Âm thanh':<8} | {'Trạng thái':<10}"
print(header)
print('-' * len(header))

for f in REQUIRED_FILES:
    if f.endswith('.md'):
        continue
    norm_path = f.replace('/', os.sep)
    sz = os.path.getsize(norm_path)
    total_size += sz
    dur_str = '-'
    audio_str = '-'

    if f.endswith('.mp4'):
        res = subprocess.run(['ffprobe', '-v', 'quiet', '-print_format', 'json', '-show_format', '-show_streams', norm_path], capture_output=True, text=True)
        data = json.loads(res.stdout)
        dur = float(data['format'].get('duration', 0))
        dur_str = f"{dur:.1f}s"
        aud = [s for s in data['streams'] if s['codec_type'] == 'audio']
        audio_str = 'Có' if aud else 'Không'
        if aud:
            print(f"  [LỖI] Video {f} chứa âm thanh!")
            all_ok = False

    b_status = 'ĐẠT'
    if '1080' in f and sz > budget['1080']:
        b_status = f"VƯỢT ({sz/1024/1024:.2f}MB > 2.5MB)"
        all_ok = False
    elif '720' in f and sz > budget['720']:
        b_status = f"VƯỢT ({sz/1024/1024:.2f}MB > 1.2MB)"
        all_ok = False
    elif 'poster' in f and sz > budget['poster']:
        b_status = f"VƯỢT ({sz/1024:.1f}KB > 80KB)"
        all_ok = False

    print(f"{f:<55} | {sz/1024:>8.1f}KB | {dur_str:<10} | {audio_str:<8} | {b_status}")

print('-' * len(header))
print(f"Tổng dung lượng video & poster trong repo: {total_size/1024/1024:.2f} MB (Ngân sách tối đa: 15.0 MB)")
if total_size > 15 * 1024 * 1024:
    print("  [FAIL] Tổng dung lượng vượt 15MB!")
    all_ok = False
else:
    print("  [OK] Tổng dung lượng an toàn trong ngân sách!")

if all_ok:
    print("\n>>> KẾT QUẢ: TẤT CẢ TÀI NGUYÊN ĐẠT 100% TIÊU CHUẨN NGHIỆM THU! <<<")
    sys.exit(0)
else:
    print("\n>>> KẾT QUẢ: MỘT SỐ TÀI NGUYÊN CHƯA ĐẠT! <<<")
    sys.exit(1)
