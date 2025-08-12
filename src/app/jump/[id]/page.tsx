"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDestinationById } from '@/lib/mock-data';
import Starfield from '@/components/starfield';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Orbit, Waves, Atom, UnfoldVertical, Globe } from 'lucide-react';
import * as Tone from 'tone';
import { cn } from '@/lib/utils';

const milestones = [
    { t: 0, label: "Enter Event Horizon", icon: <Orbit className="h-8 w-8 text-accent" /> },
    { t: 0.1, label: "Navigating Singularity", icon: <Waves className="h-8 w-8 text-accent" /> },
    { t: 0.5, label: "Quantum Tunneling", icon: <Atom className="h-8 w-8 text-accent" /> },
    { t: 0.9, label: "Exit Manifold", icon: <UnfoldVertical className="h-8 w-8 text-accent" /> },
    { t: 1, label: "Arrived at Destination", icon: <Globe className="h-8 w-8 text-accent" /> },
];

export default function JumpPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const destination = getDestinationById(params.id);
    const [progress, setProgress] = useState(0);
    const [currentMilestoneIndex, setCurrentMilestoneIndex] = useState(0);

    const travelDuration = 8000; // 8 seconds

    useEffect(() => {
        let synth: Tone.Synth;
        let noise: Tone.Noise;
        let filter: Tone.AutoFilter;

        const startAudio = async () => {
            await Tone.start();
            
            synth = new Tone.Synth().toDestination();
            noise = new Tone.Noise("pink").start();
            filter = new Tone.AutoFilter("4n").toDestination().start();
            noise.connect(filter);

            synth.triggerAttackRelease("C2", "1s");
            
            return { synth, noise, filter };
        };

        const audioContext = startAudio();

        const interval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + (100 / (travelDuration / 100));
                if (newProgress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => router.push(`/destination/${params.id}`), 1000);
                    return 100;
                }
                
                const nextMilestone = milestones[currentMilestoneIndex + 1];
                if (nextMilestone && newProgress / 100 >= nextMilestone.t) {
                    setCurrentMilestoneIndex(i => i + 1);
                    audioContext.then(({synth}) => {
                        synth.triggerAttackRelease("G4", "0.2s", Tone.now() + 0.1);
                    });
                }
                
                return newProgress;
            });
        }, 100);

        return () => {
            clearInterval(interval);
            audioContext.then(({ synth, noise, filter }) => {
                synth.dispose();
                noise.dispose();
                filter.dispose();
            });
        };
    }, [params.id, router, currentMilestoneIndex]);

    if (!destination) {
        return <div className="text-center py-20">Destination not found.</div>;
    }
    
    const currentMilestone = milestones[currentMilestoneIndex];

    return (
        <div className="flex flex-col items-center justify-center h-full w-full text-center">
            <Starfield warp={1} />
            <div className="relative z-10 bg-background/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-primary/20 max-w-4xl w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold font-headline mb-2">
                        Traversing wormhole to <span className="text-accent">{destination.name}</span>
                    </h1>
                    <p className="text-muted-foreground">Follow the progress of your transit.</p>
                </div>
                
                <div className="relative w-full mb-12">
                    <Progress value={progress} className="w-full h-2" />
                    <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between">
                         {milestones.map((milestone, index) => (
                           <div key={index} className="relative">
                                <div className={cn(
                                    "h-6 w-6 rounded-full bg-secondary border-2 flex items-center justify-center transition-all duration-300",
                                    progress / 100 >= milestone.t ? "border-accent bg-primary" : "border-muted"
                                )}>
                                   {progress / 100 >= milestone.t && <CheckCircle className="h-4 w-4 text-green-400" />}
                                </div>
                           </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
                     {milestones.map((milestone, index) => (
                        <div key={index} className={cn(
                            "flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-300",
                            index === currentMilestoneIndex ? "bg-primary/20 scale-105" : "opacity-50"
                        )}>
                            <div className="w-16 h-16 bg-card/50 rounded-full flex items-center justify-center">
                                {milestone.icon}
                            </div>
                            <span className={cn(
                                "font-semibold",
                                index === currentMilestoneIndex && "text-primary-foreground"
                            )}>
                                {milestone.label}
                            </span>
                        </div>
                     ))}
                </div>
            </div>
        </div>
    );
}
