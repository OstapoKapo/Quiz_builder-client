import { TextAnswerProps } from "@/types";
import { FC } from "react";

const TextAnswer: FC<TextAnswerProps> = ({ value, onChange }) => (
  <input type="text" value={value} className="border p-2 rounded w-full" placeholder="Enter your answer" onChange={(e) => onChange(e.target.value)} />
);

export default TextAnswer;
