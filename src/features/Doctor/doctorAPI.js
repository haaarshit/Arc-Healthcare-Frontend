import axios from "axios";
import { setCookie, getCookie, imageToBase64 } from "../../Utils/UtilFunctions";

const requestUrl = process.env.REACT_APP_BACKEND_URL

const extractDays = (data) => {
  const availableDays = [];
  for (const [day, isAvailable] of Object.entries(data.availability.availableDays)) {
    if (isAvailable) {
      availableDays.push(day);
    }
  }
  return availableDays

}

export const createDoctor = async (data) => {
  const base64Img = await imageToBase64(data.avatar[0])

  const availableDays = extractDays(data);

  // // Using Object.entries for key-value pairs
  // for (const [day, isAvailable] of Object.entries(data.availability.availableDays)) {
  //   if (isAvailable) {
  //     availableDays.push(day);
  //   }
  // }

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
      const token = getCookie('token')
      const response = await axios.get(requestUrl + "/api/auth/doctor/city?cityname=" + city, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: false
      })
      console.log(response.data)
      resolve({ data: response.data })
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


export const updateAppointment = async (data) => {

  return new Promise(async (resolve, reject) => {

    try {
      // todo =>  getting undefined in data
      let appointmentData = {
        startTime: data.requestData.startTime,
        endTime: data.requestData.endTime,
        symptoms: data.requestData.symptoms,
        diagnosis: data.requestData.diagnosis,
        prescription: data.requestData.prescription,
        status: 'completed',
        notes: data.requestData.notes,
        followUpDate: data.requestData.followUpDate,
        followUpInstructions: data.requestData.followUpInstructions,
        appointmentType: '',
        prescribedMedications: data.requestData.medicines,
        labTestRequests: data.requestData.tests,
        patientConsent: true,
      }
      console.log(appointmentData)
      const token = getCookie('token')
      const response = await axios.put(requestUrl + "/api/auth/doctor/appointment/update/" + data.id, appointmentData, {
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


export const updateAvailability = async (data) => {

  return new Promise(async (resolve, reject) => {
    data.availability.availableDays = extractDays(data)

    try {
      const token = getCookie('token')
      const response = await axios.put(requestUrl + "/api/auth/doctor/update-avaibility", data.availability, {
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
      console.log(response.data)
      resolve({ data: response.data })
    }
    catch (e) {
      reject(e)
    }
  }
  );
}

export const createAppointmet = async (data) => {

  return new Promise(async (resolve, reject) => {
    const requestData = {
      patientId: data.requestData.patientId,
      doctorId: data.requestData.doctorId,
      patientName: '',
      patientEmail: '',
      appointmentDate: data.requestData.appointmentDate,
      startTime: '',
      endTime: '',
      symptoms: '',
      diagnosis: '',
      prescription: '',
      status: 'pending',
      notes: '',
      followUpDate: '',
      followUpInstructions: '',
      appointmentType: '',
      prescribedMedications: '',
      labTestRequests: '',
      patientConsent: '',
    }

    try {
      console.log(requestData)
      const token = getCookie('token')
      const response = await axios.post(requestUrl + "/api/auth/doctor/create-appointment?id=" + data.id, data.requestData, {
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
      console.log(response.data)
      resolve({ data: response.data })
    }
    catch (e) {
      reject(e)
    }
  }
  );
}
