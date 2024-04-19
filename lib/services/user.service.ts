
import axios from "axios"
interface IFormData {
  email: string
  password: string
}

export const createNewUser = async (formData: IFormData) => {
  const { data } = await axios.post("/api/auth/register", formData)
  return data
}
