import { useEffect } from "react"

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - Tune-Up-Tutor`;
    }, [title])
};

export default useTitle;