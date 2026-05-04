/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useMemo } from "react";
import {
  getFileDetails,
  type DriveFile,
  type Question,
} from "../utils/sheets.api";
import { QuestionCard } from "./QuestionCard/QuestionCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface QuestionCardsProps {
  fileInfo: DriveFile;
}

const QuestionCards = ({ fileInfo }: QuestionCardsProps) => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["fileDetails", fileInfo.id],
    queryFn: () => getFileDetails(fileInfo.id),
  });

  const questions = useMemo(
    () => (Array.isArray(data) ? data : data ? [data] : []),
    [data]
  );

  useEffect(() => {
    if (questions.length > 0 && !selectedQuestion) {
      setSelectedQuestion(questions[0]);
    }
  }, [questions, selectedQuestion]);

  const handleNext = () => {
    let hasValidOccuranceRatings = false;
    let nextQuestion: Question | null = null;
    const maxAttempts = questions.length * 3.2; // Prevent infinite loop by limiting attempts
    let currentAttempt = 0;
    while (!hasValidOccuranceRatings && currentAttempt <= maxAttempts) {
      currentAttempt++;
      const randomNumber = Math.floor(Math.random() * questions.length);
      if (questions[randomNumber].occuranceRating !== 3) {
        nextQuestion = questions[randomNumber];
        hasValidOccuranceRatings = true;
      }
    }

    if (nextQuestion) {
      // increment occurrence in cache so UI reflects updated rating
      queryClient.setQueryData(["fileDetails", fileInfo.id], (oldData: any) => {
        if (!oldData) return oldData;
        if (Array.isArray(oldData)) {
          return oldData.map((q) =>
            q.id === nextQuestion.id
              ? { ...q, occuranceRating: (q.occuranceRating ?? 0) + 1 }
              : q
          );
        }
        if ((oldData as any).id === nextQuestion.id) {
          return {
            ...(oldData as any),
            occuranceRating: ((oldData as any).occuranceRating ?? 0) + 1,
          };
        }
        return oldData;
      });

      setSelectedQuestion(nextQuestion);
    }
  };

  return (
    <div className="mt-[20%]">
      {selectedQuestion && (
        <QuestionCard question={selectedQuestion} onNext={handleNext} />
      )}
    </div>
  );
};

export { QuestionCards };
