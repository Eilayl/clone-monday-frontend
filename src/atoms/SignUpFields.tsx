import { SignUpField } from "@/types";
import { useEffect, useState } from "react";

type Props = {
onChange: ({ name, password, phone }: SignUpField, error: boolean) => void;
}
export const SignUpFields = ({onChange}: Props) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [nameError, setNameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    useEffect(() => {
        onChange({name, password, phone}, (nameError === '' && passwordError === '' && phoneError==='' && name.length > 0 && password.length > 0 && phone.length > 0) ? false : true)
    }, [name, password,phone])

    const CheckFields = () => {
        if(name.length < 3)
            setNameError('The Name is too short')
        if(password.length<9)
            setPasswordError("Password is too short")
        if(phone.length != 10 || !phone.startsWith('0'))
            setPhoneError("Invalid Phone number")
    }
    return(
        <div className="setup-fields-comp">
            <span className="create-account-title">Create an account</span>
            <span className="setupaccount-field">Full name</span>
                    <input value={name} onChange={(e) => setName(e.target.value)}  onFocus={() => {setNameError('')}} onBlur={() => {CheckFields()}} placeholder="Enter your full name" className="signup-input" style={{border: nameError != '' ? '1px solid red' : '1px solid gainsboro'}}/>
                    <span className="signup-error">{nameError}</span>
                    <span className="setupaccount-field">Password</span>
                    <input value={password} onFocus={() => {setPasswordError('')}} onChange={(e) => setPassword(e.target.value)}  onBlur={() => {CheckFields()}} placeholder="Enter your password" type="password" className="signup-input" style={{border: passwordError != '' ? '1px solid red' : '1px solid gainsboro'}}/>
                    <span className="signup-error">{passwordError}</span>
                    <span className="setupaccount-field">Phone number</span>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} onFocus={() => setPhoneError('')} maxLength={10}  onBlur={() => {CheckFields()}} placeholder="Enter your phone number (Israel Region)" className="signup-input" style={{border: phoneError != '' ? '1px solid red' : '1px solid gainsboro'}}/>
                    <span className="signup-error">{phoneError}</span>
        </div>
    )
}