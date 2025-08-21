import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center space-y-12 md:space-y-16 h-full justify-center">
      <div className="space-y-4 pt-16">
        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-accent via-purple-400 to-white">
          Cosmic Compass
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          Your portal to infinite realities. Chart a course through the multiverse and witness the wonders that lie beyond.
        </p>
      </div>

       <Link href="/starmap">
          <Button size="lg">
            Begin Exploration <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
    
    </div>
  );
}
