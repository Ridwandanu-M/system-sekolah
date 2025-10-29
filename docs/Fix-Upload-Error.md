# Fix Upload Error - CldUploadWidget Troubleshooting

## 🚨 **Error Upload Image Fix**

Jika Anda mendapat error `Upload error: {}` saat mengupload gambar, ikuti langkah-langkah berikut:

### ✅ **Step 1: Check Environment Variables**

Pastikan environment variables sudah diset dengan benar di file `.env.local`:

```env
# .env.local
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name_here
```

**Cara mendapatkan Cloud Name:**

1. Login ke [Cloudinary Dashboard](https://cloudinary.com)
2. Di bagian **Account Details**, copy nilai **Cloud name**
3. Paste ke `.env.local` tanpa tanda kutip

### ✅ **Step 2: Setup Upload Preset**

#### Option A: Gunakan Default Preset (Recommended)

Cloudinary memiliki preset default `ml_default` yang sudah aktif. Kode sudah diupdate untuk menggunakan ini.

#### Option B: Buat Custom Preset

1. Login ke Cloudinary Dashboard
2. Settings → Upload → Upload presets
3. Add upload preset dengan konfigurasi:
   - **Preset name**: `system-sekolah`
   - **Signing mode**: `Unsigned`
   - **Folder**: `system-sekolah/ekstrakurikuler`

### ✅ **Step 3: Restart Development Server**

Setelah menambah environment variables:

```bash
# Stop server (Ctrl+C)
# Kemudian restart
npm run dev
```

### ✅ **Step 4: Check Console for Debugging**

Buka Developer Tools (F12) dan check console. Sekarang akan ada log:

- `"Button clicked, attempting to open widget"`
- `"Upload widget opened"`
- `"Cloud name: your_cloud_name"`
- Detailed error info jika masih error

### 🔧 **Common Issues & Solutions**

#### Issue 1: "Invalid cloud name"

```
Solution: Check NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME di .env.local
```

#### Issue 2: "Upload preset not found"

```
Solution: Gunakan "ml_default" atau buat preset baru
```

#### Issue 3: "Network error" / Empty error object

```
Solution:
1. Check internet connection
2. Check if Cloudinary account is active
3. Verify cloud name spelling
```

#### Issue 4: "File size too large"

```
Solution: Pilih gambar < 2MB atau update maxFileSize
```

### 🧪 **Testing Steps**

1. **Open browser console** (F12)
2. **Click upload button** → Should see "Button clicked..." log
3. **Widget should open** → Should see "Upload widget opened" log
4. **Try upload** → Check for detailed error messages

### 💡 **Simplified Configuration**

Kode telah diupdate dengan konfigurasi minimal:

- ✅ Upload preset: `ml_default` (default Cloudinary preset)
- ✅ Simplified options (no cropping, no advanced features)
- ✅ Better error handling with detailed logs
- ✅ Local files only (most reliable)

### 📋 **Environment Check List**

- [ ] File `.env.local` exists di root project
- [ ] `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` ada dan benar
- [ ] Cloud name tidak ada typo
- [ ] Development server sudah direstart
- [ ] Browser console terbuka untuk debugging

### 🔄 **Alternative Solution: Manual Upload**

Jika CldUploadWidget masih bermasalah, kita bisa kembali ke manual upload:

```javascript
// Fallback ke manual file upload
<input type="file" accept="image/*" onChange={handleManualUpload} />
```

### 📞 **Need Help?**

Jika masih error:

1. Share screenshot console error
2. Confirm cloud name di Cloudinary dashboard
3. Check apakah bisa upload manual di Cloudinary website

---

**Updated**: Kode telah dioptimasi dengan error handling yang lebih baik dan konfigurasi minimal untuk mengatasi masalah upload.
