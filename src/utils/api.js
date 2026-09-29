const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("staffToken");

    const res = await fetch("http://localhost:5001/applicants", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        applicationNumber,
        firstName,
        lastName,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Unable to create applicant");
    }

    setTemporaryPassword(data.temporaryPassword);
  } catch (err) {
    console.error(err);
  }
};

export default handleSubmit;
