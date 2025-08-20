'use client'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-6rem)]">
            <h1 className="text-4xl font-headline mb-4">404 - Not Found</h1>
            <p className="text-lg text-muted-foreground">The page you're looking for doesn't exist.</p>
        </div>
    );
}
