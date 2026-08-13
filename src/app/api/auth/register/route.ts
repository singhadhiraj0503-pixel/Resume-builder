import { connectToDB } from "@/lib/database";
import { generateToken } from "@/lib/jwt";
import userModel from "@/models/user.model";
import { APIResponse } from "@/types/api.types";
import { RegisterBody } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();

    const body: RegisterBody = await req.json();

    const { name, email, password, mobile } = body;

    if (!name || !email || !password || !mobile) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 },
      );
    }

    const isExisted = await userModel.findOne({ email });

    if (isExisted) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          message: "User Already Exists",
        },
        { status: 409 },
      );
    }

    const newUser = await userModel.create({ name, email, password, mobile });

    const token = generateToken({ userId: newUser._id });

    const response = NextResponse.json<APIResponse>(
      {
        success: true,
        message: "User Registered Successfully",
        data: {
          user: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
          },
        },
      },
      { status: 201 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    return response;
  } catch (error) {
    console.log("Error in registering API!!", error);
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
};
