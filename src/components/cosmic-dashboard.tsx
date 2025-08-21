import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Satellite, Telescope, Rocket, Star, Bot, Sigma, Atom } from "lucide-react";

const stats = [
    {
        icon: <Star className="h-8 w-8 text-accent" />,
        title: "Observable Galaxies",
        value: "2 Trillion",
        description: "Estimated in our universe",
    },
    {
        icon: <Sigma className="h-8 w-8 text-accent" />,
        title: "Largest Known Star",
        value: "Stephenson 2-18",
        description: "By radius",
    },
    {
        icon: <Telescope className="h-8 w-8 text-accent" />,
        title: "Exoplanets Discovered",
        value: "5,500+",
        description: "And counting",
    },
    {
        icon: <Atom className="h-8 w-8 text-accent" />,
        title: "Most Distant Object",
        value: "JADES-GS-z13-0",
        description: "A distant galaxy",
    }
];

export default function CosmicDashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <Card key={stat.title} className="bg-card/70 backdrop-blur-sm border-border/50 text-left p-2">
                     <CardContent className="p-4 flex items-start gap-4">
                        {stat.icon}
                        <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                            <p className="text-3xl font-bold">{stat.value}</p>
                            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
