import React from 'react';

interface DescriptionSectionProps {
    description: string;
}

const ComponentDescription: React.FC<DescriptionSectionProps> = ({ description }) => (
    <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default ComponentDescription;