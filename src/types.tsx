export type SignUpField ={
    name: String,
    password: String,
    phone: String
}

export type SignUpFieldsRef = {
  CheckFields: () => boolean;
};

export type SurveyType = {
  question: string;
  answer: string;
};