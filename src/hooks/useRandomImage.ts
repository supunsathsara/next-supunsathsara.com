import { useState } from "react";

const useRandomImage = (images: string[]): string => {
    const [currentImageIndex] = useState<number>(
        () => Math.floor(Math.random() * images.length)
    );

    return images[currentImageIndex];
};

export default useRandomImage;
