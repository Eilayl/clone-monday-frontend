import { SignUpField, SurveyType } from "@/types";
import axios, { AxiosError } from "axios";

type CreateAccountProps = {
    email: string;
    signupwithgoogle: boolean;
    fields?: SignUpField | null;
    survey: SurveyType[];
};
export const CreateAccount = async ({ email, signupwithgoogle, fields, survey } : CreateAccountProps) => {
    try{
        const URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        const response = await axios.post(`${URL}/auth/signup`, {
            email,
            signupwithgoogle,
            fields,
            survey
        });
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