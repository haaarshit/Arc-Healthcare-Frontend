import axios from "axios";
import { setCookie, getCookie, imageToBase64 } from "../../Utils/UtilFunctions";

const requestUrl = process.env.REACT_APP_BACKEND_URL

// convert image to base64


export const createDoctor = async (data) => {
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
        clinicName: data.clinicName,
        professionalInfo: {
          registrationNumber: data.professionalInfo.registrationNumber,
          qualifications: data.professionalInfo.qualifications,
          specializations: data.professionalInfo.specializations,
          workExperience: data.professionalInfo.workExperience
        },
        availability: {
          availableDays: availableDays,
          availableTime: data.availability.availableTime
        },
        consultationFees: data.consultationFees,
        languages: [],
        reviews: []
      }

      console.log("form data => " + JSON.stringify(formData))

      let response = await axios.post(requestUrl + "/api/public/doctor/add", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
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

export const loginDoctor = async (loginData) => {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(requestUrl + "/api/public/doctor/login", loginData)
      await setCookie(response.headers.token, 10)
      resolve({ data: response.data })
    }
    catch (e) {
      reject(e)
    }
  }
  );
}


export const fetchAllDoctors = async () => {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(requestUrl + "/api/public/doctor/all")
      // const response = await fetch(requestUrl + "/api/public/doctor/all", {
      //   method: "GET",
      // })
      resolve({ data: response.data })
    }
    catch (e) {
      reject(e)
    }
  }
  );
}

export const fetchDoctorDashboard = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = getCookie('token')
      const response = await axios.get(requestUrl + "/api/auth/doctor/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
        },
        proxy: {
          host: requestUrl,
          port: 8080
        },
        withCredentials: false
      })
      resolve({ data: response.data })
    }
    catch (e) {
      reject(e)
    }
  }
  );
}

export const getDoctorByCity = async (city) => {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(requestUrl + "/api/public/doctor/city?cityname=" + city, {
        method: "GET",
      })
      resolve({ response })
    }
    catch (e) {
      reject(e)
    }
  }
  );
}

export const logoutDoctor = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await setCookie(null, 0)
      resolve({ data: null })
    }
    catch (e) {
      reject(e)
    }
  })
}

//  fetch patinet profile for doctor
export const fetchPatientProfile = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = getCookie('token')
      const response = await axios.get(requestUrl + "/api/auth/doctor/profile/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
        },
        proxy: {
          host: requestUrl,
          port: 8080
        },
        withCredentials: true
      })
      resolve({ data: response.data })
    }
    catch (e) {
      reject(e)
    }
  }
  );
}

export const updateAppointment = async (id, data) => {

  return new Promise(async (resolve, reject) => {

    try {
      let appointmentData = {
        startTime: data.startTime,
        endTime: data.endTime,
        symptoms: data.symptoms,
        diagnosis: data.diagnosis,
        prescription: data.prescription,
        status: 'completed',
        notes: data.notes,
        followUpDate: data.followUpDate,
        followUpInstructions: data.followUpInstructions,
        appointmentType: '',
        prescribedMedications: data.medicines,
        labTestRequests: data.tests,
        patientConsent: true,
      }
      console.log(appointmentData)
      const token = getCookie('token')
      const response = await axios.put(requestUrl + "/api/auth/doctor/appointment/update/" + id, appointmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
        },
        proxy: {
          host: requestUrl,
          port: 8080
        },
        withCredentials: false
      })
      resolve({ data: response.data })
    }
    catch (e) {
      reject(e)
    }
  }
  );
}
