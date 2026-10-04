import { Sidebar } from './Dashboard/layout/Sidebar';
import { BottomNav } from './Dashboard/layout/BottomNav';
import { Header } from './Dashboard/layout/Header';
import { useState } from 'react';

export const Support = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;
    // Mock sending support ticket
    setTimeout(() => {
      setSuccess(true);
      setSubject('');
      setMessage('');
      setTimeout(() => setSuccess(false), 5000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white font-inter overflow-x-hidden">
      <Sidebar />
      <div className="md:pl-64 flex flex-col min-h-screen">
        <Header />
        <main className="p-4 md:p-8 pb-32 md:pb-8 flex-1">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Customer Support</h1>
            <p className="text-gray-400 mb-8">Need help? We're here for you 24/7. Create a ticket below and our team will get back to you.</p>

            <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6">
              {success ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#26A17B]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[#26A17B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Ticket Submitted Successfully!</h3>
                  <p className="text-gray-400">Our support team will review your inquiry and get back to you via email shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Subject</label>
                    <input 
                      type="text"
                      required
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      placeholder="E.g. Issue with deposit"
                      className="w-full bg-[#0A0A0A] border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#ff6a00] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Message</label>
                    <textarea 
                      required
                      rows={6}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Describe your issue in detail..."
                      className="w-full bg-[#0A0A0A] border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#ff6a00] outline-none transition-all resize-y"
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full bg-[#ff6a00] hover:bg-[#ff7b1a] text-black font-bold rounded-lg py-3 transition-all">
                    Submit Ticket
                  </button>
                </form>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="bg-[#141414] border border-[#1a1a1a] rounded-xl p-5 flex gap-4">
                <div className="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center text-[#ff6a00] shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Email Support</h4>
                  <p className="text-sm text-gray-400">support@blofinprime.com</p>
                </div>
              </div>
              <div className="bg-[#141414] border border-[#1a1a1a] rounded-xl p-5 flex gap-4">
                <div className="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center text-[#ff6a00] shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Help Center</h4>
                  <p className="text-sm text-gray-400">Browse FAQs and guides</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
};
