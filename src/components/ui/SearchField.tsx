import {Input} from "./Input.tsx";
import {Search} from "lucide-react";
import React from "react";

interface searchProps {
    searchQuery: string;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchField: React.FC<searchProps> = ({searchQuery, handleSearchChange}) => {
    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"/>
            <Input
                type="text"
                placeholder="SearchField components..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10"
            />
        </div>
    );
}