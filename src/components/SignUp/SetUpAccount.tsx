import React, { useEffect, useState } from 'react';
import setupaccount from '@/assets/images/set-up-your-account.avif';
import surveyImage from '@/assets/images/what-brings-you-here-today.avif';
import logo from '@/assets/images/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { SignUpFields } from '@/atoms/SignUpFields/SignUpFields';
import { SignUpField } from '@/types';
import { Survey } from '../../atoms/Survey/Survey';
import { surveyQuestions } from '@/assets/data/surveyQuestions';


export const SetUpAccount = () => {
  const location = useLocation();
  const initialStage = location.state?.stage ?? 0;
  const [stage, setStage] = useState(initialStage); // 0 = SignUp, 1 = Survey, 2 = Done
  const [fields, setFields] = useState<SignUpField | null>(null);
  const [fieldError, setFieldsError] = useState(true);
  const [surveyIndex, setSurveyIndex] = useState(0);
  const [surveyResponses, setSurveyResponses] = useState<{ [index: number]: string }>({});
  const navigate = useNavigate();

  const handleFieldChange = ({ name, password, phone }: SignUpField, error: boolean) => {
    setFields({ name, password, phone });
    setFieldsError(error);
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
      if (!fieldError) {
        setStage(1);
      }
    } else if (stage === 1) {
      if (surveyResponses[surveyIndex]) {
        if (surveyIndex < surveyQuestions.length - 1) {
          setSurveyIndex(prev => prev + 1);
        } else {
          // All questions done
          console.log("Survey responses:", surveyResponses);
          console.log("User data:", fields);
          setStage(2);
          navigate("/dashboard"); // or wherever
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
          <div className="setup-fields">
            {stage === 0 && <SignUpFields onChange={handleFieldChange} />}
            {stage === 1 && (
              <Survey
                questionIndex={surveyIndex}
                responses={surveyResponses}
                onSelect={handleSurveySelect}
                questions={surveyQuestions}
              />
            )}
            {stage === 2 && <div className="thank-you">Thank you! 🎉</div>}
          </div>
          {stage < 2 && (
            <button
              className="signup-continue"
              onClick={handleContinue}
              disabled={stage === 0 ? fieldError : !surveyResponses[surveyIndex]}
            >
              Continue
            </button>
          )}
        </div>
      </div>
      <img src={getImage()} className="welcome-image" />
    </div>
  );
};
