import axios from "axios";

const api = axios.create();

export const handleError = (error) => {
  console.log(error)
  const { response } = error;

  if (response?.status === 400) {
      throw new Error(response.data.message);
  }

  if (response?.status !== 200) {
      throw new Error("Some error occurred");
  }
}

export default api;
