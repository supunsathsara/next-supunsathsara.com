import { useState } from "react";

const useRandomImage = (images: string[]): string | undefined => {
    const [currentImageIndex] = useState<number>(
        () => images.length > 0 ? Math.floor(Math.random() * images.length) : -1
    );

    return currentImageIndex >= 0 ? images[currentImageIndex] : undefined;
};

export default useRandomImage;
