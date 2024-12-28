import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  data: {
    transaction_uuid: string;
    total_amount: string;
  };
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
    const { transaction_uuid, total_amount } = body.data;
    const verificationUrl =
      "https://uat.esewa.com.np/api/epay/transaction/status/";
    //https://epay.esewa.com.np/api/epay/transaction/status/ for production

    const params = new URLSearchParams();
    params.append("product_code", "EPAYTEST");
    params.append("total_amount", total_amount);
    params.append("transaction_uuid", transaction_uuid);

    try {
      const response = await fetch(`${verificationUrl}?${params.toString()}`, {
        method: "GET",
      });
      const result: EsewaResponse = await response.json();
      if (result.status === "COMPLETE" || result.status === "PENDING") {
        return NextResponse.json(
          {
            status: "success",
            message: "Transaction verified successfully.",
            transaction_status: result.status,
            ref_id: result.ref_id,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            status: "failure",
            message: "Transaction verification failed.",
            transaction_status: result.status,
            ref_id: result.ref_id,
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
