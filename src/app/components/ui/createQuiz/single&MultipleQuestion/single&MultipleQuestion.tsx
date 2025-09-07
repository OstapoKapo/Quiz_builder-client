import { SingleAndMultipleQuestionProps } from "@/types";

const SingleAndMultipleQuestion: React.FC<SingleAndMultipleQuestionProps> = ({ question, index, updateOption, setCorrectAnswer }) => {
    return(
        <div className="mb-2">
          {question.options!.map((opt, oIdx) => (
            <div key={oIdx} className="flex items-center gap-2 mb-1">
              <input className="border p-2 w-full" placeholder={`Option ${oIdx + 1}`} value={opt} onChange={(e) => updateOption(index, oIdx, e.target.value)} />
              {question.type === "single" ? (
                <input type="radio" checked={question.correct === oIdx} onChange={() => setCorrectAnswer(index, oIdx)} />
              ) : (
                <input type="checkbox" checked={(question.correct as number[]).includes(oIdx)}
                  onChange={() => {
                    let newCorrect = [...(question.correct as number[])];
                    if (newCorrect.includes(oIdx)) {
                      newCorrect = newCorrect.filter((i) => i !== oIdx);
                    } else {
                      newCorrect.push(oIdx);
                    }
                    setCorrectAnswer(index, newCorrect);
                  }}
                />
              )}
            </div>
          ))}
        </div>
    )
}

export default SingleAndMultipleQuestion;