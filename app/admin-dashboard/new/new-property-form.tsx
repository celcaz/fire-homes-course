"use client";

// import { createProperty } from "@/actions/property-actions";
import PropertyForm from "@/components/property-form";
import { useAuth } from "@/context/auth";
import {
  propertyDataSchema,
  propertySchema,
} from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import z from "zod";
import { createProperty } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ref, uploadBytesResumable, UploadTask } from "firebase/storage";
import { storage } from "@/firebase/client";
import { savePropertyImages } from "../actions";

export default function NewPropertyForm() {
  const auth = useAuth();
  const router = useRouter();

  async function handleSubmit(data: z.infer<typeof propertySchema>) {
    // seu código aqui

    const token = await auth?.currentUser?.getIdToken();
    if (!token) {
      return;
    }

    const { images, ...rest } = data;

    const response = await createProperty(rest, token);

    if (!!response.error || !response.propertyId) {
      toast.error("Error!", {
        description: response.error,
      });
      return;
    }

    const uploadTasks: UploadTask[] = [];
    const paths: string[] = [];

    images.forEach((image, index) => {
      if (image.file) {
        const path = `properties/${
          response.propertyId
        }/${Date.now()}-${index}-${image.file.name}`;
        paths.push(path);
        const storageRef = ref(storage, path);
        uploadTasks.push(uploadBytesResumable(storageRef, image.file));
      }
    });

    await Promise.all(uploadTasks);
    await savePropertyImages(
      { propertyId: response.propertyId, images: paths },
      token
    );

    toast.success("Success!", {
      description: "Property created",
    });

    router.push("/admin-dashboard");
  }
  return (
    <div>
      <PropertyForm
        handleSubmit={handleSubmit}
        submitButtonLabel={
          <>
            <PlusCircleIcon /> Create Property
          </>
        }
      />
    </div>
  );
}
