import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { Reveal } from '../../../components/Shared/Animations/Reveal';

const faqs = [
    {
        q: 'What instruments can I learn on this website?',
        a: 'Our website offers a wide range of instruments for learning, including piano, guitar, drums, violin, flute, saxophone, and more. You can explore different instruments and choose the one that interests you the most.',
    },
    {
        q: 'Do I need any prior musical experience to start learning?',
        a: "No, our website caters to learners of all levels, from absolute beginners to advanced musicians. Whether you're starting from scratch or looking to improve your skills, our lessons are designed to meet your needs.",
    },
    {
        q: 'Are the lessons taught by qualified instructors?',
        a: 'Absolutely! Our lessons are created and taught by experienced musicians and certified instructors. They have a deep understanding of music theory, technique, and performance, ensuring you receive high-quality instruction.',
    },
    {
        q: 'Can I learn music theory on this website?',
        a: 'Yes, we have dedicated lessons and resources for music theory. Learning music theory can greatly enhance your understanding of music and help you become a more well-rounded musician.',
    },
    {
        q: 'How do payments and refunds work?',
        a: 'Checkout is handled securely through Stripe. If a class does not meet your expectations within the first week, reach out to our support team and we will arrange a full refund — no questions asked.',
    },
    {
        q: 'Can I switch instructors or reschedule a lesson?',
        a: 'Of course. You can reschedule any upcoming lesson from your dashboard, and switching instructors is just a request away. We want your learning journey to feel completely effortless.',
    },
];

const Faq = () => {
    return (
        <section className="my-8 px-4 md:px-0">
            <div className="mx-auto mb-12 max-w-2xl space-y-3 text-center">
                <span className="eyebrow mx-auto">Need help?</span>
                <h2 className="section-heading">Frequently Asked <span className="text-gradient">Questions</span></h2>
                <p className="text-base-content/60">Everything you need to know before your first lesson.</p>
            </div>

            <div className="grid items-start gap-10 lg:grid-cols-2">
                <Reveal direction="left" className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={faq.q} tabIndex={0} className="collapse collapse-plus surface bg-base-100 transition-shadow duration-300 focus:shadow-glow">
                            <div className="collapse-title flex items-center gap-3 pr-10 text-base font-semibold sm:text-lg">
                                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-extrabold text-primary">
                                    {i + 1}
                                </span>
                                {faq.q}
                            </div>
                            <div className="collapse-content">
                                <p className="pl-10 text-sm leading-relaxed text-base-content/70">{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </Reveal>

                <Reveal direction="right" className="relative hidden lg:block">
                    <div className="sticky top-28 space-y-6">
                        <div className="relative">
                            <div className="absolute -inset-6 -z-10 rounded-4xl bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/15 blur-2xl" />
                            <img
                                className="mx-auto w-full max-w-md rounded-4xl shadow-card"
                                src="https://i.ibb.co/RzkXT5r/Playing-Music-bro.png"
                                alt="Learning music"
                                loading="lazy"
                            />
                        </div>

                        <div className="surface flex items-center gap-4 bg-base-100 p-5">
                            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-xl text-white shadow-soft">
                                <FaQuestionCircle />
                            </span>
                            <div className="flex-1">
                                <p className="font-bold">Still have questions?</p>
                                <p className="text-sm text-base-content/60">Our team replies within a few hours.</p>
                            </div>
                            <a href="mailto:hello@tuneuptutor.com" className="btn btn-primary btn-sm rounded-full">Ask us</a>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default Faq;
