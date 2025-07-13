import "./Survey.css";

type Props = {
  questionIndex: number;
  responses: { [index: number]: string };
  onSelect: (answer: string) => void;
  questions: { title: string; answers: string[] }[];
};

export const Survey = ({ questionIndex, responses, onSelect, questions }: Props) => {
  const currentQuestion = questions[questionIndex];
  return (
    <div className="survey-container">
      <h2 className="survey-title">{currentQuestion.title}</h2>
      <div className="answer-options">
        {currentQuestion.answers.map((item) => {
          const isSelected = responses[questionIndex] === item;
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
