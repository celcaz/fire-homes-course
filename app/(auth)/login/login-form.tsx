"use client";

import ContinueWithGoogleButton from "@/components/continue-with-google-button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth";
import { passwordValidation } from "@/validation/registerUser";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  email: z.email(),
  password: passwordValidation,
});

export default function LoginForm() {
  const auth = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    auth?.loginWithEmail(data.email, data.password);

    // if (response?.error) {
    //   toast.error("Error!", {
    //     description: response.message,
    //   });
    //   return;
    // }

    // toast.success("Success!", {
    //   description: "Your account was created successfully",
    // });

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Password" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button type="submit">Login</Button>
        <div>
          Forgotten your password?
          <Link href="/forgot-password" className="pl-2 underline ">
            Reset it here.
          </Link>
        </div>
        <div className="text-center pb-5">or</div>
      </form>
      <ContinueWithGoogleButton />
    </Form>
  );
}
