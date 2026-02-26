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

  const [storedImage] = useState(() => {
    const stored = localStorage.getItem(`photo_${employeeId}`);
    if (!stored) return null;

    const parsed = JSON.parse(stored);

    if (Date.now() < parsed.expiry) {
      return parsed.image;
    }

    localStorage.removeItem(`photo_${employeeId}`);
    return null;
  });

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

    // --- SIZE VALIDATION (2MB) ---
    const MAX_SIZE = 2 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
      setFileError("Image must be smaller than 5MB.");
      event.target.value = null;
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const expiry = Date.now() + 60 * 1000; // 1 minute

      localStorage.setItem(
        `photo_${employeeId}`,
        JSON.stringify({
          image: reader.result,
          expiry,
        }),
      );

      navigate("/photo-result", {
        state: {
          employeeId,
          image: reader.result,
        },
      });
    };

    reader.readAsDataURL(file);

    // Reset input so selecting same image again works
    event.target.value = "";
  }

  if (isLoading) return <EmployeeDetailSkeleton />;

  if (isError) return <p className={styles.error}>Failed to load employee.</p>;

  if (!employee) return <p>Employee not found</p>;

  return (
    <section className={styles.container}>
      <button
        className={`${buttonStyles.button} ${buttonStyles.secondary} ${styles.backButton}`}
        onClick={() => navigate("/", { replace: true })}
      >
        ← Back
      </button>

      <article className={`${cardStyles.card} ${styles.card}`}>
        <div className={styles.headerRow}>
          <h2>{employee.name}</h2>
          <span className={styles.salary}>
            ${employee.salary.toLocaleString()}
          </span>
        </div>

        <p className={styles.position}>{employee.position}</p>

        <div className={styles.metaRow}>
          <span>📍 {employee.city}</span>
          <span>Joined {employee.startDate}</span>
        </div>
      </article>

      {storedImage && (
        <section className={styles.photoSection}>
          <h3 className={styles.photoTitle}>Captured Photo</h3>

          <div className={styles.photoWrapper}>
            <img
              src={storedImage}
              alt="Captured employee"
              className={styles.photo}
            />
          </div>
        </section>
      )}

      <div className={styles.actions}>
        <button
          className={`${buttonStyles.button} ${buttonStyles.primary}`}
          onClick={handleCaptureClick}
        >
          Capture Photo
        </button>
      </div>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        data-testid="file-input"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {fileError && <p className={styles.fileError}>{fileError}</p>}
    </section>
  );
}

export default EmployeeDetail;
