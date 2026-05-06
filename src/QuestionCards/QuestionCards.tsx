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

  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    if (questions.length > 0 && !selectedQuestion) {
      setSelectedQuestion(questions[getRandomNumber(0, questions.length - 1)]);
    }
  }, [questions, selectedQuestion]);

  const handleNext = (id: string) => {
    queryClient.setQueryData(["fileDetails", fileInfo.id], (oldData: any) => {
      const question = oldData.find((q: Question) => q.id === id);
      question.occuranceRating += 1;
      return oldData;
    });

    if (!questions || questions.length == 0) return;

    const minRating = getMinRating(questions);
    if (minRating == 5) {
      alert("Your done for now. Reset if you must");
      return;
    }

    const nextQuestions = questions.filter(
      (q) => q.occuranceRating == minRating
    );
    const randomIndex = getRandomNumber(0, nextQuestions.length - 1);
    const nextQuestion = nextQuestions[randomIndex];

    setSelectedQuestion(nextQuestion);
  };

  const getMinRating = (questions: Question[]) => {
    return Math.min(...questions.map((q) => q.occuranceRating));
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
