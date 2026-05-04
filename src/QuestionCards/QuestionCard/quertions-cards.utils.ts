import type { Question } from "../../utils/sheets.api";

const getWeightedRandomQuestion = (
  availableQuestions: Question[]
): Question | null => {
  if (availableQuestions.length === 0) return null;

  const totalRating = availableQuestions.reduce(
    (sum, q) => sum + (q.occuranceRating ?? 0),
    0
  );

  if (totalRating === 0) {
    // If all have 0 rating, pick randomly
    return availableQuestions[
      Math.floor(Math.random() * availableQuestions.length)
    ];
  }

  // Weighted random selection
  let random = Math.random() * totalRating;
  for (const question of availableQuestions) {
    random -= question.occuranceRating ?? 0;
    if (random <= 0) {
      return question;
    }
  }

  return availableQuestions[0];
};

export { getWeightedRandomQuestion };
