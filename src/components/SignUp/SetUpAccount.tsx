import React, { useEffect, useState } from 'react'
import setupaccount from '@/assets/images/set-up-your-account.avif'
import survey from "@/assets/images/what-brings-you-here-today.avif"

import logo from '@/assets/images/logo.png'
import { useNavigate } from 'react-router-dom';
import { SignUpFields } from '@/atoms/SignUpFields';
import { SignUpField } from '@/types';
export const SetUpAccount = () => {
    const [stage, setStage] = useState<Number>(0);
    const [fields, setFields] = useState<SignUpField | null>(null)
    const [fieldError, setFieldsError] = useState(true);
    const navigate = useNavigate();
    
    const ChangeFields = ({name, password, phone} : SignUpField, error: boolean) =>{
        setFields({name: name, password: password, phone:phone});
        setFieldsError(error);
    }

    const HandlePressContinue = () => {
        if(stage===0){
            if(!fieldError)
                setStage(1)
        }
    }

    return(
        <div className='signup-container'>
            <div className="remain-width">
                <div className="signup-text-container">
                    <img src={logo} className="setup-logo"/>
                    <div className="setup-fields">
                        {stage === 0 && <SignUpFields onChange={ChangeFields}/>}
                    </div>
                    <button className="signup-continue" onClick={HandlePressContinue}>Continue</button>
                </div>
            </div>
            <img src={stage === 0 ? setupaccount : survey} className="welcome-image" />
        </div>
    )
}