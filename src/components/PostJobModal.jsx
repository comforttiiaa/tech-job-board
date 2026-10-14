import React, { useState } from 'react';
import { X, PlusCircle, Building2, MapPin, DollarSign, Tag, FileText } from 'lucide-react';

export default function PostJobModal({ isOpen, onClose, onAddJob }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'internship',
    workMode: 'remote',
    compensation: '',
    description: '',
    requirements: '',
    tags: '',
    applyUrl: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Parse comma-separated tags and requirements into arrays
    const formattedJob = {
      id: `job-${Date.now()}`,
      title: formData.title,
      company: formData.company,
      logoUrl: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(formData.company || 'Tech')}`,
      location: formData.location || 'Remote',
      type: formData.type,
      workMode: formData.workMode,
      compensation: formData.compensation || 'Competitive',
      description: formData.description,
      requirements: formData.requirements
        ? formData.requirements.split('\n').filter((req) => req.trim() !== '')
        : [],
      tags: formData.tags
        ? formData.tags.split(',').map((tag) => tag.trim()).filter((tag) => tag !== '')
        : ['General'],
      postedAt: 'Just now',
      applyUrl: formData.applyUrl || '#'
    };

    onAddJob(formattedJob);
    onClose();

    // Reset form
    setFormData({
      title: '',
      company: '',
      location: '',
      type: 'internship',
      workMode: 'remote',
      compensation: '',
      description: '',
      requirements: '',
      tags: '',
      applyUrl: ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-blue-600" />
              Post an Opportunity
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Share an internship, entry-level role, or community project with tech talents.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Title & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Role / Project Title *
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Frontend Engineer Intern"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-gray-400" /> Company / Organization *
              </label>
              <input
                type="text"
                name="company"
                required
                placeholder="e.g. CloudScale Inc."
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Type & Work Mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Posting Category *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="internship">Internship</option>
                <option value="entry-level">Entry-Level Role</option>
                <option value="project">Community Micro-Project</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Work Mode *
              </label>
              <select
                name="workMode"
                value={formData.workMode}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">Onsite</option>
              </select>
            </div>
          </div>

          {/* Location & Compensation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" /> Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Remote / Austin, TX"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-gray-400" /> Compensation / Stipend
              </label>
              <input
                type="text"
                name="compensation"
                placeholder="e.g. $30/hr, $70k/yr, or Portfolio Builder"
                value={formData.compensation}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-gray-400" /> Tech Stack / Skills (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              placeholder="e.g. React, TypeScript, Node.js, Tailwind"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-gray-400" /> Overview & Responsibilities *
            </label>
            <textarea
              name="description"
              required
              rows={3}
              placeholder="Describe the position, team, and main duties..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Application URL */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Application Link or GitHub Repo URL *
            </label>
            <input
              type="url"
              name="applyUrl"
              required
              placeholder="https://company.com/jobs/apply or https://github.com/..."
              value={formData.applyUrl}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors"
            >
              Post Opportunity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}