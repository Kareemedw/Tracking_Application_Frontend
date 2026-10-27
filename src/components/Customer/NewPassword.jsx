import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { changeApplicantPassword } from "../../utils/api";
import "./Customer.css";

function NewPassword({
  confirmPassword,
  setMustChangePassword,
  setConfirmPassword,
  validateForm,
  setErrors,
  errors,
  error,
  setError,
}) {
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const { applicantId } = useParams();

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError(
        "Password must contain at least 6 characters and no more than 12 characters",
      );
      return;
    }

    const token = localStorage.getItem("applicantToken");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const values = {
      newPassword,
      confirmPassword,
    };

    const validationErrors = validateForm(values);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const data = await changeApplicantPassword({
        newPassword,
        confirmPassword,
      });

      console.log("Password change successful:", data.message);

      setMustChangePassword(false);

      setNewPassword("");
      setConfirmPassword("");

      navigate(`/login`, { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="admin__header">
        <h1>Change Password</h1>
      </div>
      <div className="customer__container">
        <h1 className="customer__title">New password</h1>
        <p className="customer__container-p">
          Change temporary password to a permanent or personal password
        </p>
        <form className="customer__form" onSubmit={handleNewPasswordSubmit}>
          <label htmlFor="password" className="customer__form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`customer__form-input ${
              errors.password ? "customer__form-input_error" : ""
            }`}
          />
          {errors.newPassword && (
            <p className="form__error">{errors.newPassword}</p>
          )}
          <label htmlFor="confirmPassword" className="customer__form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`customer__form-input ${
              errors.password ? "customer__form-input_error" : ""
            }`}
          />
          {errors.confirmPassword && (
            <p className="form__error">{errors.confirmPassword}</p>
          )}
          <button
            className="customer__form-button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Updating Password..." : "Change Password"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default NewPassword;
