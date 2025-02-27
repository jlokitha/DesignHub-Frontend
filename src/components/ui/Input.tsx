import React from 'react';
import {cn} from '../../util/utils.ts';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({
                                                className,
                                                label,
                                                error,
                                                ...props
                                            }) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                className={cn(
                    "w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500",
                    error && "border-red-500 focus:border-red-500 focus:ring-red-500",
                    className
                )}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}