import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from './Button';

interface CodeCopySectionProps {
    code: string;
}

const ComponentCodeCopy: React.FC<CodeCopySectionProps> = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-700">Code</h4>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyCode}
                    className="flex items-center space-x-1 rounded-md"
                >
                    {copied ? (
                        <>
                            <Check className="h-4 w-4" />
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="h-4 w-4" />
                            <span>Copy code</span>
                        </>
                    )}
                </Button>
            </div>
            <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <code className="text-gray-100 text-sm font-mono">
                    {code}
                </code>
            </pre>
        </div>
    );
};

export default ComponentCodeCopy;