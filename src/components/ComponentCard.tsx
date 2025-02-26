import React, {useEffect, useState} from "react";
import Component from "../model/Component.ts";
import UpdateButton from "./ui/UpdateButton.tsx";
import DeleteButton from "./ui/DeleteButton.tsx";

interface ComponentCardProps {
    component: Component;
    onClick: () => void;
    onUpdate?: () => void;
    onDelete?: () => void;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({
                                                                component,
                                                                onClick,
                                                                onUpdate,
                                                                onDelete
                                                            }) => {
    const [imageUrl, setImageUrl] = useState<string | undefined>(component.image ? `${component.image}` : undefined);

    useEffect(() => {
        setImageUrl(component.image ? `${component.image}` : undefined);
    }, [component.image]);

    return (
        <div
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer overflow-hidden relative group"
            onClick={onClick}
        >
            {/* Action buttons - only shown when methods are provided */}
            {(onUpdate || onDelete) && (
                <div
                    className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    {onUpdate && <UpdateButton onUpdate={onUpdate}/>}
                    {onDelete && <DeleteButton onDelete={onDelete}/>}
                </div>
            )}

            <div className="relative w-full pt-[56.25%]">
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={component.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}
            </div>

            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                        {component.title}
                    </h3>
                    <div className="text-sm text-gray-500">
                        {new Date(component.createdAt!).toLocaleDateString()}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                        {component.tags.map((tag) => (
                            <span
                                key={tag.id}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                                {tag.name}
                            </span>
                        ))}
                    </div>
                    <div className="text-sm text-gray-500">
                        by {component.username}
                    </div>
                </div>
            </div>
        </div>
    );
};