import React from 'react';
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
    code: string;
    setCode: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode }) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                Code
            </label>
            <div className="rounded-md border border-gray-300 overflow-hidden">
                <Editor
                    height="400px"
                    defaultLanguage="javascript"
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        tabSize: 2,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        wordWrap: 'on',
                        lineNumbers: 'on',
                        folding: true,
                        bracketPairColorization: {
                            enabled: true
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default CodeEditor;