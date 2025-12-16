import { PropertyStatus } from "@/types/propertyStatus";
import { Badge } from "./ui/badge";

const statusLabel = {
  sale: "Sale",
  draft: "Draft",
  withdrawn: "Withdrawn",
  sold: "Sold",
};

const variant: {
  [key: string]: "primary" | "secondary" | "destructive" | "success";
} = {
  sale: "primary",
  draft: "secondary",
  withdrawn: "destructive",
  sold: "success",
};

export default function PropertyStatusBadge({
  status,
  className,
}: {
  status: PropertyStatus;
  className?: string;
}) {
  const label = statusLabel[status];
  return (
    <Badge variant={variant[status]} className={className}>
      {label}
    </Badge>
  );
}
