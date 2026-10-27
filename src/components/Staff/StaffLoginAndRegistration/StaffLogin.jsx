import "./StaffLoginAndRegistration.css";

function StaffLogin({ email, password, setEmail, setPassword }) {
  const handleSubmit = () => {};

  return (
    <main className="staff__loginandregistration">
      <div className="admin__header">
        <h1>Passport And Citizens Tracking System(PACTS)</h1>
      </div>
      <div className="staff__loginandregistration-container">
        <h1 className="staff__loginandregistration-title">Staff Login</h1>
        <p className="staff__loginandregistration-container_p">Login here</p>
        <form
          className="staff__loginandregistration-form"
          onChange={handleSubmit}
        >
          <input
            type="email"
            value={email}
            placeholder="Your staff email"
            onChange={(e) => setEmail(e.target.value)}
            className="staff__loginandregistration-form_input"
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="staff__loginandregistration-form_input"
          />
          <button
            type="submit"
            className="staff__loginandregistration-form_button "
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}

export default StaffLogin;
