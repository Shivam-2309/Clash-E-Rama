'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from "next/navigation";
import { useAuthSession } from "@/contexts/AuthContext";
import { signOut } from "@/lib/auth-actions/auth.actions"

export default function IntroPage() {
  const router = useRouter();
  const { data: session, isPending } = useAuthSession();

  if (isPending) return <div>Loading...</div>;

  const user = {
    name: session?.user.name || "User",
    email: session?.user.email || "No email",
    codeforcesHandle: 'Not Yet Verified',
  };

  console.log("client side user: ", user);
  console.log("session established: ", session);

  const handleStartDuel = () => console.log('Starting duel...');
  
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
            <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
              <span className="text-xs w-20">Codeforces:</span>
              <span className="font-mono text-sm font-bold text-yellow-400">@{user.codeforcesHandle}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button 
              onClick={handleStartDuel}
              className="w-full bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold shadow-lg h-12 rounded-lg"
            >
              ⚔️ Start Duel
            </Button>
            <Button 
              onClick={handleSignOut}
              variant="outline"
              className="w-full border-white/50 text-white hover:bg-white/10 h-12 rounded-lg"
            >
              🚪 Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
