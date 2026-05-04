import { useEffect, useState } from "react";
import type { Question } from "../../utils/sheets.api";
import { Box, Button, Paper, Typography } from "@mui/material";

const getRankFromElapsed = (elapsedSeconds: number) => {
    if (elapsedSeconds < 20) return 0;
    if (elapsedSeconds < 40) return 1;
    return 2;
};

const QuestionCard = ({
    question,
    onNext,
}: {
    question: Question;
    onNext: (rank: number) => void;
}) => {
    const [flipped, setFlipped] = useState(false);
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        setFlipped(false);
        setElapsed(0);
        const start = Date.now();
        const interval = window.setInterval(() => {
            const seconds = Math.floor((Date.now() - start) / 1000);
            setElapsed(seconds);
        }, 1000);

        return () => window.clearInterval(interval);
    }, [question.id]);

    const handleNext = () => {
        const rank = getRankFromElapsed(elapsed);
        onNext(rank);
    };

    return (
        <Paper sx={{ p: 2, maxWidth: 700, mx: 'auto' }} elevation={3}>
            <Box sx={{ perspective: 1200 }}>
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.6s ease',
                        transform: flipped ? 'rotateY(180deg)' : 'none',
                    }}
                >
                    {/* Front side */}
                    <Box
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            backfaceVisibility: 'hidden',
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            {question.questionCategory}
                        </Typography>

                        <Box sx={{ minHeight: 220, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="body1" align="center">
                                {question.Question}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                            <Button variant="outlined" onClick={() => setFlipped((current) => !current)}>
                                {flipped ? 'Show Question' : 'Show Answer'}
                            </Button>
                            <Button variant="contained" onClick={handleNext}>
                                Next
                            </Button>
                        </Box>

                        <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                            Time on card: {elapsed} second{elapsed === 1 ? '' : 's'}
                        </Typography>
                    </Box>

                    {/* Back side */}
                    <Box
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            {question.questionCategory}
                        </Typography>

                        <Box sx={{ minHeight: 220, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="body1" align="center">
                                {question.answer}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                            <Button variant="outlined" onClick={() => setFlipped((current) => !current)}>
                                {flipped ? 'Show Question' : 'Show Answer'}
                            </Button>
                            <Button variant="contained" onClick={handleNext}>
                                Next
                            </Button>
                        </Box>

                        <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                            Time on card: {elapsed} second{elapsed === 1 ? '' : 's'}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};

export { QuestionCard };