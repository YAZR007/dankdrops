'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logIn } from '@/firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import axios, { isAxiosError } from 'axios';

const PasswordChecklist = ({ password }) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  return (
    <div className="flex justify-between items-center mt-2 font-mono text-xs text-muted-foreground">
      <span className={checks.length ? 'text-green-500' : ''}>8+ chars</span>
      <span className={checks.uppercase ? 'text-green-500' : ''}>A-Z</span>
      <span className={checks.lowercase ? 'text-green-500' : ''}>a-z</span>
      <span className={checks.number ? 'text-green-500' : ''}>0-9</span>
      <span className={checks.special ? 'text-green-500' : ''}>!@#$</span>
    </div>
  );
};

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      if (password !== confirmPassword) {
        toast({ title: 'Error', description: 'Passwords do not match.', variant: 'destructive' });
        return;
      }
      try {
        const response = await axios.post('/api/register', { email, password });
        setIsPending(true); // Set pending state
        toast({ title: 'Success', description: response.data.message });
      } catch (error) {
        let errorMessage = 'An unexpected error occurred.';
        if (isAxiosError(error) && error.response) {
          errorMessage = error.response.data.message || error.message;
        }
        toast({ title: 'Sign-Up Failed', description: errorMessage, variant: 'destructive' });
      }
    } else {
      try {
        await logIn(email, password);
        router.push('/profile');
        toast({ title: 'Success', description: 'Logged in successfully!' });
      } catch (error: any) {
        toast({ title: 'Authentication Error', description: error.message, variant: 'destructive' });
      }
    }
  };

  if (isPending) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-64px)] font-mono">
        <Card className="w-full max-w-md bg-background/80 backdrop-blur-sm border-white/10 shadow-2xl shadow-primary/10">
          <CardHeader>
            <CardTitle className="font-headline text-3xl font-black uppercase tracking-tighter text-center">
              Registration Pending
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>Thank you for registering! Your account is currently pending approval.</p>
            <p>You will be able to log in once an administrator has approved your request.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-64px)] font-mono">
      <Card className="w-full max-w-md bg-background/80 backdrop-blur-sm border-white/10 shadow-2xl shadow-primary/10">
        <CardHeader>
          <CardTitle className="font-headline text-3xl font-black uppercase tracking-tighter text-center">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuthAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="user@resinroom.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-muted/50 border-none font-mono" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-muted/50 border-none font-mono" required />
            </div>
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="********" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-muted/50 border-none font-mono" required />
                <PasswordChecklist password={password} />
              </div>
            )}
            <Button type="submit" className="w-full font-black uppercase tracking-widest h-12">
              {isSignUp ? 'Sign Up' : 'Log In'}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
