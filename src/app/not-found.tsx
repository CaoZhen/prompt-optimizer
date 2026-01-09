import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function NotFound() {

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">404 - Page Not Found</h2>
            <p className="text-slate-600 mb-8 max-w-md">
                Could not find the requested resource. The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
                Return Home
            </Link>
        </div>
    );
}
