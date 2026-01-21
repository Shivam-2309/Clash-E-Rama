import { NextRequest, NextResponse } from 'next/server';
import { checkVerificationSubmission } from '@/lib/cf-verification/cf-verify';

export async function POST(req: NextRequest) {
  try {
    // console.log("Here");
    const { handle, contestId, problemIndex } = await req.json();
    // console.log("Handle: ", handle);
    // console.log("ContestId: ", contestId);
    // console.log("Problem Index", contestId);
    const verified = await checkVerificationSubmission(handle, contestId, problemIndex);
    
    if (verified) {
      return NextResponse.json({ success: true, message: 'Handle verified!' });
    }
    
    return NextResponse.json({ success: false, message: 'No matching submission found' });
  } catch (error) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
