import { SurveyType } from "@/types";
import "./Survey.css";

// In Survey.tsx
type Props = {
  questionIndex: number;
  responses: SurveyType[];
  onSelect: (answer: string) => void;
  questions: { title: string; answers: string[] }[];
};

export const Survey = ({ questionIndex, responses, onSelect, questions }: Props) => {
  const currentQuestion = questions[questionIndex];

  // Find the answer for the current question
  const selectedAnswer = responses.find((r) => r.question === currentQuestion.title)?.answer;

  return (
    <div className="survey-container">
      <h2 className="survey-title">{currentQuestion.title}</h2>
      <div className="answer-options">
        {currentQuestion.answers.map((item) => {
          const isSelected = selectedAnswer === item;
          return (
            <button
              key={item}
              className={`answer-button ${isSelected ? "selected" : ""}`}
              onClick={() => onSelect(item)}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};
