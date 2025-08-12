import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket } from "lucide-react";
import Link from "next/link";

const mockRoutes = [
    {
        id: 'route-1',
        title: 'Tour of Inner Planets',
        waypoints: ['Earth', 'Mars'],
        visibility: 'Public'
    },
    {
        id: 'route-2',
        title: 'Journey to the Nearest Star',
        waypoints: ['Earth', 'Proxima Centauri b'],
        visibility: 'Private'
    }
]

export default function RoutesPage() {
    const user = null; // Mock user

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold font-headline">My Routes</h1>
                <p className="text-muted-foreground mt-2">Your saved interstellar journeys and expeditions.</p>
            </div>

            {user ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockRoutes.map(route => (
                        <Card key={route.id} className="bg-card/70 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle>{route.title}</CardTitle>
                                <CardDescription>{route.visibility}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="font-semibold mb-2">Waypoints:</p>
                                <ul className="list-disc list-inside text-muted-foreground">
                                    {route.waypoints.map(wp => <li key={wp}>{wp}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="max-w-xl mx-auto text-center bg-card/70 backdrop-blur-sm">
                    <CardHeader>
                        <Rocket className="mx-auto h-12 w-12 text-accent"/>
                        <CardTitle>Log in to See Your Routes</CardTitle>
                        <CardDescription>Your personal collection of cosmic journeys awaits. Log in or create an account to start planning your expeditions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4 justify-center">
                            <Button asChild>
                                <Link href="/login">Login</Link>
                            </Button>
                             <Button variant="secondary" asChild>
                                <Link href="/">Start Exploring</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
