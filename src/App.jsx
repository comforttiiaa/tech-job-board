import React, { useState, useMemo } from 'react';
import { initialJobs } from './data/mockJobs';
import JobCard from './components/JobCard';
import SearchFilters from './components/SearchFilters';
import PostJobModal from './components/PostJobModal';
import JobDetailModal from './components/JobDetailModal';
import { Plus, Rocket } from 'lucide-react';

export default function App() {
  const [jobs, setJobs] = useState(initialJobs);
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  
  // Selected job for detail modal preview
  const [selectedJob, setSelectedJob] = useState(null);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedWorkMode, setSelectedWorkMode] = useState('all');

  // Add new job handler
  const handleAddJob = (newJob) => {
    setJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  // Toggle bookmark function
  const toggleSaveJob = (id) => {
    setSavedJobIds((prev) =>
      prev.includes(id) ? prev.filter((jobId) => jobId !== id) : [...prev, id]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setSelectedWorkMode('all');
  };

  // Dynamic Filtering Logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesType = selectedType === 'all' || job.type === selectedType;
      const matchesWorkMode = selectedWorkMode === 'all' || job.workMode === selectedWorkMode;

      return matchesSearch && matchesType && matchesWorkMode;
    });
  }, [jobs, searchTerm, selectedType, selectedWorkMode]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600 rounded-xl text-white">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg text-gray-900 tracking-tight">TechLaunch</span>
              <span className="text-xs text-blue-600 font-semibold ml-2 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                Community
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsPostModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            Post Role / Project
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Tech Opportunities Board
          </h1>
          <p className="text-gray-600 mt-1.5 text-sm sm:text-base">
            Explore entry-level engineering jobs, student tech internships, and open-source project collaborations.
          </p>
        </header>

        {/* Search & Filter Component */}
        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          selectedWorkMode={selectedWorkMode}
          onWorkModeChange={setSelectedWorkMode}
          onResetFilters={resetFilters}
          totalResults={filteredJobs.length}
        />

        {/* Job Listings Grid */}
        <div className="grid gap-4">
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
              <p className="text-gray-500 font-medium text-base">No postings match your search criteria.</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition-colors text-sm"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onSelectJob={(selected) => setSelectedJob(selected)}
                isSaved={savedJobIds.includes(job.id)}
                onToggleSave={toggleSaveJob}
              />
            ))
          )}
        </div>
      </main>

      {/* Post Job Modal */}
      <PostJobModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onAddJob={handleAddJob}
      />

      {/* Job Detail Modal */}
      <JobDetailModal
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        isSaved={selectedJob ? savedJobIds.includes(selectedJob.id) : false}
        onToggleSave={toggleSaveJob}
      />
    </div>
  );
}