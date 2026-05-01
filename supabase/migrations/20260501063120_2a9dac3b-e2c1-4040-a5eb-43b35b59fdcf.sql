
-- Pin search_path on functions (function_search_path_mutable)
ALTER FUNCTION public.has_role(uuid, public.app_role) SET search_path = public;
ALTER FUNCTION public.handle_new_user() SET search_path = public;
ALTER FUNCTION public.touch_updated_at() SET search_path = public;
ALTER FUNCTION public.increment_article_views(text) SET search_path = public;

-- Lock down increment_article_views: revoke public, grant to anon+authenticated only (still callable from frontend)
REVOKE EXECUTE ON FUNCTION public.increment_article_views(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_article_views(text) TO anon, authenticated;
