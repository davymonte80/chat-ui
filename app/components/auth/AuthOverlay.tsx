'use client';
import { useState } from 'react';
import { Button } from '../ui/button';

export const AuthOverlay = () => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 w-full max-w-md">
        {mode === 'signin' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Sign In</h2>
            <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
          />
          <Button className="w-full">Sign In</Button>
          <div className="text-center">
            <button 
              onClick={() => setMode('signup')}
              className="text-green-600 hover:underline"
            >
              Need an account? Sign up
              </button>
            </div>
          </div>
        )}
        {/* Similar structures for signup and forgot password modes */}
      </div>
    </div>
  );
};