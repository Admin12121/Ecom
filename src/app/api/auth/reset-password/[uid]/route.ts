import { NextRequest, NextResponse } from "next/server";
import { OtpSchema, PasswordSchema } from "@/schemas/index";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = OtpSchema.safeParse(body);
    if (!validated.success) {
      const errors = validated.error.errors.map(err => err.message);
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }
    const { otp, uid } = validated.data;
    const response = await fetch(`${process.env.BACKEND_URL}/api/accounts/reset_password/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otp, uid }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      let firstError = "Failed to Verify OTP";
      for (const key in errorData.errors) {

        if (errorData.errors[key]?.length > 0) {

          firstError = errorData.errors[key][0];
          break;
        }
      }
      return NextResponse.json(
        { error: firstError || "Failed to Verify OTP", success: false },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(
      {
        message: "OTP Verified Successfully",
        success: true,
        redirectUrl: `/auth/reset-password/${data.uid}/${data.token}`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = PasswordSchema.safeParse(body);
    if (!validated.success) {
      const errors = validated.error.errors.map(err => err.message);
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }
    const { password, uid, token } = validated.data;
    const response = await fetch(`${process.env.BACKEND_URL}/api/accounts/reset_password/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, uid, token }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      let firstError = "Failed to Verify OTP";
      for (const key in errorData.errors) {

        if (errorData.errors[key]?.length > 0) {

          firstError = errorData.errors[key][0];
          break;
        }
      }
      return NextResponse.json(
        { error: firstError || "Failed to Verify OTP", success: false },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(
      {
        message: "OTP Verified Successfully",
        success: true,
        redirectUrl: `/auth/login`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
