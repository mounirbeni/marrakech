import React from 'react';

export const CompletedView = () => {
    return (
        <div className="text-center py-12 space-y-8">
            <div className="max-w-2xl mx-auto space-y-4">
                <h1 className="text-4xl font-serif text-slate-900">Welcome Back!</h1>
                <p className="text-lg text-slate-600">We hope you had an unforgettable journey in Marrakesh.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Review Card */}
                <div className="bg-white flex flex-col items-center p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Rate your experience</h3>
                    <p className="text-slate-500 mb-6 text-sm">Tell us about your favorite moments to help other travelers.</p>
                    <button className="px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800">
                        Write a Review
                    </button>
                </div>

                {/* Share/Photos */}
                <div className="bg-white flex flex-col items-center p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Share your memories</h3>
                    <p className="text-slate-500 mb-6 text-sm">Upload your photos to be featured in our gallery.</p>
                    <button className="px-6 py-2 border border-slate-200 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-50">
                        Upload Photos
                    </button>
                </div>
            </div>
        </div>
    );
};
