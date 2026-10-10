import React from 'react';
import Marquee from '../../../components/Shared/Animations/Marquee';
import { Stagger, StaggerItem } from '../../../components/Shared/Animations/Reveal';

const partners = [
    { name: 'Avash', img: 'https://i.ibb.co/LxGGmcL/avash.png' },
    { name: 'Shironamhin', img: 'https://i.ibb.co/zJfyJkZ/shironamhin.png' },
    { name: 'Nemesis', img: 'https://i.ibb.co/k3mpnHT/nemesis.png' },
    { name: 'Chirkut', img: 'https://i.ibb.co/RcF42gb/chirkut.png' },
    { name: 'Artcell', img: 'https://i.ibb.co/rQF1zS3/artcell.png' },
];

const Logo = ({ partner }) => (
    <div className="mx-3 flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl border border-base-300/70 bg-base-100 p-6 shadow-card grayscale transition-all duration-300 hover:-translate-y-1 hover:grayscale-0 hover:shadow-glow">
        <img className="max-h-14 w-auto object-contain" src={partner.img} alt={partner.name} loading="lazy" />
    </div>
);

const Partners = () => {
    return (
        <section className="space-y-4 px-4 sm:px-6 lg:px-8">
            <Stagger className="mx-auto max-w-2xl space-y-3 text-center">
                <StaggerItem direction="none"><span className="eyebrow mx-auto">Trusted by</span></StaggerItem>
                <StaggerItem direction="none">
                    <h2 className="section-heading">Our <span className="text-gradient">Partners</span></h2>
                </StaggerItem>
                <StaggerItem direction="none">
                    <p className="text-base-content/60">Collaborating with studios, labels and artists across the industry.</p>
                </StaggerItem>
            </Stagger>

            <Marquee speed="slow">
                {partners.map(partner => <Logo key={partner.name} partner={partner} />)}
            </Marquee>
        </section>
    );
};

export default Partners;
