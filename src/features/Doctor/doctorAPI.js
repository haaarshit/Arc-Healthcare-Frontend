const requestUrl = process.env.REACT_BACKEND_URL

export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}
function imageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}


export const createDoctor = async (data) => {
  const base64Img = await imageToBase64(data.avatar[0])

  const availableDays = [];

  // Using Object.entries for key-value pairs
  for (const [day, isAvailable] of Object.entries(data.availability.availableDays)) {
    if (isAvailable) {
      availableDays.push(day);
    }
  }

  return new Promise(async (resolve) => {
    let formData = {
      email: data.email,
      password: data.password,
      avatar: base64Img,
      phone: data.phone,
      personalInfo: data.personalInfo,
      address: data.address,
      clinicName: "",
      professionalInfo: {
        registrationNumber: data.professionalInfo.registrationNumber,
        qualifications: [data.professionalInfo.qualifications],
        specializations: [data.professionalInfo.specializations],
        workExperience: [data.professionalInfo.workExperience]
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

    const data = await fetch(requestUrl + "/api/public/doctor/add", {
      method: "POST",
      body: JSON.stringify(formData)
    })

    setTimeout(() => resolve({}), 500)
  }
  );
}