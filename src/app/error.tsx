'use client'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-6rem)]">
            <h1 className="text-4xl font-headline mb-4">Something went wrong!</h1>
            <p className="text-lg text-muted-foreground mb-4">{error.message}</p>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
                Try again
            </button>
        </div>
    );
}
