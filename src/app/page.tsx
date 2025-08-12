import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { featuredDestinations } from '@/lib/mock-data';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center space-y-12 md:space-y-16">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-accent via-purple-400 to-white">
          Cosmic Compass
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          Your portal to the stars. Select a destination, engage the FTL drive, and explore the wonders of the universe.
        </p>
      </div>

      <div className="w-full max-w-xl">
        <form className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for a planet, star, or galaxy..."
            className="w-full pl-10 pr-4 py-3 text-lg rounded-full bg-background/50 backdrop-blur-sm"
          />
        </form>
      </div>

      <div className="w-full max-w-6xl text-left">
        <h2 className="text-2xl font-bold font-headline mb-6">Featured Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDestinations.map((dest) => (
            <Card key={dest.id} className="bg-card/70 backdrop-blur-sm border-border/50 overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
              <CardHeader className="p-0">
                <Image
                  src={dest.assets[0].thumbnailUrl || dest.assets[0].url}
                  alt={dest.name}
                  width={400}
                  height={300}
                  className="w-full h-40 object-cover"
                  data-ai-hint={`${dest.type} ${dest.name}`}
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg font-headline">{dest.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{dest.type}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={`/destination/${dest.id}`} passHref>
                  <Button variant="outline" className="w-full">
                    Explore <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
