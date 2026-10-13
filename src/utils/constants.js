const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.pacts.edsintech.com"
    : "http://localhost:5001";

export { BASE_URL };
