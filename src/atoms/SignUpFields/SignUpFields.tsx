import { SignUpField, SignUpFieldsRef } from "@/types";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

type Props = {
  onChange: ({ name, password, phone }: SignUpField, error: boolean) => void;
};

export const SignUpFields = forwardRef<SignUpFieldsRef, Props>(
  ({ onChange }, ref) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const CheckFields = () => {
      let isValid = true;
      if (name.trim().length < 3) {
        setNameError("The Name is too short");
        isValid = false;
      }
      if (password.length < 9) {
        setPasswordError("Password is too short");
        isValid = false;
      }
      if (phone.length != 10 || !phone.startsWith("0")) {
        setPhoneError("Invalid Phone number");
        isValid = false;
      }
      return isValid;
    };

    useImperativeHandle(ref, () => ({
      CheckFields,
    }));

    useEffect(() => {
      const error = !!(nameError || passwordError || phoneError);
      onChange({ name, password, phone }, error);
    }, [name, password, phone, nameError, passwordError, phoneError]);
    return (
      <div className="setup-fields-comp">
        <span className="create-account-title">Create an account</span>
        <span className="setupaccount-field">Full name</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => {
            setNameError("");
          }}
          onBlur={() => {
            CheckFields();
          }}
          placeholder="Enter your full name"
          className="signup-input"
          style={{
            border:
              nameError != "" ? "1px solid red" : "1px solid gainsboro",
          }}
        />
        <span className="signup-error">{nameError}</span>
        <span className="setupaccount-field">Password</span>
        <input
          value={password}
          onFocus={() => {
            setPasswordError("");
          }}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => {
            CheckFields();
          }}
          placeholder="Enter your password"
          type="password"
          className="signup-input"
          style={{
            border:
              passwordError != "" ? "1px solid red" : "1px solid gainsboro",
          }}
        />
        <span className="signup-error">{passwordError}</span>
        <span className="setupaccount-field">Phone number</span>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onFocus={() => setPhoneError("")}
          maxLength={10}
          onBlur={() => {
            CheckFields();
          }}
          placeholder="Enter your phone number (Israel Region)"
          className="signup-input"
          style={{
            border: phoneError != "" ? "1px solid red" : "1px solid gainsboro",
          }}
        />
        <span className="signup-error">{phoneError}</span>
      </div>
    );
  }
);