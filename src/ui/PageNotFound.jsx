import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }

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
        <h1 style={{ marginBottom: "1.5rem" }}>
          The page you are looking for could not be found 😢
        </h1>

        <button
          onClick={handleGoBack}
          style={{
            padding: "0.6rem 1.2rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#4f46e5",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          ← Go back
        </button>
      </div>
    </main>
  );
}

export default PageNotFound;
