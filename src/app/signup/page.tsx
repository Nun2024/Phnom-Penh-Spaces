"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authApi.register({
        name,
        email,
        password,
        phone,
        role: 'CLIENT' // Default client role
      });

      // Store token and user info
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      // Redirect based on role
      if (response.user.role === 'ADMIN') {
        router.push('/dashboard');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="h-screen overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Visual Anchor */}
        <section className="hidden md:flex md:w-1/2 h-screen sticky top-0 relative overflow-hidden bg-surface-container-highest">
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuWnIOegY0vMScuVrHrwZGlLzXCT5heTQyvNgZWcioJsLnv_9tJILFO3dRuIGabJWzmyxRNdQYO0wPHc1Ehydrz5_lVtTnzXK7GAAB2TrV0pcE5JgGSpAbeCARRyYnWnrJtlK-9IGD3NcArch_0x4Vwe7zzktSD_mFMTM1rfXAFpwvLJ3tdUE6MxDgJQ8tO3ecptnvUmeT78BkOsOchuRxKWz5yApR5-8GlMi6ZRfJdt6J8W7qb5QzhN7Ckw-556e3YPDxnAJ2TKM" 
              alt="Creative sanctuary in Phnom Penh"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
          </div>
          <div className="relative z-10 flex flex-col justify-end p-xl text-white">
            <h2 className="text-display-lg font-display-lg mb-md leading-tight">Elevate your <br />creative workflow.</h2>
            <p className="text-body-lg font-body-lg max-w-[440px] opacity-90">Join a community of professionals in the heart of Phnom Penh&apos;s most inspiring creative spaces.</p>
          </div>
        </section>
        
        {/* Right Side: Sign Up Form */}
        <section className="w-full md:w-1/2 h-full overflow-y-auto flex flex-col bg-surface">
          
          {/* Header */}
          <header className="sticky top-0 z-50 bg-surface w-full px-gutter py-md flex justify-between items-center shrink-0">
            <Link href="/" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-md">
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Back to Home
            </Link>
            {/* Show brand name on mobile only, since left image handles desktop branding */}
            <Link href="/" className="text-headline-sm font-headline-sm font-bold text-primary md:hidden">
              Creative Space
            </Link>
          </header>

          {/* Form Container */}
          <div className="flex-1 flex flex-col justify-center items-center px-gutter py-md">
            <div className="w-full max-w-[440px] animate-fade-in">
              <div className="mb-xl text-center md:text-left">
                <h1 className="text-display-lg-mobile md:text-headline-md font-headline-md text-on-surface mb-xs">Join Creative Space</h1>
                <p className="text-body-md font-body-md text-on-surface-variant">Start booking your perfect workspace today.</p>
              </div>

            {error && (
              <div className="mb-md p-md bg-error-container text-on-error-container border border-error rounded-lg text-body-md">
                {error}
              </div>
            )}
            
            <form className="space-y-md" onSubmit={handleSubmit}>
              {/* Full Name Field */}
              <div className="group">
                <label className="block text-label-md font-label-md text-on-surface-variant mb-xs" htmlFor="full_name">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" style={{fontSize: '20px'}}>person</span>
                  <input 
                    className="w-full h-[56px] pl-[48px] pr-md bg-surface border border-outline-variant rounded-lg text-body-md font-body-md transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder:text-outline-variant" 
                    id="full_name" 
                    name="full_name" 
                    placeholder="Enter your full name" 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Email Address Field */}
              <div className="group">
                <label className="block text-label-md font-label-md text-on-surface-variant mb-xs" htmlFor="email">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" style={{fontSize: '20px'}}>mail</span>
                  <input 
                    className="w-full h-[56px] pl-[48px] pr-md bg-surface border border-outline-variant rounded-lg text-body-md font-body-md transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder:text-outline-variant" 
                    id="email" 
                    name="email" 
                    placeholder="you@example.com" 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Phone Number Field */}
              <div className="group">
                <label className="block text-label-md font-label-md text-on-surface-variant mb-xs" htmlFor="phone">Phone Number</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" style={{fontSize: '20px'}}>phone</span>
                  <input 
                    className="w-full h-[56px] pl-[48px] pr-md bg-surface border border-outline-variant rounded-lg text-body-md font-body-md transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder:text-outline-variant" 
                    id="phone" 
                    name="phone" 
                    placeholder="+855 ..." 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Password Field */}
              <div className="group">
                <label className="block text-label-md font-label-md text-on-surface-variant mb-xs" htmlFor="password">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" style={{fontSize: '20px'}}>lock</span>
                  <input 
                    className="w-full h-[56px] pl-[48px] pr-[48px] bg-surface border border-outline-variant rounded-lg text-body-md font-body-md transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 placeholder:text-outline-variant" 
                    id="password" 
                    name="password" 
                    placeholder="Min. 8 characters" 
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    className="absolute right-md top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors" 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined" style={{fontSize: '20px'}}>{showPassword ? "visibility" : "visibility_off"}</span>
                  </button>
                </div>
              </div>
              
              {/* CTA Button */}
              <button 
                disabled={loading}
                className="w-full h-[56px] bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:bg-on-primary-container transition-all active:scale-[0.98] flex items-center justify-center gap-xs disabled:opacity-55 disabled:cursor-not-allowed" 
                type="submit"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
              
              {/* Terms and Privacy Note */}
              <p className="text-label-sm font-label-sm text-on-surface-variant text-center pt-xs">
                By creating an account, you agree to our 
                <Link className="text-primary hover:underline transition-all ml-1" href="#">Terms of Service</Link> and 
                <Link className="text-primary hover:underline transition-all ml-1" href="#">Privacy Policy</Link>.
              </p>
            </form>
            
            </div>
          </div>

          {/* Footer Area */}
          <div className="w-full p-md shrink-0 text-center">
            <p className="text-body-md font-body-md text-on-surface-variant">
              Already have an account? 
              <Link className="text-primary font-label-md text-label-md hover:underline transition-all ml-1" href="/login">Log In</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
