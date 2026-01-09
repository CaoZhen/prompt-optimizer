'use client';

export const dynamic = 'force-dynamic';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body>
                <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Something went wrong!</h2>
                    <button
                        onClick={() => reset()}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
