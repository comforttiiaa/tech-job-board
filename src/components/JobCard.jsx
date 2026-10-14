import React from 'react';
import { MapPin, Briefcase, Clock, ExternalLink, Bookmark } from 'lucide-react';

export default function JobCard({ job, onSelectJob, isSaved, onToggleSave }) {
  // Helper badge color based on job type
  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'internship':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'entry-level':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'project':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Header: Logo, Company & Save Button */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src={job.logoUrl} 
              alt={`${job.company} logo`} 
              className="w-12 h-12 rounded-lg object-cover border border-gray-100 bg-gray-50"
            />
            <div>
              <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer text-lg" onClick={() => onSelectJob(job)}>
                {job.title}
              </h3>
              <p className="text-sm font-medium text-gray-600">{job.company}</p>
            </div>
          </div>

          <button 
            onClick={() => onToggleSave(job.id)}
            className={`p-2 rounded-lg border transition-colors ${
              isSaved 
                ? 'bg-amber-50 border-amber-200 text-amber-600' 
                : 'border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}
            title={isSaved ? "Saved" : "Save Job"}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-amber-500' : ''}`} />
          </button>
        </div>

        {/* Metadata badges */}
        <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-medium">
          <span className={`px-2.5 py-1 rounded-full border uppercase tracking-wider ${getTypeBadgeColor(job.type)}`}>
            {job.type}
          </span>
          <span className="flex items-center gap-1 text-gray-500">
            <MapPin className="w-3.5 h-3.5" />
            {job.location}
          </span>
          <span className="flex items-center gap-1 text-gray-500">
            <Briefcase className="w-3.5 h-3.5" />
            {job.compensation}
          </span>
        </div>

        {/* Description snippet */}
        <p className="mt-3 text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Skill tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {job.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between pt-4 mt-5 border-t border-gray-100 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-gray-400" />
          {job.postedAt}
        </span>

        <button 
          onClick={() => onSelectJob(job)}
          className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View Details
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}