import axios, { AxiosError } from "axios";

export const CreateDashboard = async (name: string) => {
    try{
        const URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        const response = await axios.post(`${URL}/dashboard/additem`, {name}, {withCredentials:true});
        return { success: true, data: response.data };
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.log("Axios error:", axiosError);
            return { success: false, error: axiosError.response?.data || 'An error occurred' };
        } else {
            console.log("Unexpected error:", error);
            return { success: false, error: 'An unexpected error occurred' };
        }
    }
}

export const GetDashboard = async () => {
    try{
        const URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        const response = await axios.post(`${URL}/dashboard/getitems`, {}, {withCredentials:true});
        return { success: true, data: response.data };
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.log("Axios error:", axiosError);
            return { success: false, error: axiosError.response?.data || 'An error occurred' };
        } else {
            console.log("Unexpected error:", error);
            return { success: false, error: 'An unexpected error occurred' };
        }
    }
}