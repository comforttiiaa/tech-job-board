import React, { useState, useMemo, useEffect } from 'react';
import { initialJobs, readyCompanies } from './data/mockJobs';
import JobCard from './components/JobCard';
import SearchFilters from './components/SearchFilters';
import PostJobModal from './components/PostJobModal';
import JobDetailModal from './components/JobDetailModal';
import AuthModal from './components/AuthModal';
import { Plus, Rocket, Building2, Briefcase, LogOut, User } from 'lucide-react';

export default function App() {
  // 1. Auth State with localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('emmanuel_tech_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 2. Jobs and Companies State
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('emmanuel_tech_jobs');
    return savedJobs ? JSON.parse(savedJobs) : initialJobs;
  });
  const [companies] = useState(readyCompanies);

  // 3. Saved Job Bookmarks State
  const [savedJobIds, setSavedJobIds] = useState(() => {
    const saved = localStorage.getItem('emmanuel_tech_saved');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState('candidates');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedWorkMode, setSelectedWorkMode] = useState('all');

  // Save changes to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('emmanuel_tech_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('emmanuel_tech_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('emmanuel_tech_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('emmanuel_tech_saved', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  const handleAddJob = (newJob) => {
    setJobs((prev) => [newJob, ...prev]);
  };

  const toggleSaveJob = (id) => {
    setSavedJobIds((prev) =>
      prev.includes(id) ? prev.filter((jobId) => jobId !== id) : [...prev, id]
    );
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setSelectedWorkMode('all');
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesType = selectedType === 'all' || job.type === selectedType;
      const matchesWorkMode = selectedWorkMode === 'all' || job.workMode === selectedWorkMode;

      return matchesSearch && matchesType && matchesWorkMode;
    });
  }, [jobs, searchTerm, selectedType, selectedWorkMode]);

  // AUTH GATE: Force Sign in / Sign up before showing anything
  if (!currentUser) {
    return <AuthModal onLogin={(user) => setCurrentUser(user)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl text-white">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-gray-900 tracking-tight">
                Emmanuel-TechRecruits
              </span>
              <span className="text-xs text-blue-600 font-semibold ml-2 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                {currentUser.role === 'company' ? 'Recruiter Portal' : 'Candidate Portal'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg">
              <User className="w-4 h-4 text-blue-600" />
              <span>{currentUser.name}</span>
            </div>
            <button
              onClick={() => setCurrentUser(null)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('candidates')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'candidates'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Browse for Jobs (For Candidates)
            </button>

            <button
              onClick={() => setActiveTab('companies')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'companies'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Start Hiring & Companies
            </button>
          </div>

          <button
            onClick={() => setIsPostModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            Start Hiring / Post Role
          </button>
        </div>

        {/* TAB 1: BROWSE JOBS FOR CANDIDATES */}
        {activeTab === 'candidates' && (
          <section>
            <header className="mb-6">
              <h1 className="text-2xl font-extrabold text-gray-900">Explore Open Tech Roles</h1>
              <p className="text-gray-600 text-sm mt-1">Find your next opportunity from verified hiring partners.</p>
            </header>

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

            <div className="grid gap-4 mt-6">
              {filteredJobs.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
                  <p className="text-gray-500 font-medium">No postings match your search criteria.</p>
                  <button onClick={resetFilters} className="mt-4 text-blue-600 font-semibold text-sm">
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
          </section>
        )}

        {/* TAB 2: COMPANIES & HIRING */}
        {activeTab === 'companies' && (
          <section>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white mb-8 shadow-lg">
              <h1 className="text-3xl font-extrabold">Ready to Hire Top Tech Talent?</h1>
              <p className="mt-2 text-blue-100 max-w-xl text-sm leading-relaxed">
                Post your engineering vacancies, open-source projects, or internships directly to the Emmanuel-TechRecruits candidate pool.
              </p>
              <button
                onClick={() => setIsPostModalOpen(true)}
                className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-white text-blue-600 font-bold rounded-xl shadow hover:bg-blue-50 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" /> Start Hiring Now
              </button>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              Companies Currently Hiring
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {companies.map((comp) => (
                <div key={comp.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-gray-900 text-lg">{comp.name}</h3>
                  <p className="text-xs text-blue-600 font-medium mt-0.5">{comp.industry}</p>
                  <p className="text-xs text-gray-500 mt-2">{comp.location}</p>
                  
                  <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                      {comp.openRoles} Active Roles
                    </span>
                    <button 
                      onClick={() => {
                        setSearchTerm(comp.name);
                        setActiveTab('candidates');
                      }}
                      className="text-blue-600 font-bold hover:underline"
                    >
                      View Roles &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Modals */}
      <PostJobModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onAddJob={handleAddJob}
      />

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