import "./Customer.css";

function CustomerLogin({
  applicationNumber,
  lastName,
  password,
  setApplicationNumber,
  setLastName,
  setPassword,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5001/applicant/signin", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          applicationNumber,
          lastName,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("applicantToken", data.token);

      if (data.mustChangePassword) {
        navigate("/change-password");
      } else {
        navigate("/application");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="customer__login">
      <div className="admin__header">
        <h1>Immigration Tracking System</h1>
      </div>
      <div className="create__customer-container">
        <h1 className="create__customer-title"> Applicant Login</h1>
        <p>Please Login to track your application</p>
        <form onSubmit={handleSubmit} className="create__customer-form">
          <input
            value={applicationNumber}
            onChange={(e) => setApplicationNumber(e.target.value)}
            placeholder="Application Number"
          />

          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}

export default CustomerLogin;
