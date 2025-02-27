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
import UserProfileCard from "../components/ui/UserProfileCard.tsx";
import NoComponentsMessage from "../components/ui/NoComponentsMessage.tsx";

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
                <UserProfileCard username={user.username} email={user.email} />

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
                        <NoComponentsMessage description="You haven't posted any components yet." />
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