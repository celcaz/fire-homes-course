import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FiltersForm from "./filters-form";
import { Suspense } from "react";
import { getProperties } from "@/data/properties";

export default async function PropertySearch({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const searchParamsValue = await searchParams;

  const parsedPage = parseInt(searchParamsValue?.page);
  const parsedMinPrice = parseInt(searchParamsValue?.minPrice);
  const parsedMaxPrice = parseInt(searchParamsValue?.maxPrice);
  const parsedMinBedrooms = parseInt(searchParamsValue?.minBedrooms);

  const page = isNaN(parsedPage) ? 1 : parsedPage;
  const minPrice = isNaN(parsedMinPrice) ? null : parsedMinPrice;
  const maxPrice = isNaN(parsedMaxPrice) ? null : parsedMaxPrice;
  const minBedrooms = isNaN(parsedMinBedrooms) ? null : parsedMinBedrooms;

  const properties = await getProperties({
    pagination: { page, pageSize: 3 },
    filters: {
      minBedrooms,
      maxPrice,
      minPrice,
      status: ["sale"],
    },
  });

  console.log({ properties });
  return (
    <div className="max-w-screen-md mx-auto">
      <h1 className="text-4xl font-bold p-5">Property Search</h1>
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense>
            <FiltersForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
