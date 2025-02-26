import React from "react";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
    onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => {
    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete();
    };

    return (
        <button
            onClick={handleDeleteClick}
            className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors duration-200 text-red-600 cursor-pointer"
            aria-label="Delete component"
        >
            <Trash2 size={16} />
        </button>
    );
};

export default DeleteButton;