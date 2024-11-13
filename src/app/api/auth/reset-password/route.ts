import { NextRequest, NextResponse } from "next/server";
import { ResetPasswordSchema } from "@/schemas/index";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = ResetPasswordSchema.safeParse(body);
    if (!validated.success) {
      const errors = validated.error.errors.map(err => err.message);
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }
    const { email } = validated.data;
    const response = await fetch(`${process.env.BACKEND_URL}/api/accounts/reset_password/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      let firstError = "Failed to Send Reset Password Email";
      for (const key in errorData.errors) {

        if (errorData.errors[key]?.length > 0) {

          firstError = errorData.errors[key][0];
          break;
        }
      }
      return NextResponse.json(
        { error: firstError || "Failed to Send Reset Password Email",  },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(
      {
        message: "Reset Password Email Sent Successfully",
        success: true,
        redirectUrl: `/auth/reset-password/${data.uid}`,
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
