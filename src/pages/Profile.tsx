import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {User, Mail, Calendar, ArrowLeft, LogOut} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {ComponentCard} from "../components/ComponentCard.tsx";
import {AppDispatch, RootState} from "../store/store.ts";
import {deleteComponent, getComponents} from "../reducers/Component-slice.ts";
import {Button} from '../components/ui/Button.tsx';
import Component from "../model/Component.ts";
import {ComponentDetailModal} from "../components/ComponentDetailModal.tsx";
import {logOUtUser} from "../reducers/User-slice.ts";
import {ComponentSubmissionModal} from "../components/ComponentSubmissionModal.tsx";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal.tsx";

export const Profile: React.FC = () => {
    const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
    const [showSubmissionModal, setShowSubmissionModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [updateComponent, setUpdateComponent] = useState<Component | null>(null);
    const [selectDeleteComponent, setSelectDeleteComponent] = useState<Component | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const allComponents = useSelector((state: RootState) => state.componentReducer);

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Filter components to only show user's posts
    const userComponents = allComponents.filter(component => component.userId === user.id);

    useEffect(() => {
        dispatch(getComponents());
    }, []);

    const handleLogout = () => {
        dispatch(logOUtUser());
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Button
                                variant="ghost"
                                onClick={() => navigate('/')}
                                className="mr-4 rounded-md"
                            >
                                <ArrowLeft className="h-5 w-5"/>
                            </Button>
                            <h1 className="text-xl font-bold text-gray-900 hidden sm:block">My Profile</h1>
                        </div>

                        {/* Modern Logout Button */}
                        <Button
                            onClick={handleLogout}
                            className="rounded-md flex items-center space-x-2 bg-red-50 cursor-pointer hover:bg-red-100"
                        >
                            <LogOut className="h-4 w-4 text-red-600"/>
                            <span className="text-red-600">Logout</span>
                        </Button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Profile Section */}
                <div className="bg-white rounded-lg shadow-sm mb-8">
                    <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="w-10 h-10 text-blue-600"/>
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        {user.username || 'User Name'}
                                    </h2>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center text-gray-600">
                                        <Mail className="w-4 h-4 mr-2 flex-shrink-0"/>
                                        <span className="truncate">{user.email || 'email@example.com'}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Calendar className="w-4 h-4 mr-2 flex-shrink-0"/>
                                        <span>Joined {new Date(Date.now()).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User's Components Section */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                        My Components ({userComponents.length})
                    </h3>

                    {userComponents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userComponents.map((component) => (
                                <ComponentCard
                                    key={component.id}
                                    component={component}
                                    onClick={() => setSelectedComponent(component)}
                                    onUpdate={() => {
                                        setUpdateComponent(component)
                                        setShowSubmissionModal(true)
                                    }}
                                    onDelete={() => {
                                        setSelectDeleteComponent(component)
                                        setShowDeleteModal(true)
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                            <div
                                className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <User className="w-8 h-8 text-gray-400"/>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No components yet</h3>
                            <p className="text-gray-500 mb-4">
                                You haven't posted any components yet.
                            </p>
                            <Button onClick={() => navigate('/')}>
                                Browse Components
                            </Button>
                        </div>
                    )}
                </div>

                {/* Component Detail Modal */}
                {selectedComponent && (
                    <ComponentDetailModal
                        component={selectedComponent}
                        onClose={() => setSelectedComponent(null)}
                        onTagClick={() => {
                        }}
                    />
                )}

                {/* Component Submission Modal */}
                {showSubmissionModal && (
                    <ComponentSubmissionModal
                        onClose={() => setShowSubmissionModal(false)}
                        isUpdate={true}
                        existingComponent={updateComponent!}
                    />
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <DeleteConfirmationModal
                        title={selectDeleteComponent!.title}
                        onClose={() => setShowDeleteModal(false)}
                        onConfirm={() => {
                            dispatch(deleteComponent(selectDeleteComponent!.id!))
                            setShowDeleteModal(false)
                        }}
                    />
                )}
            </div>
        </div>
    );
};