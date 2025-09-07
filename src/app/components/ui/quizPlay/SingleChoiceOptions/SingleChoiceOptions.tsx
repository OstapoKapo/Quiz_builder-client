import { FC } from "react";

interface SingleChoiceOptionsProps {
  options: string[];
  selected: string | undefined;
  onChange: (value: string) => void;
  questionId: number;
}

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
