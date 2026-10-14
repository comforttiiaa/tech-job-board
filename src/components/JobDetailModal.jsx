import React from 'react';
import { X, MapPin, Briefcase, Clock, ExternalLink, Bookmark, CheckCircle2 } from 'lucide-react';

export default function JobDetailModal({ job, isOpen, onClose, isSaved, onToggleSave }) {
  if (!isOpen || !job) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto my-8 relative flex flex-col justify-between">
        
        {/* Modal Content */}
        <div>
          {/* Top Bar: Close Button */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <img
                src={job.logoUrl}
                alt={`${job.company} logo`}
                className="w-14 h-14 rounded-xl object-cover border border-gray-100 bg-gray-50 shadow-sm"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
                <p className="text-base font-semibold text-gray-600">{job.company}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
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
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3 py-3 my-2 border-y border-gray-100 text-xs font-medium">
            <span className={`px-3 py-1 rounded-full border uppercase tracking-wider ${getTypeBadgeColor(job.type)}`}>
              {job.type}
            </span>
            <span className="flex items-center gap-1 text-gray-600">
              <MapPin className="w-4 h-4 text-gray-400" />
              {job.location} ({job.workMode})
            </span>
            <span className="flex items-center gap-1 text-gray-600">
              <Briefcase className="w-4 h-4 text-gray-400" />
              {job.compensation}
            </span>
            <span className="flex items-center gap-1 text-gray-500 ml-auto">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              Posted {job.postedAt}
            </span>
          </div>

          {/* Tech Stack Tags */}
          <div className="my-5">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Required Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="my-5">
            <h4 className="text-sm font-bold text-gray-900 mb-2">About the Role</h4>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Requirements List */}
          {job.requirements && job.requirements.length > 0 && (
            <div className="my-5">
              <h4 className="text-sm font-bold text-gray-900 mb-3">Key Qualifications & Requirements</h4>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer Application CTA */}
        <div className="pt-5 mt-6 border-t border-gray-100 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Close
          </button>

          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors"
          >
            Apply Now
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}