
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDestinationById } from '@/lib/mock-data';
import Starfield from '@/components/starfield';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Waves, Globe, ChevronsRight, Shield, Gauge } from 'lucide-react';
import * as Tone from 'tone';
import { cn } from '@/lib/utils';

const milestones = [
    { t: 0, label: "Hyperspace Entry", icon: <ChevronsRight className="h-8 w-8 text-accent" /> },
    { t: 0.1, label: "Navigate Channel", icon: <Waves className="h-8 w-8 text-accent" /> },
    { t: 0.5, label: "Stabilize Field", icon: <Shield className="h-8 w-8 text-accent" /> },
    { t: 0.9, label: "Realspace Emerge", icon: <Gauge className="h-8 w-8 text-accent" /> },
    { t: 1, label: "Arrived at Destination", icon: <Globe className="h-8 w-8 text-accent" /> },
];

export default function JumpPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const destination = getDestinationById(params.id);
    const [progress, setProgress] = useState(0);
    const [currentMilestoneIndex, setCurrentMilestoneIndex] = useState(0);

    const travelDuration = 8000; // 8 seconds

    useEffect(() => {
        let synth: Tone.MembraneSynth;
        let noise: Tone.Noise;
        let filter: Tone.AutoFilter;
        let lfo: Tone.LFO;
        let gain: Tone.Gain;

        const startAudio = async () => {
            await Tone.start();
            
            gain = new Tone.Gain(0.6).toDestination();
            synth = new Tone.MembraneSynth({
                octaves: 4,
                pitchDecay: 0.1,
            }).connect(gain);

            noise = new Tone.Noise("pink").start();
            filter = new Tone.AutoFilter({
                frequency: "2n",
                baseFrequency: 200,
                octaves: 4,
            }).toDestination().start();
            noise.connect(filter);
            
            lfo = new Tone.LFO("4n", 400, 4000);
            lfo.connect(filter.baseFrequency);
            lfo.start();

            return { synth, noise, filter, lfo };
        };

        const audioContext = startAudio();

        const interval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + (100 / (travelDuration / 100));
                if (newProgress >= 100) {
                    clearInterval(interval);
                    audioContext.then(({ lfo, synth }) => {
                        lfo.stop();
                        synth.triggerAttackRelease("C1", "1s", Tone.now());
                    });
                    setTimeout(() => router.push(`/destination/${params.id}`), 1500);
                    return 100;
                }
                
                audioContext.then(({ lfo, synth }) => {
                    const pulseRate = 4 + (newProgress / 100) * 12; // from 4n to 16n
                    lfo.frequency.value = pulseRate;
                    if(Math.random() < 0.1) {
                         synth.triggerAttackRelease("C1", "8n", Tone.now(), Math.random() * 0.5 + 0.5);
                    }
                });


                const nextMilestone = milestones[currentMilestoneIndex + 1];
                if (nextMilestone && newProgress / 100 >= nextMilestone.t) {
                    setCurrentMilestoneIndex(i => i + 1);
                    audioContext.then(() => {
                         const milestoneSynth = new Tone.Synth().toDestination();
                         milestoneSynth.triggerAttackRelease("G4", "0.2s", Tone.now() + 0.1);
                         setTimeout(() => milestoneSynth.dispose(), 300);
                    });
                }
                
                return newProgress;
            });
        }, 100);

        return () => {
            clearInterval(interval);
            audioContext.then(({ synth, noise, filter, lfo }) => {
                synth?.dispose();
                noise?.dispose();
                filter?.dispose();
                lfo?.dispose();
                gain?.dispose();
            });
        };
    }, [params.id, router, currentMilestoneIndex]);

    if (!destination) {
        return <div className="text-center py-20">Destination not found.</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center h-full w-full text-center">
            <Starfield warp={1} />
            <div className="relative z-10 bg-background/50 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-primary/20 max-w-4xl w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold font-headline mb-2">
                        Hyperspace jump to <span className="text-accent">{destination.name}</span>
                    </h1>
                    <p className="text-muted-foreground">Follow the progress of your transit.</p>
                </div>
                
                <div className="relative w-full mb-12">
                    <Progress value={progress} className="w-full h-2 bg-primary/20" />
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
                            index === currentMilestoneIndex ? "bg-primary/30 scale-105" : "opacity-50"
                        )}>
                            <div className="w-16 h-16 bg-card/50 rounded-full flex items-center justify-center border border-transparent">
                                {milestone.icon}
                            </div>
                            <span className={cn(
                                "font-semibold text-sm",
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
