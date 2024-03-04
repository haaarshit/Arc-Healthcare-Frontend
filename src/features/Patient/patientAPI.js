import axios from "axios";
import { setCookie, getCookie, imageToBase64 } from "../../Utils/UtilFunctions";

// A mock function to mimic making an async request for data
const requestUrl = process.env.REACT_APP_BACKEND_URL
export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}



export const createPatient = async (data) => {
  const base64Img = await imageToBase64(data.avatar[0])

  const availableDays = [];

  // Using Object.entries for key-value pairs
  for (const [day, isAvailable] of Object.entries(data.availability.availableDays)) {
    if (isAvailable) {
      availableDays.push(day);
    }
  }

  return new Promise(async (resolve, reject) => {
    try {
      let formData = {
        email: data.email,
        password: data.password,
        avatar: base64Img,
        phone: data.phone,
        personalInfo: data.personalInfo,
        address: data.address,
        consultationFees: data.consultationFees,
        allergies:data.allergies,
        bloodType: data.bloodType,
        height:data.height,
        weight:data.weight,
        dietPreferences:data.dietPreferences
      }

      console.log("form data => " + JSON.stringify(formData))

      let response = await axios.post(requestUrl + "/api/public/doctor/add", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      console.log(response)
      console.log("respone header " + response.headers)
      await setCookie(response.headers.token, 10)
      resolve({ data: response.data })
    }
    catch (e) {
      reject(e)
    }
  }
  );
}

export const loginPatient = async (loginData) => {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(requestUrl + "/api/public/patient/login", loginData)
      await setCookie(response.headers.token, 10)
      resolve({ data: response.data })
    }
    catch (e) {
      reject(e)
    }
  }
  );
}

export const logoutPatient = async (loginData) => {

  return new Promise(async (resolve, reject) => {
    try {
      await setCookie(null, 0)
      resolve({ data: null })
    }
    catch (e) {
      reject(e)
    }
  }
  );
}



export const getDoctorProfile = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {

      const token = getCookie('token')
      const repsonse = await axios.get(requestUrl + '/api/auth/patient/profile/' + id, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
        },
      });
      resolve({ data: repsonse.data })
    }
    catch (e) {
      console.log(e)
      reject(e)
    }

  }
  );
}