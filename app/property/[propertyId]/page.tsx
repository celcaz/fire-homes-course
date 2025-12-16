import PropertyStatusBadge from "@/components/property-status-badge";
import { Button } from "@/components/ui/button";
import { getPropertyById } from "@/data/properties";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeftIcon, BathIcon, BedIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default async function Property({ params }: { params: Promise<any> }) {
  const paramsValue = await params;
  const property = await getPropertyById(paramsValue.propertyId);
  console.log("teste", { property });

  const addressLines = [
    property.address1,
    property.address2,
    property.city,
    property.postcode,
  ].filter((addressLine) => !!addressLine);
  return (
    <div className="grid grid-cols-[1fr_500px]">
      <div>
        carousel
        <div className="property-description max-w-screen-md mx-auto py-10 px-4">
          <Button>
            <ArrowLeftIcon /> Back
          </Button>
          <ReactMarkdown>{property.description}</ReactMarkdown>
        </div>
      </div>
      <div className="bg-sky-200 h-screen p-10 sticky top-0 grid place-items-center">
        <div className="flex flex-col gap-10 w-ful">
          <PropertyStatusBadge
            className="text-base mr-auto"
            status={property.status}
          />
          <h1 className="text-4xl font-semibold">
            {addressLines.map((addressLine, index) => (
              <div key={index}>
                {addressLine}
                {index < addressLines.length - 1 && ","}
              </div>
            ))}
          </h1>
          <h2 className="text-3xl font-light">
            {formatCurrency(property.price, {
              currency: "GBP",
              locale: "en-GB",
            })}
          </h2>
          <div className="flex gap-10">
            <div className="flex gap2">
              <BedIcon /> {property.bedrooms} Bedrooms
            </div>
            <div className="flex gap2">
              <BathIcon /> {property.bathrooms} Bathrooms
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
