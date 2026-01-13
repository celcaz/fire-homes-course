import PropertyStatusBadge from "@/components/property-status-badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getPropertyById } from "@/data/properties";
import { formatCurrency } from "@/lib/utils";
import { BathIcon, BedIcon } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import BackButton from "./back-button";

export default async function Property({ params }: { params: Promise<any> }) {
  const paramsValue = await params;
  const property = await getPropertyById(paramsValue.propertyId);

  const addressLines = [
    property.address1,
    property.address2,
    property.city,
    property.postcode,
  ].filter((addressLine) => !!addressLine);
  return (
    <div className="grid grid-cols-[1fr_500px]">
      <div>
        {!!property.images && (
          <Carousel className="w-full">
            <CarouselContent>
              {property.images?.map((image, index) => (
                <CarouselItem key={image}>
                  <div className="h-[80vh] min-h-80 relative">
                    <Image
                      src={`https://firebasestorage.googleapis.com/v0/b/fire-homes-course-8ca3a.firebasestorage.app/o/${encodeURIComponent(
                        image
                      )}?alt=media`}
                      alt={`Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {property.images.length > 1 && (
              <>
                <CarouselPrevious className="translate-x-24 size-12" />
                <CarouselNext className="-translate-x-24 size-12" />
              </>
            )}
          </Carousel>
        )}
        <div className="property-description max-w-screen-md mx-auto py-10 px-4">
          <BackButton />
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
