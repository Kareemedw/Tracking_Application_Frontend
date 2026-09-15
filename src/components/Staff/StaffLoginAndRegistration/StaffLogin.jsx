import handleSubmit from "../../../utils/api";
import "./StaffLoginAndRegistration.css";

function StaffLogin({ email, password, setEmail, setPassword }) {
  const handleSubmit = () => {};

  return (
    <main className="staff__loginandregistration">
      <div className="admin__header">
        <h1>Immigration Tracking System</h1>
      </div>
      <div className="staff__loginandregistration-container">
        <h1 className="staff__loginandregistration-title">Staff Login</h1>
        <p>Login here</p>
        <form
          className="staff__loginandregistration-form"
          onChange={handleSubmit}
        >
          <input
            type="email"
            value={email}
            placeholder="Your staff email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}

export default StaffLogin;
