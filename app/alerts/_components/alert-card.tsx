import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Alert } from "@/types/alert.type";
import { TriangleAlert, X } from "lucide-react";

export function AlertCard(props: Alert) {
  return (
    <Card className="relative rounded-md">
      <div className="absolute left-0 top-0 w-2 bg-red-400 h-full rounded-l-md" />
      <CardHeader className="flex flex-row items-center justify-between gap-4 text-sm px-12">
        <div className="flex items-center gap-6">
          <TriangleAlert className="text-red-400" />
          <CardTitle className="flex items-center gap-1">
            O produto <CardDescription>{props.product.name}</CardDescription>{" "}
            está com apenas{" "}
            <CardDescription>{props.product.quantity}</CardDescription> unidades
            disponíveis em estoque.
          </CardTitle>
        </div>
        <div className="flex items-center gap-3">
          <Button variant={"secondary"} size={"icon"}>
            <X />
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
