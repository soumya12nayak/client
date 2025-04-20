import axios from "axios";

// Use the actual URL for your backend API
const API_BASE_URL = 'https://career-genie-server.vercel.app/api'; 

// Fetch all webinars
export const getWebinars = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/webinars`);
    return res.data; // Return the list of webinars
  } catch (err) {
    console.error("Error fetching webinars:", err);
    throw new Error("Failed to fetch webinars");
  }
};

// Create a new webinar
export const createWebinar = async (webinarData) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/webinars/create`, webinarData);
    return res.data; // Return the created webinar
  } catch (err) {
    console.error("Error creating webinar:", err);
    throw new Error("Failed to create webinar");
  }
};

// Fetch webinars created by the logged-in user
export const getMyWebinars = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/webinars/my`);
    return res.data; // Return the user's webinars
  } catch (err) {
    console.error("Error fetching your webinars:", err);
    throw new Error("Failed to fetch your webinars");
  }
};



// Delete a webinar by ID

export const deleteWebinar = async (id, token) => {
  try {
    const res = await axios.delete(`${API_BASE_URL}/webinars/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (err) {
    console.error("Error deleting webinar:", err);
    throw new Error("Failed to delete webinar");
  }
};

// Ensure that the function is exported in your webinarApi.js
export const applyForWebinar = async (webinarId) => {
  const url = `${API_BASE_URL}/applications/apply`;
  console.log('➡️ POST', url, { webinarId }, 'token', token);
  try {
    const token = localStorage.getItem('token'); // Assuming JWT is stored in local storage
    const res = await axios.post(
      `${API_BASE_URL}/applications/apply`,
      { webinarId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error applying for webinar:", err);
    throw new Error('Failed to apply for webinar');
  }
};


// // In webinarApi.js
// export const getMyApplications = async () => {
//   const url = `${API_BASE_URL}/applications/my-applications`;
//   console.log('➡️ GET', url, 'with token', token);
//   const token = localStorage.getItem('token'); // Assuming JWT is stored in local storage
//   const res = await axios.get(`${API_BASE_URL}/applications/my-applications`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data;
// };
