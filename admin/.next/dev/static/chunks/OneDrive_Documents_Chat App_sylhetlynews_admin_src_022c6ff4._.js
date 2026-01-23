(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/lib/firebase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth,
    "db",
    ()=>db,
    "storage",
    ()=>storage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/node_modules/firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/node_modules/@firebase/app/dist/esm/index.esm2017.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/node_modules/@firebase/auth/dist/esm2017/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/node_modules/@firebase/firestore/dist/index.esm2017.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$firebase$2f$storage$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/node_modules/firebase/storage/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/node_modules/@firebase/storage/dist/index.esm2017.js [app-client] (ecmascript)");
;
;
;
;
const firebaseConfig = {
    apiKey: ("TURBOPACK compile-time value", "AIzaSyAANJPMvjERlt8WtDAU4pdP5e6xrmWIHWY") || "",
    authDomain: ("TURBOPACK compile-time value", "sylhetly-news.firebaseapp.com") || "",
    projectId: ("TURBOPACK compile-time value", "sylhetly-news") || "",
    storageBucket: ("TURBOPACK compile-time value", "sylhetly-news.firebasestorage.app") || "",
    messagingSenderId: ("TURBOPACK compile-time value", "237118055873") || "",
    appId: ("TURBOPACK compile-time value", "1:237118055873:web:ef0dc6ef896d2e7b7cfb40") || "",
    measurementId: ("TURBOPACK compile-time value", "G-K0W44WGXKC") || ""
};
const app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApps"])().length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApps"])()[0] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initializeApp"])(firebaseConfig);
const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuth"])(app);
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFirestore"])(app);
const storage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStorage"])(app);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$firebase$2f$storage$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/node_modules/firebase/storage/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/node_modules/@firebase/storage/dist/index.esm2017.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/lib/firebase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
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
    const [imageFile, setImageFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
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
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "news"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("createdAt", "desc")));
        const items = snapshot.docs.map((docRef)=>({
                id: docRef.id,
                ...docRef.data()
            }));
        setNews(items);
    };
    const loadCategories = async ()=>{
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "categories"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])("name", "asc")));
        const items = snapshot.docs.map((docRef)=>({
                id: docRef.id,
                ...docRef.data()
            }));
        setCategories(items);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboardPage.useEffect": ()=>{
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"].currentUser) {
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
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signOut"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"]);
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
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "news"), {
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
            setImageFile(null);
            await loadNews();
        } catch (err) {
            setError(err?.message || "Failed to create news.");
        } finally{
            setLoading(false);
        }
    };
    const handleDeleteNews = async (id)=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "news", id));
        await loadNews();
    };
    const handleCreateCategory = async ()=>{
        setError("");
        if (!categoryName.trim()) {
            setError("Category name is required.");
            return;
        }
        const slug = categoryName.trim().toLowerCase().replace(/\s+/g, "-");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "categories"), {
            name: categoryName.trim(),
            slug,
            createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
        setCategoryName("");
        await loadCategories();
    };
    const handleDeleteCategory = async (id)=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], "categories", id));
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
    const handleUploadImage = async ()=>{
        if (!imageFile) {
            setError("Please choose an image to upload.");
            return;
        }
        setError("");
        setUploading(true);
        try {
            const safeName = imageFile.name.replace(/\s+/g, "-");
            const storageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"], `news/${Date.now()}-${safeName}`);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadBytes"])(storageRef, imageFile);
            const url = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDownloadURL"])(storageRef);
            setImageUrl(url);
        } catch (err) {
            setError(err?.message || "Failed to upload image.");
        } finally{
            setUploading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "dashboard-page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "dashboard-header",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "dashboard-shell",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "dashboard-brand",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/sylhety-logo.jpeg",
                                    alt: "Sylhety News",
                                    className: "dashboard-logo"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                    lineNumber: 197,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "dashboard-title",
                                            children: "Admin Dashboard"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                            lineNumber: 203,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "dashboard-subtitle",
                                            children: "Manage news, media, and categories"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                            lineNumber: 204,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                    lineNumber: 202,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                            lineNumber: 196,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleLogout,
                            className: "dashboard-logout",
                            children: "Logout"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                            lineNumber: 209,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                    lineNumber: 195,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                lineNumber: 194,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "dashboard-main",
                children: [
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "dashboard-alert",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                        lineNumber: 216,
                        columnNumber: 19
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "dashboard-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "dashboard-card-title",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: "Create News"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 221,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Publish breaking updates and daily headlines."
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 222,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 220,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "dashboard-chip",
                                        children: "Live"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 224,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                lineNumber: 219,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleCreateNews,
                                className: "dashboard-form",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "dashboard-grid",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "dashboard-input",
                                                placeholder: "Title",
                                                value: title,
                                                onChange: (event)=>setTitle(event.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 228,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "dashboard-input",
                                                placeholder: "Summary",
                                                value: summary,
                                                onChange: (event)=>setSummary(event.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 234,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 227,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        className: "dashboard-textarea",
                                        placeholder: "Content",
                                        value: content,
                                        onChange: (event)=>setContent(event.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 241,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "dashboard-input",
                                        value: category,
                                        onChange: (event)=>setCategory(event.target.value),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Select category"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 252,
                                                columnNumber: 15
                                            }, this),
                                            categoryOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: option.value,
                                                    children: option.label
                                                }, option.value, false, {
                                                    fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                    lineNumber: 254,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 247,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "dashboard-media",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "dashboard-media-field",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "dashboard-input",
                                                        placeholder: "Image URL (optional)",
                                                        value: imageUrl,
                                                        onChange: (event)=>setImageUrl(event.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                        lineNumber: 261,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "dashboard-links",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: handleConvertDrive,
                                                                className: "dashboard-link drive",
                                                                children: "Convert Google Drive link"
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                                lineNumber: 268,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: "https://postimages.org/",
                                                                target: "_blank",
                                                                rel: "noreferrer",
                                                                className: "dashboard-link postimages",
                                                                children: "Get URL from Postimages"
                                                            }, void 0, false, {
                                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                                lineNumber: 275,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                        lineNumber: 267,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 260,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "dashboard-upload",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "file",
                                                        accept: "image/*",
                                                        onChange: (event)=>setImageFile(event.target.files?.[0] || null),
                                                        className: "dashboard-file"
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                        lineNumber: 286,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: handleUploadImage,
                                                        disabled: uploading,
                                                        className: "dashboard-button secondary",
                                                        children: uploading ? "Uploading..." : "Upload Media"
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                        lineNumber: 294,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 285,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 259,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: loading,
                                        className: "dashboard-button primary",
                                        children: loading ? "Saving..." : "Publish"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 304,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                lineNumber: 226,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "dashboard-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "dashboard-card-title",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: "Latest News"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 317,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Review recently published items."
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 318,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 316,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "dashboard-chip muted",
                                        children: [
                                            news.length,
                                            " items"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 320,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                lineNumber: 315,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "dashboard-list",
                                children: news.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "dashboard-empty",
                                    children: "No news yet."
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                    lineNumber: 324,
                                    columnNumber: 15
                                }, this) : news.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "dashboard-list-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "dashboard-list-title",
                                                        children: item.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                        lineNumber: 329,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "dashboard-list-subtitle",
                                                        children: item.category
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                        lineNumber: 330,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 328,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleDeleteNews(item.id),
                                                className: "dashboard-delete",
                                                children: "Delete"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 332,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 327,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                lineNumber: 322,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                        lineNumber: 314,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "dashboard-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "dashboard-card-title",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: "Categories"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 347,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Manage homepage sections."
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 348,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 346,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "dashboard-chip muted",
                                        children: [
                                            categories.length,
                                            " total"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 350,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                lineNumber: 345,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "dashboard-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "dashboard-input",
                                        placeholder: "Category name",
                                        value: categoryName,
                                        onChange: (event)=>setCategoryName(event.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 353,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleCreateCategory,
                                        className: "dashboard-button secondary",
                                        children: "Add"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 359,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                lineNumber: 352,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "dashboard-list compact",
                                children: categories.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "dashboard-empty",
                                    children: "No categories yet."
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                    lineNumber: 369,
                                    columnNumber: 15
                                }, this) : categories.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "dashboard-list-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "dashboard-list-title",
                                                        children: item.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                        lineNumber: 374,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "dashboard-list-subtitle",
                                                        children: item.slug
                                                    }, void 0, false, {
                                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                        lineNumber: 375,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 373,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleDeleteCategory(item.id),
                                                className: "dashboard-delete",
                                                children: "Delete"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                                lineNumber: 377,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                        lineNumber: 372,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                                lineNumber: 367,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                        lineNumber: 344,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
                lineNumber: 215,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/dashboard/page.tsx",
        lineNumber: 193,
        columnNumber: 5
    }, this);
}
_s(AdminDashboardPage, "dUDWHkkSsh5jjj6gSJw96vKbXPI=", false, function() {
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

//# sourceMappingURL=OneDrive_Documents_Chat%20App_sylhetlynews_admin_src_022c6ff4._.js.map