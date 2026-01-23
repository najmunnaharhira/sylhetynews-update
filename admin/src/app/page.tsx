import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "48px", textAlign: "center" }}>
      <h1>Admin Panel</h1>
      <p style={{ color: "#64748b" }}>Go to the admin login page.</p>
      <Link
        href="/admin/login"
        style={{
          display: "inline-block",
          marginTop: "16px",
          padding: "10px 18px",
          background: "#4f46e5",
          color: "#fff",
          borderRadius: "8px",
        }}
      >
        Open Admin Login
      </Link>
    </main>
  );
}
