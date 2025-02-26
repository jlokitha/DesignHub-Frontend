import React from 'react';
import {AlertTriangle, X} from 'lucide-react';
import {Button} from './ui/Button.tsx';

interface DeleteConfirmationModalProps {
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    isDeleting?: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
                                                                             onClose,
                                                                             onConfirm,
                                                                             title,
                                                                             isDeleting = false,
                                                                         }) => {
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
                <div
                    className="fixed inset-0 transition-opacity bg-gray-950/50 bg-opacity-50"
                    onClick={onClose}
                    aria-hidden="true"
                />

                <div
                    className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
                                <AlertTriangle className="w-6 h-6 text-red-600"/>
                            </div>
                            <h3 className="ml-3 text-lg font-medium leading-6 text-gray-900">Delete Component</h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 transition-colors"
                            disabled={isDeleting}
                        >
                            <X className="w-5 h-5"/>
                        </button>
                    </div>

                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Are you sure you want to delete <span className="font-medium text-gray-700">"{title}"</span>?
                            This action cannot be undone.
                        </p>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            disabled={isDeleting}
                            className="rounded-md"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={onConfirm}
                            isLoading={isDeleting}
                            className="bg-red-600 hover:bg-red-700 text-white rounded-md"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;