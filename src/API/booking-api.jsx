import axios from "axios";

export const createBooking = async (token, data) => {
    try {
        const response = await axios.post("http://localhost:8000/booking/create-booking", data, {
            headers: {
                headers: { Authorization: `Bearer ${"token"}` },
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}