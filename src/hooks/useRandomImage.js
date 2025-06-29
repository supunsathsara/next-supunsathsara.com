import { useState, useEffect } from "react";

const useRandomImage = (images) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * images.length);
        setCurrentImageIndex(randomIndex);
    }, [images.length]);

    return images[currentImageIndex];
};

export default useRandomImage;
