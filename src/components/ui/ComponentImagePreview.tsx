import React, { useState } from 'react';
import { ImageIcon } from 'lucide-react';

interface ImagePreviewProps {
    imageUrl: string | undefined;
    title: string;
}

const ComponentImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, title }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="mb-6 relative overflow-hidden rounded-lg bg-gray-100">
            {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                </div>
            )}
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={title}
                    className={`w-full h-[400px] object-cover transition-all duration-300 hover:scale-105 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                />
            )}
        </div>
    );
};

export default ComponentImagePreview;