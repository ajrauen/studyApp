import { useState } from "react";
import type { Question } from "../../utils/sheets.api";
import { Button, Paper } from "@mui/material";

const QuestionCard = ({
  question,
  onNext,
}: {
  question: Question;
  onNext: (id: string) => void;
}) => {
  const [revealed, setRevealed] = useState(false);

  const handleNext = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation(); // Prevent the click from propagating to the Paper component
    onNext(question.id);
    setRevealed(false);
  };

  const handleReveal = () => {
    setRevealed(!revealed);
  };

  return (
    <Paper
      className="w-full max-w-[700px] mx-auto p-4 transition-all duration-300"
      elevation={3}
      onClick={handleReveal}
    >
      <div className="mb-4">
        <div className="flex text-center items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            {question.questionCategory}
          </h3>
          <Button
            onClick={handleNext}
            variant="contained"
            color="primary"
            className="mt-4"
            size="small"
          >
            Next
          </Button>
        </div>

        <p className="text-lg font-medium mb-4">{question.question}</p>
      </div>

      {revealed && (
        <div className="border-t pt-4 mb-4">
          <p className="text-base text-gray-700">{question.answer}</p>
        </div>
      )}
    </Paper>
  );
};

export { QuestionCard };
