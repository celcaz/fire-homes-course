"use client";

import PropertyForm from "@/components/property-form";
import { Property } from "@/types/property";
import { propertyDataSchema } from "@/validation/propertySchema";
import { SaveIcon } from "lucide-react";
import z from "zod";
import { updateProperty } from "./actions";
import { auth } from "@/firebase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = Property;

export default function EditPropertyForm({
  id,
  address1,
  bathrooms,
  bedrooms,
  city,
  description,
  postcode,
  price,
  status,
  address2,
  images = [],
}: Props) {
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof propertyDataSchema>) => {
    const authToken = await auth?.currentUser?.getIdToken();
    if (!authToken) {
      return;
    }
    const response = await updateProperty({ ...data, id }, authToken);

    if (!!response.error) {
      toast.error("Error!", {
        description: response.error,
      });
      return;
    }

    toast.success("Success!", {
      description: "Property updated",
    });

    router.push("/admin-dashboard");
  };
  return (
    <div>
      <PropertyForm
        handleSubmit={handleSubmit}
        submitButtonLabel={
          <>
            <SaveIcon /> Save Property
          </>
        }
        defaultValues={{
          address1,
          bathrooms,
          bedrooms,
          city,
          description,
          postcode,
          price,
          status,
          address2,
          images: images.map((image) => ({
            id: image,
            url: image,
          })),
        }}
      />
    </div>
  );
}
