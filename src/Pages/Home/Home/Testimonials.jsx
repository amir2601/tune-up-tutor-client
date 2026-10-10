import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import Marquee from '../../../components/Shared/Animations/Marquee';
import { Reveal } from '../../../components/Shared/Animations/Reveal';

const testimonials = [
    { name: 'Jim', role: 'Guitar student', img: 'https://i.ibb.co/YP5CWx5/jim.jpg', text: 'Tune Up Tutor made learning guitar simple! Clear lessons and patient instructors — my first chords came with real confidence.' },
    { name: 'Fahim', role: 'Piano student', img: 'https://i.ibb.co/8Mh23gW/fahim.jpg', text: "Piano dreams realized. Step-by-step guidance and interactive lessons — a pianist's best ally!" },
    { name: 'Anik', role: 'Flute student', img: 'https://i.ibb.co/ZcVLfrP/anik.jpg', text: 'Flute novice to maestro. Melodies woven, air charmed — a whole new world of possibilities opened up.' },
    { name: 'Tamim', role: 'Violin student', img: 'https://i.ibb.co/pd9yx0h/tamim.jpg', text: "Violin excellence. Intuitive platform and dedicated teachers — I'm mastering my strings faster than I imagined." },
    { name: 'Razib', role: 'Drums student', img: 'https://i.ibb.co/Twv6vR1/razib.jpg', text: 'Drumming passion fuelled by Tune Up Tutor. Dynamic lessons and real feedback took me from novice to rhythmic dynamo!' },
    { name: 'Sadia', role: 'Vocal student', img: 'https://i.pravatar.cc/150?img=45', text: 'The vocal coach truly listens. My range and confidence have grown more in three months than in years of self-practice.' },
    { name: 'Nabil', role: 'Music theory', img: 'https://i.pravatar.cc/150?img=12', text: 'Theory finally clicks here. Lessons are structured, friendly and beautifully paced. Highly recommended.' },
    { name: 'Priya', role: 'Piano student', img: 'https://i.pravatar.cc/150?img=32', text: 'Booking was effortless and the instructors are world-class. Every session feels premium and personal.' },
];

const Card = ({ t }) => (
    <div className="surface hover-lift mx-3 flex w-[320px] shrink-0 flex-col gap-4 bg-base-100 p-6 sm:w-[360px]">
        <div className="flex items-center justify-between">
            <FaQuoteLeft className="text-2xl text-primary/30" />
            <div className="flex gap-1 text-warning">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
        </div>
        <p className="text-sm leading-relaxed text-base-content/70">“{t.text}”</p>
        <div className="flex items-center gap-3 border-t border-base-300/70 pt-4">
            <img className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/30" src={t.img} alt={t.name} loading="lazy" />
            <div>
                <p className="text-sm font-bold">{t.name}</p>
                <p className="text-xs text-base-content/50">{t.role}</p>
            </div>
        </div>
    </div>
);

const Testimonials = () => {
    const topRow = testimonials.slice(0, 4);
    const bottomRow = testimonials.slice(4);

    return (
        <section className="px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-2xl space-y-3 text-center">
                <span className="eyebrow mx-auto">Loved by learners</span>
                <h2 className="section-heading">What Our <span className="text-gradient">Students Say</span></h2>
                <Reveal className="flex flex-wrap items-center justify-center gap-3 pt-2" delay={0.1}>
                    <span className="inline-flex items-center gap-2 rounded-full bg-base-100 px-4 py-2 text-sm font-semibold shadow-card ring-1 ring-base-300">
                        <FaStar className="text-warning" /> 4.9/5 average
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-base-100 px-4 py-2 text-sm font-semibold shadow-card ring-1 ring-base-300">
                        <FaStar className="text-secondary" /> 2,400+ reviews
                    </span>
                </Reveal>
            </div>

            <div className="space-y-6">
                <Marquee speed="slow">
                    {topRow.map(t => <Card key={t.name} t={t} />)}
                </Marquee>
                <Marquee reverse speed="slow">
                    {bottomRow.map(t => <Card key={t.name} t={t} />)}
                </Marquee>
            </div>
        </section>
    );
};

export default Testimonials;
