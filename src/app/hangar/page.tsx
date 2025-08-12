
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { spaceships } from "@/lib/mock-data";
import { Check, Heart, Shield, Zap, UnfoldVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function HangarPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col items-center text-center">
                <h1 className="text-4xl font-bold font-headline">Hangar Bay</h1>
                <p className="text-muted-foreground mt-2 max-w-2xl">
                    A collection of vessels from across the multiverse. Each ship is a unique piece of technology from a different reality.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {spaceships.map(ship => (
                    <Card key={ship.id} className="bg-card/70 backdrop-blur-sm flex flex-col overflow-hidden border-border/50">
                        <CardHeader className="p-0 relative">
                             <Image
                                src={ship.image}
                                alt={ship.name}
                                width={600}
                                height={400}
                                className="w-full h-48 object-cover"
                                data-ai-hint={`${ship.class} ${ship.origin}`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                        </CardHeader>
                        <CardContent className="p-6 flex-grow">
                             <CardTitle className="text-2xl font-headline flex items-center justify-between">
                                <span>{ship.name}</span>
                                <Badge variant="secondary" className="flex items-center gap-1.5">
                                    <UnfoldVertical className="w-3 h-3 text-accent" />
                                    {ship.origin}
                                </Badge>
                             </CardTitle>
                             <CardDescription>{ship.class}</CardDescription>
                            
                            <ul className="space-y-2 text-sm mt-4">
                                {Object.entries(ship.stats).map(([key, value]) => (
                                    <li key={key} className="flex justify-between items-start gap-4">
                                        <span className="text-muted-foreground whitespace-nowrap">{key}</span>
                                        <span className="font-semibold text-right">{value}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter className="p-6 bg-card/50 border-t border-border/50 flex gap-2">
                           <Button className="w-full" variant="secondary">
                                <Heart className="mr-2 h-4 w-4" /> Favorite
                            </Button>
                            <Button className="w-full">
                                <Check className="mr-2 h-4 w-4" /> Select Ship
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
