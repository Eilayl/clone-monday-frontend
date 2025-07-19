import React, { useEffect, useRef, useState } from 'react';
import setupaccount from '@/assets/images/set-up-your-account.avif';
import surveyImage from '@/assets/images/what-brings-you-here-today.avif';
import logo from '@/assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { SignUpFields } from '@/atoms/SignUpFields/SignUpFields';
import { SignUpField, SignUpFieldsRef } from '@/types';
import { Survey } from '../../atoms/Survey/Survey';
import { surveyQuestions } from '@/assets/data/surveyQuestions';

export const SetUpAccount = () => {
  const [stage, setStage] = useState(0); // 0 = SignUp, 1 = Survey, 2 = Done
  const [fields, setFields] = useState<SignUpField | null>(null);
  const [surveyIndex, setSurveyIndex] = useState(0);
  const [surveyResponses, setSurveyResponses] = useState<{ [index: number]: string }>({});

  const navigate = useNavigate();
  const signUpRef = useRef<SignUpFieldsRef>(null);

  const handleFieldChange = ({ name, password, phone }: SignUpField) => {
    setFields({ name, password, phone });
  };

  const handleSurveySelect = (answer: string) => {
    setSurveyResponses(prev => ({
      ...prev,
      [surveyIndex]: answer
    }));
  };


  useEffect(() => {
    console.log(surveyResponses);
  }, [surveyResponses])


  
  const handleContinue = () => {
    if (stage === 0) {
      const isValid = signUpRef.current?.CheckFields();
      if (!isValid) return;
        else setStage(1);
    } else if (stage === 1) {
      if (surveyResponses[surveyIndex]) {
        if (surveyIndex < surveyQuestions.length - 1) {
          setSurveyIndex(prev => prev + 1);
        } else {
          // All questions done
          console.log("Survey responses:", surveyResponses);
          console.log("User data:", fields);
          setStage(2);
          navigate("/homeforusers"); 
        }
      }
    }
  };

  const getImage = () => {
    if (stage === 0) return setupaccount;
    if (stage === 1) return surveyImage;
    return ""; // Or some final image
  };


  return (
    <div className="signup-container">
      <div className="remain-width">
        <div className="signup-text-container">
          <img src={logo} className="setup-logo" />
            {/*article */}
          <div className="setup-fields">
            {stage === 0 && <SignUpFields onChange={handleFieldChange} ref={signUpRef}/>}
            {stage === 1 && (
              <Survey
                questionIndex={surveyIndex}
                responses={surveyResponses}
                onSelect={handleSurveySelect}
                questions={surveyQuestions}
              />
            )}
          </div>
          {/*Continue button */}
            <button
              className="signup-continue"
              onClick={handleContinue}
            >
              Continue
            </button>
        </div>
      </div>
      <img src={getImage()} className="welcome-image" />
    </div>
  );
};
