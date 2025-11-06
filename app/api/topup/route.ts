import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  return NextResponse.json(
        { success: true },
      { status: 200 }
     );
  // try {
  //   const { angpaoCode, amount } = await request.json();

  //   if (!angpaoCode || !amount) {
  //     return NextResponse.json(
  //       { message: 'Missing required fields' },
  //       { status: 400 }
  //     );
  //   }

  //   // ส่ง request ไปยัง API ภายนอก
  //   const response = await axios.get(`https://api.xpluem.com/${angpaoCode}/0928388730`);
    
  //   return NextResponse.json(response.data);
  // } catch (error: any) {
  //   console.error('API Error:', error);
    
  //   if (error.response?.data) {
  //     return NextResponse.json(
  //       error.response.data,
  //       { status: error.response.status }
  //     );
  //   } else {
  //     return NextResponse.json(
  //       { message: 'Internal server error' },
  //       { status: 500 }
  //     );
  //   }
  // }
}