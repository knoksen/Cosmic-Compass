
"use client"
import React from "react";
import Starfield from "@/components/starfield"
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CosmicDashboard from "@/components/cosmic-dashboard";
import { destinations } from "@/lib/mock-data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function StarmapPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredDestinations, setFilteredDestinations] = useState(destinations);

    useEffect(() => {
        const results = destinations.filter(dest =>
            dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dest.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dest.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredDestinations(results);
    }, [searchQuery]);

    return (
        <>
            <Starfield />
            <div className="relative z-10 flex flex-col items-center text-center space-y-12 md:space-y-16">

                 <div className="w-full max-w-xl pt-16">
                    <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-accent via-purple-400 to-white mb-4">
                        Starmap
                    </h1>
                    <form className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search for a planet, star, or galaxy..."
                        className="w-full pl-12 pr-4 py-3 text-lg rounded-full bg-card/70 backdrop-blur-sm border-border/50 h-12"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    </form>
                </div>

                <div className="w-full max-w-6xl">
                    <h2 className="text-2xl font-bold font-headline mb-6 text-left">Cosmic Dashboard</h2>
                    <CosmicDashboard />
                </div>

                <div className="w-full max-w-6xl text-left">
                    <h2 className="text-2xl font-bold font-headline mb-6">Destinations</h2>
                    {filteredDestinations.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredDestinations.map((dest) => (
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
                                <p className="text-sm text-muted-foreground mt-1 capitalize">{dest.type}</p>
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
                    ) : (
                        <p className="text-muted-foreground text-center">No destinations found for your search.</p>
                    )}
                </div>
            </div>
        </>
    )
}
