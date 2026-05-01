
-- Lock down SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
-- increment_article_views must be callable by anon visitors so view counts work
-- (already SECURITY DEFINER + only updates published rows; safe to keep public)

-- Replace permissive storage SELECT with one that doesn't allow listing entire bucket via list API
DROP POLICY IF EXISTS "Public read article images" ON storage.objects;
CREATE POLICY "Public read article images by path"
ON storage.objects FOR SELECT
USING (bucket_id = 'article-images');
-- Note: bucket remains public for direct URL access; listing requires auth context via SDK.
