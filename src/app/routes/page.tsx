
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Rocket, View } from "lucide-react";
import Link from "next/link";
import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "@/components/ui/sidebar";

const mockRoutes = [
    {
        id: 'route-1',
        title: 'Tour of Inner Planets',
        description: 'A scenic trip through the inner solar system, visiting Earth and Mars.',
        waypoints: ['Earth', 'Mars'],
        visibility: 'Public'
    },
    {
        id: 'route-2',
        title: 'Journey to the Nearest Star',
        description: 'An expedition to Proxima Centauri b, our closest exoplanet neighbor.',
        waypoints: ['Earth', 'Proxima Centauri b'],
        visibility: 'Private'
    },
    {
        id: 'route-3',
        title: 'Nebula Photography Tour',
        description: 'Capture stunning images of the Orion and Tarantula Nebulae.',
        waypoints: ['Orion Nebula', 'Tarantula Nebula'],
        visibility: 'Public'
    }
]

export default function RoutesPage() {
    const user = { uid: 'mock-user' }; // Mock user to show logged-in state

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <Button className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        New Route
                    </Button>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton href="#" isActive>All Routes</SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton href="#">Public Routes</SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton href="#">Private Routes</SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>
            <SidebarInset>
                <div className="space-y-8">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-4xl font-bold font-headline">My Routes</h1>
                        <p className="text-muted-foreground mt-2 max-w-2xl">Your saved interstellar journeys and expeditions. Plan, manage, and share your cosmic voyages from this command center.</p>
                    </div>

                    {user ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mockRoutes.map(route => (
                                <Card key={route.id} className="bg-card/70 backdrop-blur-sm flex flex-col">
                                    <CardHeader>
                                        <CardTitle>{route.title}</CardTitle>
                                        <CardDescription>{route.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="font-semibold mb-2 text-sm text-muted-foreground">Waypoints:</p>
                                        <ul className="list-disc list-inside text-sm">
                                            {route.waypoints.map(wp => <li key={wp}>{wp}</li>)}
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full" variant="outline" asChild>
                                            <Link href="#" className="flex items-center w-full justify-center">
                                                <View className="mr-2 h-4 w-4" /> View Route
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="max-w-xl mx-auto text-center bg-card/70 backdrop-blur-sm p-8">
                            <CardHeader>
                                <Rocket className="mx-auto h-12 w-12 text-accent" />
                                <CardTitle>Log in to See Your Routes</CardTitle>
                                <CardDescription>Your personal collection of cosmic journeys awaits. Log in or create an account to start planning your expeditions.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-4 justify-center">
                                    <Button asChild size="lg">
                                        <Link href="/login">Login</Link>
                                    </Button>
                                    <Button variant="outline" size="lg" asChild>
                                        <Link href="/signup">Sign Up</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
