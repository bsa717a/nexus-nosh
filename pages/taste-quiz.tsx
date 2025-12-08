import Head from 'next/head';
import TasteQuiz from '@/components/TasteQuiz';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function TasteQuizPage() {
    return (
        <ProtectedRoute>
            <Head>
                <title>Taste Quiz | Nexus Nosh</title>
                <meta name="description" content="Personalize your dining recommendations" />
            </Head>
            <TasteQuiz />
        </ProtectedRoute>
    );
}
