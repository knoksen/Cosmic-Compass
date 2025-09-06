'use client'

export default function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-6rem)]">
            <h1 className="text-4xl font-headline mb-4">404 - Page Not Found</h1>
            <p className="text-lg text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist.</p>
        </div>
    );
}
