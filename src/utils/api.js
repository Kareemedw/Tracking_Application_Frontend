import { BASE_URL } from "./constants";
//import { useParams } from "react-router-dom";

// Helper to handle API responses
const checkResponse = async (res) => {
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `Request failed: ${res.status}`);
  }

  return data;
};

// Helper to get customer JWT
const getApplicantToken = () => {
  const token = localStorage.getItem("applicantToken");

  if (!token || token === "null" || token === "undefined") {
    throw new Error("Applicant is not authenticated");
  }

  return token;
};

// Helper to get staff JWT
const getStaffToken = () => {
  const token = localStorage.getItem("staffToken");

  if (!token || token === "null" || token === "undefined") {
    throw new Error("Staff member is not authenticated");
  }

  return token;
};

// CUSTOMER: Sign in
export const signinApplicant = async ({
  applicationNumber,
  lastName,
  password,
}) => {
  const res = await fetch(`${BASE_URL}/customers/signin`, {
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

  return checkResponse(res);
};

// CUSTOMER: Change temporary password
export const changeApplicantPassword = async ({
  newPassword,
  confirmPassword,
}) => {
  const token = localStorage.getItem("applicantToken");

  const res = await fetch(`${BASE_URL}/customers/change-password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      newPassword,
      confirmPassword,
    }),
  });

  return checkResponse(res);
};

// CUSTOMER: Get authenticated applicant
export const getCustomerApplicant = async (applicantId) => {
  const token = localStorage.getItem("applicantToken");

  const res = await fetch(`${BASE_URL}/customers/${applicantId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return checkResponse(res);
};

export const getApplicant = async (applicantId) => {
  const token = localStorage.getItem("applicantToken");

  const res = await fetch(`${BASE_URL}/applicants/${applicantId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return checkResponse(res);
};

// STAFF: Get all applicants
export const getApplicants = async () => {
  const token = localStorage.getItem("applicantToken");

  const res = await fetch(`${BASE_URL}/applicants`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return checkResponse(res);
};

export const getCurrentCustomer = async (applicantId) => {
  const token = localStorage.getItem("applicantToken");

  if (!token) {
    throw new Error("Applicant not authenticated");
  }

  const res = await fetch(`${BASE_URL}/customers/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return checkResponse(res);
};

// export const getCurrentApplicant = async (applicantId) => {
//   const token = localStorage.getItem("staffToken");

//   if (!token) {
//     throw new Error("Applicant not authenticated");
//   }

//   const res = await fetch(`${BASE_URL}/applicants/me`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return checkResponse(res);
// };

// STAFF: Create applicant
export const createApplicant = async (applicantData) => {
  const token = localStorage.getItem("applicantToken");

  const res = await fetch(`${BASE_URL}/applicants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(applicantData),
  });

  return checkResponse(res);
};

export const updateApplicantStep = async (applicantId, stepNumber, updates) => {
  const token = localStorage.getItem("staffToken");

  const res = await fetch(
    `${BASE_URL}/applicants/${applicantId}/steps/${stepNumber}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(updates),
    },
  );

  return checkResponse(res);
};
