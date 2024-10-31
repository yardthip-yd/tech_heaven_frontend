import axios  from "axios";

export const loginGoogle = async (profile) => {
    console.log(profile,"check profile login google")
    return await axios.post("http://localhost:8000/auth/register-google",profile)
  } 