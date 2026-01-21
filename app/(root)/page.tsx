'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from "next/navigation";
import { useAuthSession } from "@/contexts/AuthContext";
import { signOut } from "@/lib/auth-actions/auth.actions"
import { useState, useTransition } from 'react';

export default function IntroPage() {
  const router = useRouter();
  const { data: session, isPending } = useAuthSession();

  const [handle, setHandle] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [status, setStatus] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedHandle, setVerifiedHandle] = useState('');
  const [isPendingVerification, startTransition] = useTransition();

  const verifyHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setStatus('Waiting for Codeforces submission...');
    
    startTransition(async () => {
      console.log("verification starts");
      try {
        console.log('Sending request with handle:', handle);
        const res = await fetch('/api/verify-cf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            handle: handle.trim().toLowerCase(),
            contestId: 4,
            problemIndex: 'A'
          }),
        });
        
        console.log('Response status:', res.status); 
        const data = await res.json();
        console.log('Response data:', data); 
        
        if (data.success) {
          setStatus('✅ Verified!');
          setIsVerified(true);
          setVerifiedHandle(handle.trim());
        } else {
          setStatus(`❌ ${data.message || 'No submission found'}`);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setStatus('❌ Network error - check console');
      } finally {
        setIsVerifying(false);
      }
    });
  };

  if (isPending) return <div>Loading...</div>;

  const user = {
    name: session?.user.name || "User",
    email: session?.user.email || "No email",
    codeforcesHandle: isVerified ? verifiedHandle : 'Not Yet Verified',
  };

  const handleStartDuel = () => {
    if (!isVerified) {
      setStatus('❌ Please verify your Codeforces handle first');
      return;
    }
    console.log('Starting duel...');
  };
  
  const handleSignOut = async () => {
    await signOut(); 
    router.push("/sign-in");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-black p-4">
      <Card className="w-full max-w-sm bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl">
        <CardHeader className="text-center space-y-3 p-6">
          <Avatar className="w-16 h-16 mx-auto border-2 border-yellow-400">
            <AvatarImage src="/api/placeholder/64/64" />
            <AvatarFallback className="bg-yellow-500 text-white font-bold text-lg">
              {user.name[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Ready to Battle?
          </CardTitle>
          <CardDescription className="text-sm text-white/80">
            Real-time coding duels
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6 space-y-4">
          {/* User Info */}
          <div className="space-y-3 text-white">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="font-semibold">{user.name}</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
              <span className="text-xs w-20">Email:</span>
              <span className="font-mono text-sm text-white/90 truncate max-w-60">
                {user.email}
              </span>
            </div>
            
            {/* Verified Codeforces Handle */}
            {isVerified && (
              <div className="flex items-center gap-2 p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                <span className="text-xs w-24 font-semibold text-green-100">CF Handle:</span>
                <span className="font-mono text-sm text-green-200 font-bold bg-green-500/30 px-2 py-1 rounded-md">
                  {verifiedHandle}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Button 
              onClick={handleStartDuel}
              disabled={!isVerified}
              className="w-full bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold shadow-lg h-12 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:from-yellow-400 disabled:to-orange-400"
            >
              {isVerified ? '⚔️ Start Duel' : '🔒 Verify Handle First'}
            </Button>
          </div>

          {!isVerified && (
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Verify Codeforces Handle</h3>
              
              <form onSubmit={verifyHandle} className="space-y-3">
                <input
                  type="text"
                  placeholder="yourcodeforceshandle"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-yellow-400"
                  required
                />
                
                <div className="text-xs text-white/70 space-y-1 p-3 bg-black/20 rounded-lg">
                  <p>1. Submit problem <strong>4A</strong> in Gym contest <strong>4</strong></p>
                  <p>2. Click Verify below</p>
                </div>
                
                <Button
                  type="submit"
                  disabled={isVerifying || isPendingVerification}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg disabled:opacity-50"
                >
                  {isVerifying ? '🔄 Verifying...' : '✅ Verify Handle'}
                </Button>
              </form>
              
              {status && (
                <div className={`mt-4 p-4 rounded-lg text-sm ${
                  status.includes('✅') ? 'bg-green-500/20 border border-green-500/50 text-green-100' : 
                  status.includes('❌') ? 'bg-red-500/20 border border-red-500/50 text-red-100' : 
                  'bg-yellow-500/20 border border-yellow-500/50 text-yellow-100'
                }`}>
                  {status}
                </div>
              )}
            </div>
          )}
            <Button 
              onClick={handleSignOut}
              variant="outline"
              className="w-full border-white/50 text-white hover:bg-white/10 h-12 rounded-lg"
            >
              🚪 Logout
            </Button>
        </CardContent>
      </Card>
    </main>
  );
}
