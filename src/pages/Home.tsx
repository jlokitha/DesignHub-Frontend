import React, {useState, useEffect} from 'react';
import {Plus, User} from 'lucide-react';
import {ComponentCard} from "../components/ComponentCard.tsx";
import {TagSelect} from "../components/TagSelect.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {getComponents} from "../reducers/Component-slice.ts";
import Component from "../model/Component.ts";
import Tag from "../model/Tag.ts";
import {Button} from "../components/ui/Button.tsx";
import {findAllTags} from "../reducers/Tag-slice.ts";
import {Logo} from "../components/ui/Logo.tsx";
import {NoResults} from "../components/ui/NoResults.tsx";
import {SearchField} from "../components/ui/SearchField.tsx";
import {ComponentDetailModal} from "../components/ComponentDetailModal.tsx";
import {ComponentSubmissionModal} from "../components/ComponentSubmissionModal.tsx";

export const Home: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
    const [showSubmissionModal, setShowSubmissionModal] = useState(false);

    const components = useSelector((state: RootState) => state.componentReducer);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getComponents());
        dispatch(findAllTags());
    }, [])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
    };

    const handleSubmitComponent = () => {
        setShowSubmissionModal(true);
    };

    const filteredComponents = components.filter(component => {
        const matchesSearch = searchQuery === '' ||
            component.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            component.description?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTags = selectedTags.length === 0 ||
            selectedTags.every(tag => component.tags.some(componentTag => componentTag.id === tag.id));

        return matchesSearch && matchesTags;
    });

    const handleTagClick = (tag: Tag) => {
        if (!selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag]);
        }
        setSelectedComponent(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Logo/>
                        <div className="flex items-center space-x-4">
                            <Button
                                onClick={handleSubmitComponent}
                                className="flex items-center rounded-sm"
                            >
                                <Plus className="h-4 w-4 m-0"/>
                                <span className="hidden sm:inline ml-2">Submit Component</span>
                            </Button>
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center cursor-pointer">
                                <User className="w-5 h-5 text-blue-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* SearchField and Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1">
                        <SearchField
                            searchQuery={searchQuery}
                            handleSearchChange={handleSearchChange}
                        />
                    </div>
                    <div className="w-full md:w-72">
                        <TagSelect
                            placeholder="Filter by tags..."
                            limit={1}
                            selectedTags={selectedTags}
                            setSelectedTags={setSelectedTags}
                        />
                    </div>
                </div>

                {/* Component Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredComponents.map((component) => (
                        <ComponentCard
                            key={component.id}
                            component={component}
                            onClick={() => setSelectedComponent(component)}
                        />
                    ))}
                </div>

                {filteredComponents.length === 0 && (
                   <NoResults/>
                )}

                {/* Component Detail Modal */}
                {selectedComponent && (
                    <ComponentDetailModal
                        component={selectedComponent}
                        onClose={() => setSelectedComponent(null)}
                        onTagClick={handleTagClick}
                    />
                )}

                {/* Component Submission Modal */}
                {showSubmissionModal && (
                    <ComponentSubmissionModal
                        onClose={() => setShowSubmissionModal(false)}
                    />
                )}
            </div>
        </div>
    );
};