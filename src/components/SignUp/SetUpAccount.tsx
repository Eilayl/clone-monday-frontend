import React, { useEffect, useState } from 'react';
import setupaccount from '@/assets/images/set-up-your-account.avif';
import surveyImage from '@/assets/images/what-brings-you-here-today.avif';
import dashboardImage from '@/assets/images/dashboard.png';
import logo from '@/assets/images/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { SignUpFields } from '@/atoms/SignUpFields/SignUpFields';
import { SignUpField } from '@/types';
import { Survey } from '../../atoms/Survey/Survey';
import { surveyQuestions } from '@/assets/data/surveyQuestions';
import { useEmail } from '@/context/GoogleProvider';
import { CreateAccount } from '@/services/AuthService';
import { SurveyType } from '@/types';
import { SetUpDashboard } from '@/atoms/SetUpDashboard/SetUpDashboard';
import { useScreenWidth } from '@/context/ScreenSizesProvider';
import { CreateDashboard } from '@/services/DashboardService';


export const SetUpAccount = () => {
  const location = useLocation();
  const initialStage = location.state?.stage ?? 0;
  const [stage, setStage] = useState(initialStage); // 0 = SignUp, 1 = Survey, 2 = Done
  const [fields, setFields] = useState<SignUpField | null>(null);
  const [fieldError, setFieldsError] = useState(true);
  const [surveyIndex, setSurveyIndex] = useState(0);
  const [surveyResponses, setSurveyResponses] = useState<SurveyType[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('')
  const webEmail = location.state?.email ?? '';
  const { email } = useEmail(); // use this email to add user in db
  const navigate = useNavigate();
  const isMobile = useScreenWidth() < 1300 ? true : false;
  const handleFieldChange = ({ name, password, phone }: SignUpField, error: boolean) => {
    setFields({ name, password, phone });
    setFieldsError(error);
  };

  const handleSurveySelect = (answer: string) => {
    const question = surveyQuestions[surveyIndex].title;
    setSurveyResponses(prev => {
      // Replace answer for the current question if it exists, otherwise add new
      const filtered = prev.filter(item => item.question !== question);
      return [...filtered, { question, answer }];
    });
  };


const handleContinue = async () => {
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
        setLoading(true);
        const response = await CreateAccount({
          email: fields != null ? webEmail : email,
          signupwithgoogle: fields != null ? false : true,
          fields: fields,
          survey: surveyResponses
        });
        if (response.success) {
          setStage(2);
        }
        setLoading(false);
      }
    }
  } else if (stage === 2) {
    if (input !== '') {
      const response = await CreateDashboard(input);
      if(response.success) return navigate(`/dashboard/${input}`);
      else alert("error adding item into dashboard")
    }
  }
};


  const getImage = () => {
    if (stage === 0) return setupaccount;
    if (stage === 1) return surveyImage;
    if (stage === 2) return dashboardImage
    return "";
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
            {stage == 2 && (
              <SetUpDashboard onChange={(value) => setInput(String(value))}/>
            )}
          </div>
          {stage < 3 && (
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
      <div style={{position:'relative'}}>
      <img src={getImage()} className="welcome-image" />
      {stage == 2 && !isMobile && (
        <div>
        <span style={{zIndex:1, position:'absolute', top:'28%', left:'8%', fontSize:'50px'}}>{input}</span>
        <span style={{zIndex:1, position:'absolute', top:'2%', right:'5%', fontSize:'30px'}}>X</span>
        </div>
      )}
      </div>
    </div>
  );
};
