import { FC } from "react";

interface MultipleChoiceOptionsProps {
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
  questionId: number;
}

const MultipleChoiceOptions: FC<MultipleChoiceOptionsProps> = ({ options, selected, onChange, questionId }) => {
  const safeSelected = selected || [];
  return (
    <div className="flex flex-col gap-2">
    {options.map((opt, i) => (
      <label key={`${questionId}-${i}-${opt}`} className="flex items-center gap-2">
        <input type="checkbox" value={opt} checked={safeSelected ? safeSelected.includes(opt) : false}
          onChange={(e) => {
            if (e.target.checked) {
              onChange([...safeSelected, opt]);
            } else {
              onChange(safeSelected.filter(a => a !== opt));
            }
          }}
        />
        {opt}
      </label>
    ))}
  </div>
  )
}

export default MultipleChoiceOptions;
