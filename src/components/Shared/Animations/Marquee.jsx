import React from 'react';

/**
 * Seamless infinite marquee. Renders its children twice inside two equal
 * halves and translates -50% for a continuous loop. Pauses on hover.
 */
const Marquee = ({
    children,
    reverse = false,
    speed = 'normal',
    pauseOnHover = true,
    className = '',
    itemClassName = '',
    fade = true,
}) => {
    const animClass = reverse ? 'animate-marquee-reverse' : 'animate-marquee';
    const speedClass = speed === 'slow' ? '[animation-duration:65s]' : speed === 'fast' ? '[animation-duration:22s]' : '';

    const Half = ({ hidden }) => (
        <div
            className={`flex w-max shrink-0 items-center ${itemClassName}`}
            aria-hidden={hidden || undefined}
        >
            {children}
        </div>
    );

    return (
        <div className={`group relative flex overflow-hidden py-8 ${fade ? 'marquee-mask' : ''} ${className}`}>
            <div
                className={`will-move flex w-max ${animClass} ${speedClass} ${
                    pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
                }`}
            >
                <Half />
                <Half hidden />
            </div>
        </div>
    );
};

export default Marquee;
