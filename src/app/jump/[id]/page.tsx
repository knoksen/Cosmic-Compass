"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDestinationById } from '@/lib/mock-data';
import Starfield from '@/components/starfield';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Rocket } from 'lucide-react';
import * as Tone from 'tone';

const milestones = [
    { t: 0, label: "Engage FTL Drive" },
    { t: 0.1, label: "Passing Oort Cloud" },
    { t: 0.5, label: "Entering Interstellar Medium" },
    { t: 0.9, label: "Arrival Burn" },
    { t: 1, label: "Arrived at Destination" },
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
                    router.push(`/destination/${params.id}`);
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

    return (
        <div className="flex flex-col items-center justify-center h-full w-full text-center">
            <Starfield warp={1} />
            <div className="relative z-10 bg-background/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-primary/20 max-w-3xl w-full">
                <h1 className="text-3xl md:text-4xl font-bold font-headline mb-2">
                    Jumping to <span className="text-primary">{destination.name}</span>
                </h1>
                <p className="text-muted-foreground mb-8">Estimated travel time: {travelDuration / 1000} seconds.</p>

                <Progress value={progress} className="w-full h-4 mb-8" />
                
                <div className="text-left space-y-4">
                    {milestones.map((milestone, index) => (
                        <div key={milestone.label} className={`flex items-center gap-4 transition-opacity duration-500 ${index <= currentMilestoneIndex ? 'opacity-100' : 'opacity-40'}`}>
                            {index <= currentMilestoneIndex ? (
                                <CheckCircle className="h-6 w-6 text-green-500 shrink-0" />
                            ) : (
                                <Rocket className="h-6 w-6 text-muted-foreground shrink-0" />
                            )}
                            <span className={`text-lg ${index === currentMilestoneIndex ? 'font-bold text-primary-foreground' : 'text-muted-foreground'}`}>
                                {milestone.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
