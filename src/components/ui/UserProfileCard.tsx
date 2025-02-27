import React from 'react';
import { User, Mail } from 'lucide-react';

interface UserProfileCardProps {
    username: string;
    email: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ username, email }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-blue-600"/>
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-1">
                                {username || 'User Name'}
                            </h2>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center text-gray-600">
                                <Mail className="w-4 h-4 mr-2 flex-shrink-0"/>
                                <h3 className="line-clamp-1">{email || 'email@example.com'}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileCard;