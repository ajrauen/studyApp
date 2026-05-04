import { useEffect, useState } from "react";
import { getFileDetails, type DriveFile, type Question } from "../utils/sheets.api";
import { QuestionCard } from "./QuestionCard/QuestionCard";

interface QuestionCardsProps {
    fileInfo: DriveFile
}

const QuestionCards = ({ fileInfo }: QuestionCardsProps) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedQuestion, setSelectedQuestion] = useState<Question>();

    useEffect(() => {
        loadQuestionday()
    }, [fileInfo?.id])

    const loadQuestionday = async () => {
        const result = await getFileDetails(fileInfo.id);
        const questions = Array.isArray(result)
            ? result
            : result
                ? [result]
                : [];

        setQuestions(questions);
    }

    useEffect(() => {
        if (questions.length > 0 && !selectedQuestion) {
            getNextQuestion();
        }
    }, [questions])

    const getNextQuestion = () => {
const topFive = [...questions]
            .sort((a, b) => (b.occuranceRating ?? 0) - (a.occuranceRating ?? 0))
            .slice(0, 5);

        const randomNumber = Math.floor(Math.random() * 5); 
        const topQuestion = topFive[randomNumber];

        setSelectedQuestion(topQuestion);
    }


    const handelNext = (rating: number) => {
        console.log("Next question", rating)
    }

return (<div>
    {selectedQuestion && (
        <QuestionCard question={selectedQuestion} onNext={handelNext} />
    )}
</div>)

}

export { QuestionCards }