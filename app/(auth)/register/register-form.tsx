"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z
  .object({
    email: z.email(),
    name: z.string().min(2, "Name must be at least 2 characters"),
    password: z.string().refine(
      (value) => {
        const regex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return regex.test(value);
      },
      {
        message:
          "Password must contain at least 6 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
      }
    ),
    passwordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm)
      ctx.addIssue({
        message: "Password do not match",
        path: ["passwordConfirm"],
        code: "custom",
      });
  });

export default function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
    },
  });

  return <div></div>;
}
