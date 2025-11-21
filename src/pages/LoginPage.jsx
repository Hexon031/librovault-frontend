import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import illustrationUrl from '../assets/images.png';

// Illustration image - replace with your actual illustration
const illustrationImage = "https://images.unsplash.com/photo-1534796636912-3b95b3ab5980?q=80&w=2072&auto=format&fit=crop";

// --- Social Icon SVGs ---
const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v8.51h12.8c-.57 2.73-2.18 4.96-4.52 6.51l7.87 6.09c4.63-4.27 7.23-10.43 7.23-17.65z"></path>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.87-6.09c-2.16 1.45-4.92 2.3-8.02 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
    </svg>
);



function LoginPage() {
    const [isLoginView, setIsLoginView] = useState(true);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) alert(error.error_description || error.message);
        else navigate('/');
        setLoading(false);
    };
    
    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email, password,
            options: { data: { username: username, role: 'user' } }
        });
        if (error) alert(error.error_description || error.message);
        else {
            alert('Signup successful! Please check your email to verify your account.');
            setIsLoginView(true);
            setEmail(''); setPassword(''); setUsername('');
        }
        setLoading(false);
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (!resetEmail) {
            alert('Please enter your email address');
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
            redirectTo: window.location.origin,
        });
        setLoading(false);
        if (error) alert(`Error sending reset email: ${error.message}`);
        else {
            alert('Password reset email sent! Please check your inbox.');
            setIsForgotPassword(false);
            setResetEmail('');
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: window.location.origin }
        });
        if (error) {
            alert(`Google login failed: ${error.message}`);
            setLoading(false);
        }
    };

    const inputStyle = "w-full px-4 py-3 bg-white/80 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200 text-gray-700 placeholder-gray-400 shadow-sm";
    const buttonStyle = "w-full py-3 px-4 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 rounded-full font-semibold text-white text-lg transition duration-300 shadow-lg shadow-orange-300/50 disabled:opacity-50 disabled:cursor-not-allowed";
    const socialButtonStyle = "px-6 py-3 bg-white hover:bg-gray-50 rounded-full transition duration-300 flex items-center justify-center shadow-md disabled:opacity-50";

    return (
        <div className="min-h-screen flex items-center justify-center p-4"
             style={{ background: 'linear-gradient(135deg, #FEF3E2 0%, #FDE8D7 50%, #FCE7F3 100%)' }}>
            
            {/* Decorative sparkle */}
            <div className="fixed bottom-8 right-8 text-orange-300/50">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
                </svg>
            </div>
            
            {/* Main Card with Glassmorphism */}
            <div className="w-full max-w-4xl bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl shadow-orange-200/50 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    
                    {/* Left Column: Form */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="max-w-sm mx-auto w-full space-y-6">
                            {/* Header */}
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                    {isForgotPassword ? 'Reset Password' : (isLoginView ? 'Welcome to LibroVault' : 'Create Account')}
                                </h1>
                                {isForgotPassword && (
                                    <p className="text-gray-500 text-sm">Enter your email and we'll send you a reset link</p>
                                )}
                            </div>
                            
                            {/* Forgot Password Form */}
                            {isForgotPassword ? (
                                <form onSubmit={handlePasswordReset} className="space-y-4">
                                    <input 
                                        type="email" 
                                        placeholder="Enter your email" 
                                        value={resetEmail} 
                                        onChange={(e) => setResetEmail(e.target.value)} 
                                        className={inputStyle} 
                                        required 
                                    />
                                    
                                    <button type="submit" disabled={loading} className={buttonStyle}>
                                        {loading ? 'Sending...' : 'Send Reset Link'}
                                    </button>
                                    
                                    <button 
                                        type="button" 
                                        onClick={() => { setIsForgotPassword(false); setResetEmail(''); }}
                                        className="w-full py-3 px-4 bg-white/80 hover:bg-white rounded-full font-semibold text-gray-700 text-lg transition duration-300 shadow-md"
                                    >
                                        Back to Login
                                    </button>
                                </form>
                            ) : (
                            <>
                            {/* Login/Signup Form */}
                            <form onSubmit={isLoginView ? handleLogin : handleSignup} className="space-y-4">
                                {!isLoginView && (
                                    <input 
                                        type="text" 
                                        placeholder="Username" 
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)} 
                                        className={inputStyle} 
                                        required 
                                    />
                                )}
                                <input 
                                    type="email" 
                                    placeholder={isLoginView ? "Please enter your email" : "Email"} 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    className={inputStyle} 
                                    required 
                                />
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    className={inputStyle} 
                                    required 
                                />
                                
                                {isLoginView && (
                                    <div className="text-right">
                                       <button 
                                           type="button" 
                                           onClick={() => setIsForgotPassword(true)} 
                                           disabled={loading} 
                                           className="text-sm text-orange-500 hover:text-orange-600 hover:underline focus:outline-none disabled:opacity-50"
                                       >
                                            Forgot Password?
                                       </button>
                                    </div>
                                )}

                                <button type="submit" disabled={loading} className={buttonStyle}>
                            {loading ? 'Processing...' : (isLoginView ? 'Login' : 'Sign Up')}
                        </button>
                    </form>

                            {/* Social Login - Google Only */}
                            <div className="flex justify-center">
                                <button type="button" onClick={handleGoogleLogin} disabled={loading} className={socialButtonStyle}>
                                    <GoogleIcon />
                                    <span className="ml-2 text-gray-600 text-sm">Continue with Google</span>
                                </button>
                            </div>
                            
                            {/* Toggle */}
                            <p className="text-center text-gray-600">
                                <button 
                                    type="button" 
                                    onClick={() => { 
                                        setIsLoginView(!isLoginView); 
                                        setEmail(''); 
                                        setPassword(''); 
                                        setUsername(''); 
                                    }} 
                                    className="text-orange-500 font-semibold hover:text-orange-600 hover:underline focus:outline-none"
                                >
                                    {isLoginView ? "Sign up" : "Login"}
                                </button>
                            </p>
                            </>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Illustration */}
                    <div className="hidden md:flex items-center justify-center p-8 relative">
                        <style>
                            {`
                                @keyframes float {
                                    0%, 100% {
                                        transform: translateY(0px);
                                    }
                                    50% {
                                        transform: translateY(-15px);
                                    }
                                }
                                .floating-image {
                                    animation: float 3s ease-in-out infinite;
                                }
                                @keyframes fadeSlideIn {
                                    0% {
                                        opacity: 0;
                                        transform: translateY(20px);
                                    }
                                    100% {
                                        opacity: 1;
                                        transform: translateY(0);
                                    }
                                }
                                @keyframes shimmer {
                                    0% {
                                        background-position: -200% center;
                                    }
                                    100% {
                                        background-position: 200% center;
                                    }
                                }
                                .animated-title {
                                    animation: fadeSlideIn 0.8s ease-out forwards;
                                    background: linear-gradient(
                                        90deg,
                                        #1f2937 0%,
                                        #1f2937 40%,
                                        #f97316 50%,
                                        #1f2937 60%,
                                        #1f2937 100%
                                    );
                                    background-size: 200% auto;
                                    background-clip: text;
                                    -webkit-background-clip: text;
                                    -webkit-text-fill-color: transparent;
                                    animation: fadeSlideIn 0.8s ease-out forwards, shimmer 3s linear infinite;
                                    animation-delay: 0s, 0.8s;
                                }
                            `}
                        </style>
                        <img 
                            src={illustrationUrl} 
                            alt="Person working on laptop" 
                            className="floating-image w-full h-auto max-w-sm object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;