import React from 'react';
import { Search, Filter, RotateCcw, X } from 'lucide-react';

export default function SearchFilters({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedWorkMode,
  onWorkModeChange,
  onResetFilters,
  totalResults
}) {
  const hasActiveFilters = searchTerm !== '' || selectedType !== 'all' || selectedWorkMode !== 'all';

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm mb-6 space-y-4">
      {/* Top Bar: Search Input */}
      <div className="relative flex items-center">
        <Search className="w-5 h-5 absolute left-3.5 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title, skills (e.g. React, Python), or company..."
          className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3.5 text-gray-400 hover:text-gray-600 p-1"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Selectors Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-gray-100">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          {/* Job Type Dropdown */}
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
          >
            <option value="all">All Posting Types</option>
            <option value="internship">Internships</option>
            <option value="entry-level">Entry-Level</option>
            <option value="project">Community Projects</option>
          </select>

          {/* Work Mode Dropdown */}
          <select
            value={selectedWorkMode}
            onChange={(e) => onWorkModeChange(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
          >
            <option value="all">All Work Modes</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">Onsite</option>
          </select>

          {/* Reset Button (only shown when filters are active) */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>

        {/* Results Counter */}
        <div className="text-xs text-gray-500 font-medium text-right self-end sm:self-center">
          Showing <span className="font-bold text-gray-800">{totalResults}</span> {totalResults === 1 ? 'opportunity' : 'opportunities'}
        </div>
      </div>
    </div>
  );
}