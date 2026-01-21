import { CFSubmission } from '@/types/global';

export async function checkVerificationSubmission(
  handle: string, 
  contestId: number, 
  problemIndex: string,
  maxAttempts = 10
): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const url = `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=5`;
      console.log("URL", url);
      const res = await fetch(url);
      const data = await res.json();

    //   console.log("Data:", data);
      
      if (data.status === 'OK' && data.result.length > 0) {
        const recent = data.result[0] as CFSubmission;
        console.log("recent: ", recent);
        console.log(recent);
        if (
          recent.problem.contestId === contestId &&
          recent.problem.index === problemIndex &&
          recent.verdict === 'OK'
        ) {
          return true;
        }
      }
    } catch (error) {
      console.error('API Error:', error);
    }
    
    if (i < maxAttempts - 1) {
      await new Promise(r => setTimeout(r, 30000));
    }
  }
  return false;
}
