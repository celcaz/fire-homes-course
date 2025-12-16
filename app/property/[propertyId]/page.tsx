import { Button } from "@/components/ui/button";
import { getPropertyById } from "@/data/properties";
import { ArrowLeftIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default async function Property({ params }: { params: Promise<any> }) {
  const paramsValue = await params;
  const property = await getPropertyById(paramsValue.propertyId);
  console.log("teste", { property });
  return (
    <div className="grid grid-cols-[1fr_400px]">
      <div>
        carousel
        <div className="property-description max-w-screen-md mx-auto py-10 px-4">
          <Button>
            <ArrowLeftIcon /> Back
          </Button>
          <ReactMarkdown>{property.description}</ReactMarkdown>
        </div>
      </div>
      <div className="bg-sky-200 h-screen sticky"></div>
    </div>
  );
}
