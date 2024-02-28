// A mock function to mimic making an async request for data
const requestUrl = process.env.REACT_BACKEND_URL
export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}
