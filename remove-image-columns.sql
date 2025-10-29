-- SQL script to remove gambar columns from sejarah, filosofi, and struktur_organisasi tables
-- Run this script after updating the schema to clean up existing database

-- Remove gambar column from sejarah table
ALTER TABLE sejarah DROP COLUMN IF EXISTS gambar;

-- Remove gambar column from filosofi table
ALTER TABLE filosofi DROP COLUMN IF EXISTS gambar;

-- Remove gambar column from struktur_organisasi table
ALTER TABLE struktur_organisasi DROP COLUMN IF EXISTS gambar;

-- Optional: Add comments for documentation
COMMENT ON TABLE sejarah IS 'Table for storing school history content without image support';
COMMENT ON TABLE filosofi IS 'Table for storing school philosophy content without image support';
COMMENT ON TABLE struktur_organisasi IS 'Table for storing organizational structure with JSON data, no image support';

-- Verify the changes
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name IN ('sejarah', 'filosofi', 'struktur_organisasi')
ORDER BY table_name, ordinal_position;
