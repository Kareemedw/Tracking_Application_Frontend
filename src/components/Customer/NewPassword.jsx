import "./Customer.css";

function NewPassword() {
  return (
    <main>
      <div className="admin__header">
        <h1>Change Password</h1>
      </div>
      <div className="customer__container">
        <h1 className="customer__title">New password</h1>
        <p>Change temporary password to a permanent or personal password</p>
        <form className="customer__form">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            //value={password}
            // onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="text"
            id="confirmPassword"
            // value={confirmPassword}
            // onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </form>
      </div>
    </main>
  );
}

export default NewPassword;
