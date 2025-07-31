import axios, { AxiosError } from "axios";

export const AnalyzeFile = async (file : File) => {
    try{
        const URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        const formData = new FormData();
        formData.append('docx', file);
        const response = await axios.post(`${URL}/docx/readandanalyze`, formData, {
                headers: {
          'Content-Type': 'multipart/form-data',
            },    
            withCredentials: true
        });
        console.log(response.data);
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