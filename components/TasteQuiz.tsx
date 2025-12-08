import { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { updateTasteProfile } from '@/lib/services/taste-profile/tasteProfileService';
import { useAuth } from '@/lib/auth/useAuth';

interface QuizQuestion {
    id: string;
    trait: string;
    question: string;
    description: string;
    leftLabel: string;
    rightLabel: string;
}

const QUESTIONS: QuizQuestion[] = [
    {
        id: 'qm1',
        trait: 'quietness',
        question: 'What is your ideal noise level?',
        description: 'Help us understand your acoustic preferences for dining.',
        leftLabel: 'Lively & Energetic',
        rightLabel: 'Quiet & Intimate',
    },
    {
        id: 'qm2',
        trait: 'serviceQuality',
        question: 'How strict are you about service?',
        description: 'Do you prefer quick casual service or a fine dining experience?',
        leftLabel: 'Casual & Quick',
        rightLabel: 'Attentive & Refined',
    },
    {
        id: 'qm3',
        trait: 'healthiness',
        question: 'How do you prioritize health?',
        description: 'Are you looking for indulgent comfort food or nutritious options?',
        leftLabel: 'Indulgent Comfort',
        rightLabel: 'Super Healthy',
    },
    {
        id: 'qm4',
        trait: 'value',
        question: 'What matters more: Price or Experience?',
        description: 'Are you looking for a bargain or willing to pay for premium quality?',
        leftLabel: 'Premium Experience',
        rightLabel: 'Great Value/Deal',
    },
    {
        id: 'qm5',
        trait: 'atmosphere',
        question: 'Describe your vibe',
        description: 'What kind of atmosphere makes you feel most comfortable?',
        leftLabel: 'Laid-back & Rustic',
        rightLabel: 'Upscale & Chic',
    },
];

export default function TasteQuiz() {
    const router = useRouter();
    const { user } = useAuth();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({
        quietness: 50,
        serviceQuality: 50,
        healthiness: 50,
        value: 50,
        atmosphere: 50,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSliderChange = (value: number) => {
        const trait = QUESTIONS[currentStep].trait;
        setAnswers(prev => ({
            ...prev,
            [trait]: value
        }));
    };

    const handleNext = async () => {
        if (currentStep < QUESTIONS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            await submitQuiz();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const submitQuiz = async () => {
        if (!user) return;
        setIsSubmitting(true);
        try {
            await updateTasteProfile(user.uid, {
                quietness: answers.quietness,
                serviceQuality: answers.serviceQuality,
                healthiness: answers.healthiness,
                value: answers.value,
                atmosphere: answers.atmosphere,
            });
            router.push('/profile');
        } catch (error) {
            console.error('Failed to update profile', error);
            // Could add toast here
        } finally {
            setIsSubmitting(false);
        }
    };

    const currentQuestion = QUESTIONS[currentStep];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-rose-50 flex items-center justify-center p-6">
            <Card className="max-w-xl w-full shadow-xl rounded-3xl overflow-hidden border-0 bg-white/90 backdrop-blur-sm">
                <div className="h-2 bg-gray-100 w-full">
                    <motion.div
                        className="h-full bg-orange-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                <CardContent className="p-8">
                    <div className="mb-8 text-center">
                        <motion.div
                            key={currentQuestion.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="inline-block p-3 rounded-full bg-orange-100 text-orange-600 mb-4">
                                <Sparkles className="w-6 h-6" />
                            </span>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                {currentQuestion.question}
                            </h2>
                            <p className="text-gray-500">
                                {currentQuestion.description}
                            </p>
                        </motion.div>
                    </div>

                    <div className="mb-10">
                        <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">
                            <span>{currentQuestion.leftLabel}</span>
                            <span>{currentQuestion.rightLabel}</span>
                        </div>

                        <div className="relative h-12 flex items-center">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="5"
                                value={answers[currentQuestion.trait]}
                                onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                                className="w-full h-3 bg-gray-100 rounded-full appearance-none cursor-pointer accent-orange-500 hover:accent-orange-600 transition-all"
                            />
                        </div>
                        <div className="text-center mt-2 font-mono text-orange-600 font-medium">
                            {answers[currentQuestion.trait]} / 100
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                        <Button
                            variant="outline"
                            onClick={handleBack}
                            disabled={currentStep === 0 || isSubmitting}
                            className={`text-gray-500 hover:text-gray-800 border-0 ${currentStep === 0 ? 'invisible' : ''}`}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>

                        <Button
                            onClick={handleNext}
                            disabled={isSubmitting}
                            className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-8 shadow-lg shadow-orange-500/30"
                        >
                            {currentStep === QUESTIONS.length - 1 ? (
                                <>
                                    {isSubmitting ? 'Saving...' : 'Finish Profile'}
                                    {!isSubmitting && <Check className="w-4 h-4 ml-2" />}
                                </>
                            ) : (
                                <>
                                    Next Question
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
