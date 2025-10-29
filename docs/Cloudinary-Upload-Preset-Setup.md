# Cloudinary Upload Preset Setup

## 📋 **Setup Upload Preset untuk CldUploadWidget**

Untuk menggunakan CldUploadWidget, Anda perlu membuat upload preset di Cloudinary Dashboard.

### 🔧 **Langkah-langkah Setup:**

#### 1. **Login ke Cloudinary Dashboard**

1. Buka [cloudinary.com](https://cloudinary.com)
2. Login ke akun Anda
3. Masuk ke Dashboard

#### 2. **Buat Upload Preset**

1. Klik **Settings** (gear icon) di sidebar
2. Pilih **Upload** tab
3. Scroll ke **Upload Presets** section
4. Klik **Add upload preset**

#### 3. **Konfigurasi Upload Preset**

**Basic Settings:**

- **Preset name**: `system-sekolah`
- **Signing mode**: `Unsigned`
- **Use filename**: `false`
- **Unique filename**: `true`

**Folder & Delivery:**

- **Folder**: `system-sekolah/ekstrakurikuler`
- **Access mode**: `Public`
- **Resource type**: `Image`
- **Allowed formats**: `jpg,png,webp,gif`

**Upload Manipulations:**

- **Quality**: `auto:good`
- **Format**: `auto`
- **Width**: `800`
- **Height**: `600`
- **Crop mode**: `limit`

**Upload Control:**

- **Max file size**: `5000000` (5MB)
- **Max image width**: `2000`
- **Max image height**: `2000`

#### 4. **Advanced Settings (Optional)**

**Transformations:**

```json
[
  {
    "width": 800,
    "height": 600,
    "crop": "limit",
    "quality": "auto:good",
    "format": "auto"
  }
]
```

**Notification URL:**

- Leave empty for basic usage

**Tags:**

- `ekstrakurikuler`
- `system-sekolah`

### ⚙️ **Environment Variables**

Tambahkan ke file `.env.local`:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Cara mendapatkan credentials:**

1. Di Cloudinary Dashboard
2. Klik **Dashboard** di sidebar
3. Copy values dari **Account Details** section

### 🧪 **Testing Upload Preset**

Untuk test upload preset:

1. **Via Widget**: Upload gambar lewat CldUploadWidget
2. **Via Dashboard**: Test di Upload tab dengan preset
3. **Check Media Library**: Pastikan gambar masuk ke folder yang benar
4. **Check URL**: Pastikan transformasi diterapkan

### 📝 **Upload Preset JSON Configuration**

Jika ingin import konfigurasi via API:

```json
{
  "name": "system-sekolah",
  "unsigned": true,
  "folder": "system-sekolah/ekstrakurikuler",
  "allowed_formats": ["jpg", "png", "webp", "gif"],
  "transformation": [
    {
      "width": 800,
      "height": 600,
      "crop": "limit",
      "quality": "auto:good",
      "format": "auto"
    }
  ],
  "tags": ["ekstrakurikuler", "system-sekolah"],
  "max_file_size": 5000000,
  "max_image_width": 2000,
  "max_image_height": 2000
}
```

### 🔒 **Security Considerations**

**Unsigned Upload Presets:**

- ✅ Good for: Public uploads, user content
- ⚠️ Consider: Rate limiting, content moderation
- 🛡️ Protection: Folder restrictions, format limits

**Signed Upload (Alternative):**

- More secure but requires server-side signature
- Good for admin-only uploads
- Requires API secret on server

### 🚨 **Troubleshooting**

**Common Issues:**

1. **"Invalid upload preset"**

   - Check preset name spelling
   - Ensure preset is set to "Unsigned"
   - Verify CLOUD_NAME environment variable

2. **"File size exceeded"**

   - Check max_file_size setting
   - Reduce image size before upload
   - Increase limit in preset

3. **"Invalid file format"**

   - Check allowed_formats in preset
   - Ensure file extension is supported
   - Check MIME type validation

4. **"Folder access denied"**
   - Check folder path in preset
   - Ensure folder structure exists
   - Verify permissions

### 📊 **Monitoring & Analytics**

**Usage Statistics:**

- Monitor uploads via Cloudinary Dashboard
- Check bandwidth usage
- Review transformation costs
- Track storage usage

**Optimization:**

- Review most uploaded formats
- Analyze transformation performance
- Monitor CDN hit rates
- Check geographic usage

---

**Setup Time**: ~5 minutes  
**Difficulty**: Beginner  
**Required Access**: Cloudinary account with upload permissions

### ✅ **Verification Checklist**

- [ ] Upload preset created with name "system-sekolah"
- [ ] Signing mode set to "Unsigned"
- [ ] Folder set to "system-sekolah/ekstrakurikuler"
- [ ] File size limit set to 5MB
- [ ] Transformations configured (800x600, auto quality)
- [ ] Environment variables added to .env.local
- [ ] next.config.mjs updated with Cloudinary domains
- [ ] Test upload successful through widget
- [ ] Images appear in correct folder in Media Library

Once setup is complete, the CldUploadWidget will work seamlessly with your application! 🚀
