export function getCookie(cookieName) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const [name, value] = cookies[i].trim().split('=');
      if (name === cookieName) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }


  
// set cookie
export async function setCookie(token,day) {
    // Set the cookie name and value
    const cookieName = "token";
    const cookieValue = token;
  
    // Calculate the expiration date in 10 days
    const now = new Date();
    const expireDate = new Date(now.getTime() + (day * 24 * 60 * 60 * 1000));
    // Set the cookie with expiration, path, and SameSite attribute
    document.cookie = `${cookieName}=${cookieValue}; expires=${expireDate.toUTCString()}; path=/; SameSite=Lax`;
  
  }

  // image to base64
  export function imageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }