import { getDestinationById } from "@/lib/mock-data"
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Rocket, GalleryHorizontal, Calendar, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function DestinationPage({ params }: { params: { id: string } }) {
    const destination = getDestinationById(params.id);

    if (!destination) {
        notFound();
    }

    const heroAsset = destination.assets[0];

    return (
        <div className="space-y-8">
            <Card className="overflow-hidden border-border/50 bg-card/70 backdrop-blur-sm">
                <div className="relative h-64 md:h-96 w-full">
                    <Image
                        src={heroAsset.url}
                        alt={`Image of ${destination.name}`}
                        layout="fill"
                        objectFit="cover"
                        className="opacity-70"
                        data-ai-hint={`${destination.type} ${destination.name}`}
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 md:p-8">
                        <h1 className="text-4xl md:text-6xl font-bold font-headline text-white drop-shadow-lg">{destination.name}</h1>
                        <p className="text-lg text-primary-foreground/80 mt-2 capitalize">{destination.type}</p>
                    </div>
                     <Link href={`/jump/${destination.id}`} passHref>
                        <Button size="lg" className="absolute top-6 right-6" variant="secondary">
                            <Rocket className="mr-2 h-5 w-5" /> FTL Jump
                        </Button>
                    </Link>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 bg-card/70 backdrop-blur-sm">
                            <TabsTrigger value="overview"><Info className="w-4 h-4 mr-2" />Overview</TabsTrigger>
                            <TabsTrigger value="gallery"><GalleryHorizontal className="w-4 h-4 mr-2" />Gallery</TabsTrigger>
                            <TabsTrigger value="events"><Calendar className="w-4 h-4 mr-2" />Events</TabsTrigger>
                            <TabsTrigger value="missions"><Rocket className="w-4 h-4 mr-2" />Missions</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="mt-4 p-6 rounded-lg bg-card/70 backdrop-blur-sm">
                            <p className="text-lg leading-relaxed text-muted-foreground">{destination.description}</p>
                        </TabsContent>
                        <TabsContent value="gallery" className="mt-4 p-6 rounded-lg bg-card/70 backdrop-blur-sm">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {destination.assets.map(asset => (
                                    <Image key={asset.id} src={asset.url} alt={asset.description || destination.name} width={300} height={200} className="rounded-lg object-cover" />
                                ))}
                            </div>
                        </TabsContent>
                         <TabsContent value="events" className="mt-4 p-6 rounded-lg bg-card/70 backdrop-blur-sm">
                            <ul className="space-y-4">
                                {destination.events.length > 0 ? destination.events.map((event, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="text-accent font-bold">{event.date}</div>
                                        <div>
                                            <p className="font-semibold">{event.title}</p>
                                            <p className="text-sm text-muted-foreground">Source: {event.source}</p>
                                        </div>
                                    </li>
                                )) : <p className="text-muted-foreground">No recent events recorded.</p>}
                            </ul>
                        </TabsContent>
                        <TabsContent value="missions" className="mt-4 p-6 rounded-lg bg-card/70 backdrop-blur-sm">
                             <ul className="space-y-4">
                                {destination.missions.length > 0 ? destination.missions.map((mission, i) => (
                                    <li key={i} className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold">{mission.name}</p>
                                            <p className="text-sm text-muted-foreground">Status: {mission.status}</p>
                                        </div>
                                        <Button variant="outline" size="sm" asChild><a href={mission.url} target="_blank" rel="noopener noreferrer">Learn More</a></Button>
                                    </li>
                                )) : <p className="text-muted-foreground">No missions associated with this destination.</p>}
                            </ul>
                        </TabsContent>
                    </Tabs>
                </div>
                <div className="space-y-8">
                     <Card className="bg-card/70 backdrop-blur-sm border-border/50">
                        <CardHeader>
                            <CardTitle>Key Facts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm">
                                {Object.entries(destination.facts).map(([key, value]) => (
                                    <li key={key} className="flex justify-between">
                                        <span className="text-muted-foreground">{key}</span>
                                        <span className="font-semibold">{value}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                    <Button size="lg" className="w-full">
                        <Bookmark className="mr-2 h-5 w-5" /> Starmark
                    </Button>
                </div>
            </div>
        </div>
    );
}
