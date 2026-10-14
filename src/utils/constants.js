const BASE_URL = import.meta.env.PROD
  ? "https://api.pacts.edsintech.com"
  : "http://localhost:5001";

export { BASE_URL };
