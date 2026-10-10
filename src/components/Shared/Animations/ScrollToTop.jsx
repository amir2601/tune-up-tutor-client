import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets scroll to the top on route change, while honouring in-page hash
 * anchors (e.g. /#gallery) by scrolling the matching element into view.
 */
const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = decodeURIComponent(hash.slice(1));
            const target = document.getElementById(id);
            if (target) {
                const timer = setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 90);
                return () => clearTimeout(timer);
            }
        }
        window.scrollTo({ top: 0, left: 0 });
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
