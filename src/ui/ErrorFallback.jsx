function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <main
      style={{
        height: "100vh",
        backgroundColor: "var(--color-grey-50, #f9fafb)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          padding: "2rem",
          maxWidth: "480px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "1rem" }}>Something went wrong 🧐</h1>

        <p
          style={{
            marginBottom: "1.5rem",
            color: "#6b7280",
          }}
        >
          {error?.message || "Unexpected error occurred"}
        </p>

        <button
          onClick={resetErrorBoundary}
          style={{
            padding: "0.6rem 1.2rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#4f46e5",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </div>
    </main>
  );
}

export default ErrorFallback;
