import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <main className="min-h-screen flex flex-col md:flex-row">
        {/* Left Side: Aesthetic Image */}
        <section className="hidden md:block w-1/2 h-screen sticky top-0 bg-surface-container-highest overflow-hidden">
          <div className="absolute inset-0 bg-black/10 z-10"></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            alt="Modern Creative Studio" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ34BbxW1P6Yxndl9rYuD8PU7asC2mgBSkhiyfUwSExk0SIYQnZ1xlawWTY9h_QBRJrBETjWR6BnevipEDI0gik_te75So7ewmaA8ZrrLs-WmH-cmk7IEaYNSicpCdYX-Cknmys2vfntuaMWWzB3LA5z7fkNskafdaPzrS1sKgcCLFMsXCY7hPmwDxAFTeQY0BN0AU7EsOhIjD-Li7sZro9X7pYvJDxZsogMm0wwZmtCJlCdVnSsO3xHUBFZPwK6H8PGXqhlJM6Yk"
          />
          <div className="absolute bottom-xl left-md z-20 max-w-[440px]">
            <h1 className="text-white font-display-lg text-display-lg mb-sm">Find your next creative haven.</h1>
            <p className="text-white/90 text-body-lg font-body-lg">Access the most inspiring workspaces in Phnom Penh with Phnom Creative.</p>
          </div>
        </section>

        {/* Right Side: Login Form */}
        <section className="w-full md:w-1/2 min-h-screen flex flex-col justify-center items-center px-gutter py-xl bg-surface-container-lowest">
          {/* TopNavBar Suppression Check: Transactional page. We only use the Brand Logo as requested. */}
          <header className="absolute top-0 left-0 w-full z-50 bg-transparent h-xl flex items-center px-md md:px-lg md:hidden">
            <div className="max-w-container-max mx-auto w-full">
              <Link href="/" className="text-headline-md font-headline-md font-bold text-primary">Phnom Creative</Link>
            </div>
          </header>
          <header className="absolute top-0 right-0 w-1/2 z-50 bg-transparent h-xl hidden md:flex items-center px-md md:px-lg">
            <div className="max-w-container-max mx-auto w-full">
              <Link href="/" className="text-headline-md font-headline-md font-bold text-primary">Phnom Creative</Link>
            </div>
          </header>

          <div className="w-full max-w-[440px] animate-fade-in mt-12 md:mt-0">
            <div className="mb-lg">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-xs">Welcome back</h2>
              <p className="font-body-md text-on-surface-variant">Please enter your details to sign in to your account.</p>
            </div>
            <form action="#" className="space-y-md" method="POST">
              {/* Email Input */}
              <div className="space-y-xs group">
                <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="email">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">mail</span>
                  <input 
                    className="w-full pl-[44px] pr-md py-sm bg-surface border border-outline-variant rounded-lg font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" 
                    id="email" 
                    name="email" 
                    placeholder="name@company.com" 
                    required 
                    type="email"
                  />
                </div>
              </div>
              
              {/* Password Input */}
              <div className="space-y-xs group">
                <div className="flex justify-between items-center">
                  <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">Password</label>
                  <a className="text-label-md font-label-md text-primary hover:underline transition-all" href="#">Forgot password?</a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">lock</span>
                  <input 
                    className="w-full pl-[44px] pr-md py-sm bg-surface border border-outline-variant rounded-lg font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" 
                    id="password" 
                    name="password" 
                    placeholder="••••••••" 
                    required 
                    type="password"
                  />
                </div>
              </div>
              
              {/* Remember Me */}
              <div className="flex items-center space-x-sm">
                <input 
                  className="w-base h-base rounded border-outline-variant text-primary focus:ring-primary transition-all cursor-pointer" 
                  id="remember" 
                  name="remember" 
                  type="checkbox"
                />
                <label className="font-label-md text-label-md text-on-surface-variant cursor-pointer select-none" htmlFor="remember">Remember me for 30 days</label>
              </div>
              
              {/* Submit Button */}
              <button 
                className="w-full py-sm bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:bg-[#005a3c] active:scale-[0.98] transition-all duration-200 mt-base" 
                type="submit"
              >
                Log In
              </button>
            </form>
            
            {/* Social Login Divider */}
            <div className="relative my-lg">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant"></div>
              </div>
              <div className="relative flex justify-center text-label-sm font-label-sm">
                <span className="px-sm bg-surface-container-lowest text-on-surface-variant">OR CONTINUE WITH</span>
              </div>
            </div>
            
            {/* Google Login Button */}
            <button className="w-full flex items-center justify-center space-x-sm py-sm bg-white border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-all duration-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCf6Vxrzb29HDS2FNSKADoIy3bAHutouLYiPMREg4EbXn1TuW2qSejXjFNMU1kay7d2Fof1wHffPTvNa047oZjHBfToGkxO1lAbqPKET7HV5aZxrWHKRcmI5QcKUoENrHFI5H_MOmIOvdhwBopQumB7QrCGtBYcp5W3zawpIv3ua24TvyY4w0z9oyzBQnAPn9W6cjkQssgI8LZuzOIb6kf3QdIrpve6FTrnBM-sQegHXqzn-qoqYnbM1jvdG1pmjkUMDl5ew_TS8sM"/>
              <span>Sign in with Google</span>
            </button>
            
            {/* Footer Sign Up Link */}
            <div className="mt-xl text-center">
              <p className="font-body-md text-on-surface-variant">
                Don&apos;t have an account? 
                <Link className="text-primary font-bold hover:underline ml-xs" href="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      
      {/* Simple Footer for transactional page */}
      <footer className="bg-surface-container-low border-t border-outline-variant py-md">
        <div className="max-w-container-max mx-auto px-md md:px-lg flex flex-col md:flex-row justify-between items-center gap-base">
          <span className="font-label-sm text-label-sm text-on-secondary-container">© 2024 Phnom Creative. All rights reserved.</span>
          <div className="flex space-x-md">
            <Link className="font-label-sm text-label-sm text-on-secondary-container hover:text-primary transition-colors" href="#">About</Link>
            <Link className="font-label-sm text-label-sm text-on-secondary-container hover:text-primary transition-colors" href="#">Terms</Link>
            <Link className="font-label-sm text-label-sm text-on-secondary-container hover:text-primary transition-colors" href="#">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
