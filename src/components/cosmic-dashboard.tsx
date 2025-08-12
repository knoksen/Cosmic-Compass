import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Satellite, Telescope, Rocket } from "lucide-react";

const stats = [
    {
        icon: <Users className="h-8 w-8 text-accent" />,
        title: "Astronauts in Space",
        value: "10",
        description: "Currently orbiting Earth",
    },
    {
        icon: <Satellite className="h-8 w-8 text-accent" />,
        title: "Active Satellites",
        value: "9,000+",
        description: "In various orbits",
    },
    {
        icon: <Telescope className="h-8 w-8 text-accent" />,
        title: "Exoplanets Discovered",
        value: "5,500+",
        description: "And counting",
    },
    {
        icon: <Rocket className="h-8 w-8 text-accent" />,
        title: "Next Launch",
        value: "2d 14h",
        description: "Starlink Mission",
    }
];

export default function CosmicDashboard() {
    return (
        <div className="w-full max-w-6xl">
            <h2 className="text-2xl font-bold font-headline mb-6 text-left">Cosmic Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.title} className="bg-card/70 backdrop-blur-sm border-border/50 text-left">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                            {stat.icon}
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">{stat.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
