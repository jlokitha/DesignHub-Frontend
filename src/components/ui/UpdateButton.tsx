import React from "react";
import { Edit2 } from "lucide-react";

interface UpdateButtonProps {
    onUpdate: () => void;
}

const UpdateButton: React.FC<UpdateButtonProps> = ({ onUpdate }) => {
    const handleUpdateClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onUpdate();
    };

    return (
        <button
            onClick={handleUpdateClick}
            className="p-2 bg-white rounded-full shadow-md hover:bg-blue-100 transition-colors duration-200 text-blue-600 cursor-pointer"
            aria-label="Edit component"
        >
            <Edit2 size={16} />
        </button>
    );
};

export default UpdateButton;