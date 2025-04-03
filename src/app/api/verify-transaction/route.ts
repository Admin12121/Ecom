import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  data: string;
}

interface EsewaResponse {
  product_code: string;
  transaction_uuid: string;
  total_amount: number;
  status: string;
  ref_id: string | null;
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const data = body.data;
    const decodedData = atob(data);
    const parsedData = JSON.parse(decodedData);
    const verificationUrl =
      "https://rc.esewa.com.np/api/epay/transaction/status/";
    //https://epay.esewa.com.np/api/epay/transaction/status/ for production
    const sanitizedAmount = Number(parsedData.total_amount.replace(/,/g, ''));
    const params = new URLSearchParams();
    params.append("product_code", "EPAYTEST");
    params.append("total_amount", sanitizedAmount.toString());
    params.append("transaction_uuid", parsedData.transaction_uuid);

    try {
      const response = await fetch(`${verificationUrl}?${params.toString()}`, {
        method: "GET",
      });
      const result: EsewaResponse = await response.json();
      if (result.status === "COMPLETE" || result.status === "PENDING") {
        return NextResponse.json(
          {
            message: "Transaction verified successfully.",
            transaction_status: result.status,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            message: "Transaction verification failed.",
            transaction_status: result.status,
          },
          { status: 400 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        {
          status: "error",
          message: "Internal Server Error",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}
