import React from 'react';
import {X} from 'lucide-react';
import Tag from "../model/Tag";
import Component from "../model/Component";
import {Button} from "./ui/Button";
import ComponentImagePreview from './ui/ComponentImagePreview.tsx';
import ComponentDescription from './ui/ComponentDescription.tsx';
import ComponentTags from './ui/ComponentTags.tsx';
import ComponentCodeCopy from './ui/ComponentCodeCopy.tsx';

interface ComponentDetailModalProps {
    component: Component;
    onClose: () => void;
    onTagClick: (tag: Tag) => void;
}

export const ComponentDetailModal: React.FC<ComponentDetailModalProps> = ({
                                                                              component,
                                                                              onClose,
                                                                              onTagClick,
                                                                          }) => {
    const imageUrl = component.image ? `${component.image}` : undefined;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
                <div
                    className="fixed inset-0 transition-opacity bg-gray-950/50 bg-opacity-75"
                    onClick={onClose}
                />

                <div
                    className="relative inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">
                                {component.title}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                by {component.username} • {new Date(component.createdAt!).toLocaleDateString()}
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 transition-colors rounded-md"
                            children={<X className="h-6 w-6"/>}
                        />
                    </div>

                    <ComponentImagePreview imageUrl={imageUrl} title={component.title} />

                    {component.description && (
                        <ComponentDescription description={component.description} />
                    )}

                    <ComponentTags tags={component.tags} onTagClick={onTagClick} />

                    <ComponentCodeCopy code={component.code} />
                </div>
            </div>
        </div>
    );
};