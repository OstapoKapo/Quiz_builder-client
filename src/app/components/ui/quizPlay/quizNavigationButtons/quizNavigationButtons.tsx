import { NavigationButtonsProps } from "@/types";
import { FC } from "react";



const NavigationButtons: FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  onSubmit,
  disablePrevious,
  disableNext,
  disableSubmit,
  isSubmitting,
  isLastQuestion
}) => (
  <div className="flex justify-between mt-4">
    <button onClick={onPrevious} disabled={disablePrevious} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
      Previous
    </button>

    {!isLastQuestion ? (
      <button onClick={onNext} disabled={disableNext} className="px-4 py-2 bg-[#6F51F8] text-white rounded disabled:opacity-50">
        Next
      </button>
    ) : (
      <button onClick={onSubmit} disabled={disableSubmit} className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50">
        {isSubmitting ? "Submitting..." : "Submit Quiz"}
      </button>
    )}
  </div>
);

export default NavigationButtons;
