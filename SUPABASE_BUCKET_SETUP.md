# Supabase Storage Bucket Setup for Vehicle Images

## Required: Create the `vehicle-images` Bucket

Your admin panel now uploads vehicle images to a Supabase storage bucket. You need to create and configure this bucket.

### Step-by-Step Setup

#### 1. Create the Bucket in Supabase Dashboard

1. Go to [Supabase Dashboard](https://supabase.com)
2. Select your AutoSharm project
3. Navigate to **Storage** (left sidebar)
4. Click **Create a new bucket**
5. Enter bucket name: `vehicle-images`
6. **Important:** Check ✅ "Public bucket" (to allow public URL access)
7. Click **Create bucket**

#### 2. Set Bucket Policies (RLS)

After creating the bucket, configure access policies:

1. Select the `vehicle-images` bucket
2. Go to the **Policies** tab
3. Click **New Policy** and select **For SELECT**
4. Set policy to: Public reads (anon users can view images)
   - Name: `Enable public read access`
   - Allowed for: anon/authenticated roles
   - Check: `SELECT`

5. Click **New Policy** and select **For INSERT**
6. Set policy for image uploads:
   - Name: `Enable authenticated uploads`
   - Allowed for: authenticated role
   - Check: `INSERT`

7. Click **New Policy** and select **For DELETE**
8. Set policy for deletion:
   - Name: `Enable authenticated delete`
   - Allowed for: authenticated role
   - Check: `DELETE`

#### 3. Quick Policy SQL (Alternative)

If you prefer to use SQL directly, paste this in the SQL Editor:

```sql
-- Enable public read access
CREATE POLICY "Enable public read access" ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'vehicle-images');

-- Enable authenticated uploads
CREATE POLICY "Enable authenticated uploads" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'vehicle-images');

-- Enable authenticated delete
CREATE POLICY "Enable authenticated delete" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'vehicle-images');
```

---

## How It Works in the Code

When you add a vehicle with images:

1. **Upload**: Image file → Supabase `vehicle-images` bucket
2. **Get URL**: `supabase.storage.from("vehicle-images").getPublicUrl(fileName)`
3. **Store URL**: Public URL saved to `vehicles.images` array in database
4. **Display**: `<img src={publicUrl}>` renders the image

---

## Testing the Setup

1. Go to `/admin` and log in
2. Click **Add Vehicle**
3. Upload a photo
4. You should see: ✅ "Image uploaded: https://..."
5. Submit the form
6. The vehicle should appear in the catalog with the photo

---

## Troubleshooting

### Error: "Bucket does not exist"
- ✅ Create the bucket following Step 1 above

### Error: "Permission denied" or "Unauthorized"
- ✅ Check bucket is marked "Public bucket"
- ✅ Verify RLS policies are set correctly
- ✅ Try the SQL policy script above

### Images upload but don't appear
- ✅ Check the public URL in browser console
- ✅ Make sure bucket RLS allows SELECT for "public" role

### Dynamic Image URLs
The code generates unique filenames:
```typescript
// Example: 1704067200000-a7f3k2-photo.jpg
const fileName = `${Date.now()}-${randomId}-${file.name}`;
```

This prevents image overwriting when multiple users upload.

---

## Architecture Summary

```
Admin Form (app/admin/page.tsx)
    ↓
    SelectFile (FileInput)
    ↓
    handleImageUpload()
    ↓
    Supabase Storage Upload (vehicle-images bucket)
    ↓
    getPublicUrl() → Returns https://...
    ↓
    Store in images[] array
    ↓
    form.submit() → Save images[] to vehicles.images
    ↓
    Display in <Image component> → Public sees photos
```

---

## File References

- **Upload handler**: [app/admin/page.tsx](app/admin/page.tsx#L589) (handleImageUpload)
- **Supabase client**: [lib/supabase.ts](lib/supabase.ts)
- **Vehicle schema**: [SQL_SCHEMA.sql](SQL_SCHEMA.sql) (images TEXT[] column)

---

## Why This Matters

✅ Prevents base64 bloat (images as URLs instead of encoded strings)
✅ Enables image processing & optimization
✅ Allows CDN caching for fast delivery
✅ Scales to thousands of vehicles without database bloat

