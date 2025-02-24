import React from "react";
import {ImageIcon} from "lucide-react";
import Component from "../model/Component.ts";

interface ComponentCardProps {
  component: Component;
  onClick: () => void;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({ component, onClick }) => {
  const imageUrl = component.image ? `${component.image}` : null;

  return (
      <div
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer overflow-hidden"
          onClick={onClick}
      >
        <div className="relative w-full pt-[56.25%]">
          {imageUrl ? (
              <img
                  src={imageUrl}
                  alt={component.title}
                  className="absolute inset-0 w-full h-full object-cover"
              />
          ) : (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {component.title}
            </h3>
            <div className="text-sm text-gray-500">
              {new Date(component.createdAt!).toLocaleDateString()}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {component.tags.map((tag) => (
                  <span
                      key={tag.id}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                {tag.name}
              </span>
              ))}
            </div>
            <div className="text-sm text-gray-500">
              by {component.username}
            </div>
          </div>
        </div>
      </div>
  );
};