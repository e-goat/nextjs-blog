export default function NotFound() {
    return (
        <div className="flex items-center justify-center py-20">
            <div className="text-center">
                <h1 className="text-8xl font-bold text-purple-600 dark:text-purple-400 mb-6 animate-pulse">
                    404
                </h1>
                <h2 className="text-2xl text-slate-500 dark:text-white mb-4">
                    Page Not Found
                </h2>
                <p className="text-gray-400 mb-8">
                    The page you're looking for doesn't exist.
                </p>
            </div>
        </div>
    );
}