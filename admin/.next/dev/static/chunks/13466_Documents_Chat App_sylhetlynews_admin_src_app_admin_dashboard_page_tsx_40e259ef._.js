(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminDashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/node_modules/@firebase/firestore/dist/index.esm2017.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/node_modules/@firebase/auth/dist/esm2017/index.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/lib/firebase'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const getDriveDirectLink = (url)=>{
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([^&]+)/);
    if (!match) return "";
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
};
function AdminDashboardPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [news, setNews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [summary, setSummary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [imageUrl, setImageUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [categoryName, setCategoryName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const categoryOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminDashboardPage.useMemo[categoryOptions]": ()=>categories.map({
                "AdminDashboardPage.useMemo[categoryOptions]": (item)=>({
                        value: item.slug,
                        label: item.name
                    })
            }["AdminDashboardPage.useMemo[categoryOptions]"])
    }["AdminDashboardPage.useMemo[categoryOptions]"], [
        categories
    ]);
    const loadNews = async ()=>{
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "news"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("createdAt", "desc")));
        const items = snapshot.docs.map((docRef)=>({
                id: docRef.id,
                ...docRef.data()
            }));
        setNews(items);
    };
    const loadCategories = async ()=>{
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "categories"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("name", "asc")));
        const items = snapshot.docs.map((docRef)=>({
                id: docRef.id,
                ...docRef.data()
            }));
        setCategories(items);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboardPage.useEffect": ()=>{
            if (!auth.currentUser) {
                router.push("/admin/login");
                return;
            }
            loadNews().catch({
                "AdminDashboardPage.useEffect": ()=>setError("Failed to load news.")
            }["AdminDashboardPage.useEffect"]);
            loadCategories().catch({
                "AdminDashboardPage.useEffect": ()=>setError("Failed to load categories.")
            }["AdminDashboardPage.useEffect"]);
        }
    }["AdminDashboardPage.useEffect"], [
        router
    ]);
    const handleLogout = async ()=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signOut"])(auth);
        router.push("/admin/login");
    };
    const handleCreateNews = async (event)=>{
        event.preventDefault();
        setError("");
        if (!title.trim() || !summary.trim() || !content.trim() || !category.trim()) {
            setError("Title, summary, content, and category are required.");
            return;
        }
        setLoading(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "news"), {
                title: title.trim(),
                summary: summary.trim(),
                content: content.trim(),
                category: category.trim(),
                imageUrl: imageUrl.trim(),
                published: true,
                createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
            });
            setTitle("");
            setSummary("");
            setContent("");
            setCategory("");
            setImageUrl("");
            await loadNews();
        } catch (err) {
            setError(err?.message || "Failed to create news.");
        } finally{
            setLoading(false);
        }
    };
    const handleDeleteNews = async (id)=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "news", id));
        await loadNews();
    };
    const handleCreateCategory = async ()=>{
        setError("");
        if (!categoryName.trim()) {
            setError("Category name is required.");
            return;
        }
        const slug = categoryName.trim().toLowerCase().replace(/\s+/g, "-");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(db, "categories"), {
            name: categoryName.trim(),
            slug,
            createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
        setCategoryName("");
        await loadCategories();
    };
    const handleDeleteCategory = async (id)=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(db, "categories", id));
        await loadCategories();
    };
    const handleConvertDrive = ()=>{
        if (!imageUrl.trim()) {
            setError("Paste a Google Drive link first.");
            return;
        }
        const converted = getDriveDirectLink(imageUrl.trim());
        if (!converted) {
            setError("That does not look like a Google Drive link.");
            return;
        }
        setError("");
        setImageUrl(converted);
        window.open("https://drive.google.com/", "_blank", "noopener,noreferrer");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "border-b bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto flex max-w-6xl items-center justify-between px-6 py-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-2xl font-semibold",
                                    children: "Admin Dashboard"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-500",
                                    children: "Manage news and categories"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                    lineNumber: 174,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                            lineNumber: 172,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleLogout,
                            className: "rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
                            children: "Logout"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                            lineNumber: 176,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                    lineNumber: 171,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "mx-auto max-w-6xl px-6 py-8 space-y-8",
                children: [
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                        lineNumber: 187,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-2xl bg-white p-6 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold",
                                children: "Create News"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                lineNumber: 193,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleCreateNews,
                                className: "mt-4 grid gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-indigo-500",
                                        placeholder: "Title",
                                        value: title,
                                        onChange: (event)=>setTitle(event.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 195,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-indigo-500",
                                        placeholder: "Summary",
                                        value: summary,
                                        onChange: (event)=>setSummary(event.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 201,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        className: "h-28 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-indigo-500",
                                        placeholder: "Content",
                                        value: content,
                                        onChange: (event)=>setContent(event.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 207,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-indigo-500",
                                        value: category,
                                        onChange: (event)=>setCategory(event.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Select category"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 218,
                                                columnNumber: 15
                                            }, this),
                                            categoryOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: option.value,
                                                    children: option.label
                                                }, option.value, false, {
                                                    fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                    lineNumber: 220,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 213,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-indigo-500",
                                                placeholder: "Image URL (optional)",
                                                value: imageUrl,
                                                onChange: (event)=>setImageUrl(event.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 226,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: handleConvertDrive,
                                                className: "w-fit text-sm text-orange-600 hover:text-orange-700",
                                                children: "Convert Google Drive link to direct URL"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 232,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "https://postimages.org/",
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "text-sm text-indigo-600 hover:text-indigo-700",
                                                children: "Upload image and get URL (Postimages)"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 239,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 225,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: loading,
                                        className: "rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60",
                                        children: loading ? "Saving..." : "Publish"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 248,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                lineNumber: 194,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-2xl bg-white p-6 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold",
                                children: "Latest News"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 space-y-3",
                                children: news.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-500",
                                    children: "No news yet."
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                    lineNumber: 262,
                                    columnNumber: 15
                                }, this) : news.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-medium text-gray-900",
                                                        children: item.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                        lineNumber: 270,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-500",
                                                        children: item.category
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                        lineNumber: 271,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 269,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleDeleteNews(item.id),
                                                className: "text-xs text-red-600 hover:text-red-700",
                                                children: "Delete"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 273,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 265,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                lineNumber: 260,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-2xl bg-white p-6 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold",
                                children: "Categories"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                lineNumber: 286,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 flex flex-col gap-3 sm:flex-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-indigo-500",
                                        placeholder: "Category name",
                                        value: categoryName,
                                        onChange: (event)=>setCategoryName(event.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 288,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleCreateCategory,
                                        className: "rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800",
                                        children: "Add"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 294,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                lineNumber: 287,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 space-y-2",
                                children: categories.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-500",
                                    children: "No categories yet."
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                    lineNumber: 304,
                                    columnNumber: 15
                                }, this) : categories.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between rounded-lg border border-gray-100 px-4 py-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-medium text-gray-900",
                                                        children: item.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                        lineNumber: 312,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-500",
                                                        children: item.slug
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                        lineNumber: 315,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 311,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleDeleteCategory(item.id),
                                                className: "text-xs text-red-600 hover:text-red-700",
                                                children: "Delete"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 317,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 307,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                lineNumber: 302,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                        lineNumber: 285,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
        lineNumber: 169,
        columnNumber: 5
    }, this);
}
_s(AdminDashboardPage, "rvm/NKVfXQhoBTl36KJUZ2NvMvU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AdminDashboardPage;
var _c;
__turbopack_context__.k.register(_c, "AdminDashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=13466_Documents_Chat%20App_sylhetlynews_admin_src_app_admin_dashboard_page_tsx_40e259ef._.js.map