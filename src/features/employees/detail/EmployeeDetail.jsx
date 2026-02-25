import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import buttonStyles from "../../../ui/Button.module.css";
import cardStyles from "../../../ui/Card.module.css";
import styles from "./EmployeeDetail.module.css";

import EmployeeDetailSkeleton from "./EmployeeDetailSkeleton";

import { useEmployee } from "./useEmployee";

function EmployeeDetail() {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [fileError, setFileError] = useState(null);
  const { data: employee, isLoading, isError } = useEmployee(employeeId);

  const fileInputRef = useRef(null);

  function handleCaptureClick() {
    fileInputRef.current.click();
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    setFileError(null);

    // --- TYPE VALIDATION ---
    if (!file.type.startsWith("image/")) {
      setFileError("Only image files are allowed.");
      event.target.value = null;
      return;
    }

    // --- SIZE VALIDATION (5MB) ---
    const MAX_SIZE = 5 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
      setFileError("Image must be smaller than 5MB.");
      event.target.value = null;
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      navigate("/photo-result", {
        state: {
          employeeId,
          image: reader.result,
        },
      });
    };

    reader.readAsDataURL(file);

    // Reset input so selecting same image again works
    event.target.value = null;
  }

  if (isLoading) return <EmployeeDetailSkeleton />;

  if (isError) return <p className={styles.error}>Failed to load employee.</p>;

  if (!employee) return <p>Employee not found</p>;

  return (
    <section className={styles.container}>
      <button
        className={`${buttonStyles.button} ${buttonStyles.secondary}`}
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <article className={`${cardStyles.card} ${styles.card}`}>
        <div className={styles.headerRow}>
          <h2>{employee.name}</h2>
          <span className={styles.salary}>
            {employee.salary.toLocaleString()}
          </span>
        </div>

        <p className={styles.position}>{employee.position}</p>

        <div className={styles.metaRow}>
          <span>📍 {employee.city}</span>
          <span>Joined {employee.startDate}</span>
        </div>
      </article>

      <button
        className={`${buttonStyles.button} ${buttonStyles.primary}`}
        onClick={handleCaptureClick}
      >
        Capture Photo
      </button>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {fileError && (
        <p style={{ color: "#dc2626", marginTop: "8px" }}>{fileError}</p>
      )}
    </section>
  );
}

export default EmployeeDetail;
