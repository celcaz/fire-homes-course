"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  minBedrooms: z.string().optional(),
});

export default function FiltersForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      maxPrice: searchParams.get("maxPrice") ?? "",
      minPrice: searchParams.get("minPrice") ?? "",
      minBedrooms: searchParams.get("minBedrooms") ?? "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log({ data });
    const newSearchParams = new URLSearchParams();

    if (data.minBedrooms) {
      newSearchParams.set("minBedrooms", data.minBedrooms);
    }
    if (data.minPrice) {
      newSearchParams.set("minPrice", data.minPrice);
    }
    if (data.maxPrice) {
      newSearchParams.set("maxPrice", data.maxPrice);
    }
    newSearchParams.set("page", "1");
    router.push(`/property-search?${newSearchParams.toString()}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-4 gap-2"
      >
        <FormField
          control={form.control}
          name="minPrice"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Min Price"
                  type="number"
                  min={0}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxPrice"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Max Price"
                  type="number"
                  min={0}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="minBedrooms"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Min bedrooms"
                  type="number"
                  min={0}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Search</Button>
      </form>
    </Form>
  );
}
