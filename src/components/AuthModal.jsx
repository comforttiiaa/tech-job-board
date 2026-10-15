import React, { useState } from 'react';
import { Rocket, UserCheck, Building2, LogIn } from 'lucide-react';

export default function AuthModal({ onLogin }) {
  const [isLoginView, setIsLoginView] = useState(false);
  const [role, setRole] = useState('candidate');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    
    const user = {
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      role: role
    };
    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-md w-full p-8">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-md">
            <Rocket className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-2xl text-gray-900 tracking-tight">
            Emmanuel-TechRecruits
          </span>
        </div>

        <h2 className="text-xl font-bold text-center text-gray-800 mb-1">
          {isLoginView ? 'Welcome Back!' : 'Join Emmanuel-TechRecruits'}
        </h2>
        <p className="text-xs text-center text-gray-500 mb-6">
          Sign in or create an account to view job postings and hiring companies.
        </p>

        {/* Role Toggle */}
        {!isLoginView && (
          <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
            <button
              type="button"
              onClick={() => setRole('candidate')}
              className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                role === 'candidate' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <UserCheck className="w-4 h-4" /> For Candidates
            </button>
            <button
              type="button"
              onClick={() => setRole('company')}
              className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                role === 'company' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <Building2 className="w-4 h-4" /> For Companies
            </button>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginView && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name / Company Name</label>
              <input
                type="text"
                required
                placeholder={role === 'company' ? 'e.g. Acme Corp' : 'e.g. Emmanuel Ade'}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-colors shadow-md flex items-center justify-center gap-2 mt-2"
          >
            <LogIn className="w-4 h-4" />
            {isLoginView ? 'Sign In' : `Register as ${role === 'candidate' ? 'Candidate' : 'Company'}`}
          </button>
        </form>

        {/* Switch View */}
        <div className="mt-6 text-center text-xs text-gray-500 border-t pt-4">
          {isLoginView ? (
            <p>
              Don't have an account?{' '}
              <button onClick={() => setIsLoginView(false)} className="text-blue-600 font-semibold hover:underline">
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button onClick={() => setIsLoginView(true)} className="text-blue-600 font-semibold hover:underline">
                Log In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}