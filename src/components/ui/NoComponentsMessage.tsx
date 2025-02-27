import React from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {Button} from "./Button.tsx";

interface NoComponentsMessageProps {
    description: string;
}

const NoComponentsMessage: React.FC<NoComponentsMessageProps> = ({description}) => {
    const navigate = useNavigate();

    return (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-gray-400"/>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No components yet</h3>
            <p className="text-gray-500 mb-4">
                {description}
            </p>
            <Button onClick={() => navigate('/')}>
                Browse Components
            </Button>
        </div>
    );
};

export default NoComponentsMessage;