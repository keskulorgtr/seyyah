'use client';

import { useState } from 'react';
import { submitRequest } from '@/app/actions/requestAction';
import { toast } from 'sonner';

export default function RequestForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleAction(formData: FormData) {
    setLoading(true);
    setSuccess(false);

    const result = await submitRequest(formData);

    if (result.success) {
      setSuccess(true);
      toast.success('Your request has been received!');
    } else {
      toast.error(result.error || 'An error occurred. Please try again.');
    }

    setLoading(false);
  }

  if (success) {
    return (
      <div className="bg-white/5 border border-brand-turquoise/30 p-6 flex flex-col items-center justify-center text-center max-w-md w-full">
        <div className="w-12 h-12 rounded-full bg-brand-turquoise/20 flex items-center justify-center mb-4 text-brand-turquoise">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="font-serif text-2xl text-white mb-2">Request Received</h3>
        <p className="font-sans text-sm text-white/60">We will be in touch with you shortly.</p>
        <button onClick={() => setSuccess(false)} className="mt-6 text-brand-turquoise text-xs tracking-widest uppercase hover:text-white transition-colors">
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form action={handleAction} className="flex flex-col gap-4 max-w-md w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="fullName"
          required
          placeholder="Full Name"
          className="bg-white/5 border border-white/10 px-4 py-3 font-sans text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-brand-turquoise transition-colors w-full"
        />
        <input
          type="number"
          name="pax"
          required
          min="1"
          placeholder="Number of Guests"
          className="bg-white/5 border border-white/10 px-4 py-3 font-sans text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-brand-turquoise transition-colors w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="bg-white/5 border border-white/10 px-4 py-3 font-sans text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-brand-turquoise transition-colors w-full"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="bg-white/5 border border-white/10 px-4 py-3 font-sans text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-brand-turquoise transition-colors w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="destination"
          required
          placeholder="Preferred Journey"
          className="bg-white/5 border border-white/10 px-4 py-3 font-sans text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-brand-turquoise transition-colors w-full"
        />
        <input
          type="text"
          name="reservationDate"
          placeholder="Preferred Date"
          className="bg-white/5 border border-white/10 px-4 py-3 font-sans text-sm text-white/70 placeholder:text-white/40 focus:outline-none focus:border-brand-turquoise transition-colors w-full"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-brand-turquoise text-brand-anthracite font-sans text-xs tracking-[0.2em] font-bold py-4 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        {loading ? 'SENDING...' : 'SUBMIT REQUEST'}
      </button>
    </form>
  );
}
