import React from 'react';
import { Reveal, Stagger, StaggerItem } from '../../../components/Shared/Animations/Reveal';

const instruments = [
    {
        name: 'Guitar',
        img: 'https://i.ibb.co/K6Q3XHd/guitar.png',
        text: "The guitar's strings resonate, weaving emotions into melodies that linger in the heart's chambers.",
        tint: 'from-primary/10 to-primary/0',
    },
    {
        name: 'Drum',
        img: 'https://i.ibb.co/rc6Z3GY/drum-set.png',
        text: 'Drums thunder like the heartbeat of rhythm, anchoring songs in a primal dance of sound.',
        tint: 'from-secondary/10 to-secondary/0',
    },
    {
        name: 'Flute',
        img: 'https://i.ibb.co/QX73Nys/flute.png',
        text: "The flute's delicate whispers carry dreams upon notes that flutter like a bird's song in the breeze.",
        tint: 'from-accent/10 to-accent/0',
    },
    {
        name: 'Violin',
        img: 'https://i.ibb.co/2vvLXYF/violin.png',
        text: "The violin's lament weaves tales of longing and passion, its strings echoing the human soul.",
        tint: 'from-warning/10 to-warning/0',
    },
];

const AboutTheInstruments = () => {
    return (
        <section className="px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-2xl space-y-3 text-center">
                <span className="eyebrow mx-auto">Dedication to Teaching</span>
                <h2 className="section-heading">About the <span className="text-gradient">Instruments</span></h2>
                <p className="text-base-content/60">Unlock your musical journey with expert guidance.</p>
            </Reveal>

            <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
                {instruments.map(instrument => (
                    <StaggerItem
                        key={instrument.name}
                        className={`group surface hover-lift card-shine flex flex-col items-center overflow-hidden bg-gradient-to-b ${instrument.tint} bg-base-100 p-6 text-center`}
                    >
                        <div className="grid h-28 w-full place-items-center">
                            <img
                                className="max-h-24 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105"
                                src={instrument.img}
                                alt={instrument.name}
                                loading="lazy"
                            />
                        </div>
                        <h3 className="mt-4 text-xl font-bold text-primary">{instrument.name}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-base-content/60">{instrument.text}</p>
                    </StaggerItem>
                ))}
            </Stagger>
        </section>
    );
};

export default AboutTheInstruments;
