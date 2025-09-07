import { SingleChoiceOptionsProps } from "@/types";
import { FC } from "react";

const SingleChoiceOptions: FC<SingleChoiceOptionsProps> = ({ options, selected, onChange, questionId }) => (
  <div className="flex flex-col gap-2">
    {options.map((opt: string, i: number) => (
      <label key={`${questionId}-${i}-${opt}`} className="flex items-center gap-2">
        <input type="radio" name={`question-${questionId}`} value={opt} checked={selected === opt} onChange={() => onChange(opt)} />
        {opt}
      </label>
    ))}
  </div>
);

export default SingleChoiceOptions;
