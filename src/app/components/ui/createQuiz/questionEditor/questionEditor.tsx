import { FC } from "react";
import { QuestionEditorProps } from "@/types";
import SingleAndMultipleQuestion from "../single&MultipleQuestion/single&MultipleQuestion";

type QuestionType = "single" | "multiple" | "text";


const QuestionEditor: FC<QuestionEditorProps> = ({
  question,
  index,
  onDelete,
  updateQuestion,
  updateOption,
  setCorrectAnswer
}) => {
  return (
    <div className="border p-5 flex gap-5 flex-col mb-2 rounded relative">
      <button onClick={onDelete} className="text-red-500 font-bold self-end">
        Delete
      </button>

      <input className="border p-2 w-full mb-2" placeholder="Question text" value={question.text} onChange={(e) => updateQuestion(index, "text", e.target.value)}/>

      <select value={question.type} className="border p-2 w-full mb-2" 
       onChange={(e) => {
          const type = e.target.value as QuestionType;
          updateQuestion(index, "type", type);
          if (type === "single") setCorrectAnswer(index, 0);
          else if (type === "multiple") setCorrectAnswer(index, []);
          else setCorrectAnswer(index, "");
        }}
      >
        <option value="single">Single Choice</option>
        <option value="multiple">Multiple Choice</option>
        <option value="text">Text</option>
      </select>

      {(question.type === "single" || question.type === "multiple") && (
        <SingleAndMultipleQuestion
          question={question}
          index={index}
          updateOption={updateOption}
          setCorrectAnswer={setCorrectAnswer}
        />
      )}

      {question.type === "text" && (
        <input className="border p-2 w-full" placeholder="Correct answer" value={question.correct as string} onChange={(e) => setCorrectAnswer(index, e.target.value)} />
      )}
    </div>
  );
};

export default QuestionEditor;
