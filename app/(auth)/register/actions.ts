"use server";

import { auth } from "@/firebase/server";
import { registerUserSchema } from "@/validation/registerUser";

export const registerUser = async (data: {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
}) => {
  const validation = registerUserSchema.safeParse(data);

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0]?.message ?? "An error ocurred",
    };
  }

  try {
    await auth.createUser({
      displayName: data.name,
      email: data.email,
      password: data.password,
    });
  } catch (error) {
    return {
      error: true,
      message: "Could not register user",
    };
  }
};
