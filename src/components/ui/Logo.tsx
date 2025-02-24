import {Code} from "lucide-react";

export function Logo() {
    return (
        <div className="flex items-center space-x-3">
            <Code className="h-8 w-8 text-blue-600"/>
            <h1 className="text-2xl font-bold text-gray-900 hidden sm:inline">DesignHub</h1>
        </div>
    );
}