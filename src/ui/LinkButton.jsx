import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
  const navigate = useNavigate();

  const style = {
    fontSize: "0.875rem",
    color: "#2563eb",
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    textDecoration: "none",
  };

  if (to === "-1") {
    return (
      <button
        style={style}
        onClick={() => navigate(-1)}
        onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
        onMouseOut={(e) => (e.target.style.textDecoration = "none")}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      to={to}
      style={style}
      onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
      onMouseOut={(e) => (e.target.style.textDecoration = "none")}
    >
      {children}
    </Link>
  );
}

export default LinkButton;
