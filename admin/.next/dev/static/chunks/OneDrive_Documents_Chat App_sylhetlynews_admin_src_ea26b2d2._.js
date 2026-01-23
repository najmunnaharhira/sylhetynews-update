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
"[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/login/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminLoginPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/node_modules/@firebase/auth/dist/esm2017/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/lib/firebase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const getAllowedEmails = ()=>{
    const value = ("TURBOPACK compile-time value", "admin@gmail.com") || "admin@gmail.com";
    return value.split(",").map((email)=>email.trim().toLowerCase()).filter(Boolean);
};
function AdminLoginPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [notice, setNotice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const handleSubmit = async (event)=>{
        event.preventDefault();
        setError("");
        setNotice("");
        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }
        setLoading(true);
        try {
            const credential = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signInWithEmailAndPassword"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"], email.trim(), password);
            const allowed = getAllowedEmails();
            const userEmail = credential.user.email?.toLowerCase() || "";
            if (!allowed.includes(userEmail)) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signOut"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"]);
                setError("This email is not authorized as admin.");
                return;
            }
            router.push("/admin/dashboard");
        } catch (err) {
            setError(err?.message || "Login failed.");
        } finally{
            setLoading(false);
        }
    };
    const handleForgotPassword = async ()=>{
        setError("");
        setNotice("");
        if (!email.trim()) {
            setError("Enter your email first to reset the password.");
            return;
        }
        setLoading(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendPasswordResetEmail"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"], email.trim());
            setNotice("Password reset email sent. Check your inbox.");
        } catch (err) {
            setError(err?.message || "Failed to send reset email.");
        } finally{
            setLoading(false);
        }
    };
    const handleCreateAccount = async ()=>{
        setError("");
        setNotice("");
        if (!email.trim() || !password) {
            setError("Enter email and password to create an account.");
            return;
        }
        setLoading(true);
        try {
            const credential = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createUserWithEmailAndPassword"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"], email.trim(), password);
            const allowed = getAllowedEmails();
            const userEmail = credential.user.email?.toLowerCase() || "";
            if (!allowed.includes(userEmail)) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signOut"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"]);
                setError("This email is not authorized as admin.");
                return;
            }
            setNotice("Account created. You can sign in now.");
        } catch (err) {
            setError(err?.message || "Account creation failed.");
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "auth-page",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "auth-card",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "auth-header",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/sylhety-logo.jpeg",
                            alt: "Sylhety News",
                            className: "auth-logo"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/login/page.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "auth-title-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "auth-title",
                                    children: "Sylhety News Admin"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/login/page.tsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "auth-subtitle",
                                    children: "Sign in to manage news and content"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/login/page.tsx",
                                    lineNumber: 124,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/login/page.tsx",
                            lineNumber: 122,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/login/page.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "auth-alert error",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/login/page.tsx",
                    lineNumber: 130,
                    columnNumber: 19
                }, this),
                notice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "auth-alert success",
                    children: notice
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/login/page.tsx",
                    lineNumber: 131,
                    columnNumber: 20
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "auth-form",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "auth-field",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "auth-label",
                                    children: "Email"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/login/page.tsx",
                                    lineNumber: 135,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "auth-input",
                                    type: "email",
                                    value: email,
                                    onChange: (event)=>setEmail(event.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/login/page.tsx",
                                    lineNumber: 136,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/login/page.tsx",
                            lineNumber: 134,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "auth-field",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "auth-label",
                                    children: "Password"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/login/page.tsx",
                                    lineNumber: 144,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "auth-password-field",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: "auth-input auth-password-input",
                                            type: showPassword ? "text" : "password",
                                            value: password,
                                            onChange: (event)=>setPassword(event.target.value),
                                            placeholder: "••••••••"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/login/page.tsx",
                                            lineNumber: 146,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setShowPassword((prev)=>!prev),
                                            className: "auth-eye-button",
                                            "aria-label": showPassword ? "Hide password" : "Show password",
                                            children: showPassword ? "Hide" : "Show"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/login/page.tsx",
                                            lineNumber: 153,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/login/page.tsx",
                                    lineNumber: 145,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/login/page.tsx",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "auth-actions",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "auth-hint",
                                    children: "Use your admin email to sign in."
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/login/page.tsx",
                                    lineNumber: 164,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: handleForgotPassword,
                                    className: "auth-link",
                                    children: "Forgot password?"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/login/page.tsx",
                                    lineNumber: 165,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/login/page.tsx",
                            lineNumber: 163,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: loading,
                            className: "auth-button primary",
                            children: loading ? "Signing in..." : "Sign In"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/login/page.tsx",
                            lineNumber: 173,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleCreateAccount,
                            disabled: loading,
                            className: "auth-button secondary",
                            children: "Create admin account"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/login/page.tsx",
                            lineNumber: 180,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/login/page.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/login/page.tsx",
            lineNumber: 115,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/OneDrive/Documents/Chat App/sylhetlynews/admin/src/app/admin/login/page.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_s(AdminLoginPage, "nQVKaodsPRZXHELceuix8+pxaDA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$Chat__App$2f$sylhetlynews$2f$admin$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AdminLoginPage;
var _c;
__turbopack_context__.k.register(_c, "AdminLoginPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=OneDrive_Documents_Chat%20App_sylhetlynews_admin_src_ea26b2d2._.js.map