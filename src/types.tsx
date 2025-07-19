export type SignUpField ={
    name: String,
    password: String,
    phone: String
}

export type SignUpFieldsRef = {
  CheckFields: () => boolean;
};