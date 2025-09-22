"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArchiveRestore } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { revalidateProducts } from "@/lib/actions";
import type { Product } from "@/types/product.type";
import { useState } from "react";

const joinProductFormSchema = z.object({
  quantity: z.number().min(1, "Quantidade deve ser maior que 0"),
});

export function JoinProductModal() {
  const form = useForm({
    resolver: zodResolver(joinProductFormSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const [productId, setProductId] = useState("");

  async function onSubmit(values: z.infer<typeof joinProductFormSchema>) {
    console.log(values);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/join/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, action: "ENTRADA_ESTOQUE" }),
      }
    );

    await revalidateProducts();

    if (!response.ok) {
      toast.info("Falha ao criar produto");
    }
  }

  const { data: products } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL!}/products`,
        {
          next: {
            tags: ["products"],
          },
        }
      );

      if (!result.ok) {
        toast.error("Falha ao buscar produtos");
        return [];
      }

      return await result.json();
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ArchiveRestore />
          Registrar Entrada
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <DialogHeader>
            <DialogTitle>Registrar Entrada</DialogTitle>
            <DialogDescription>
              Preencha as informações abaixo para registrar a entrada do
              produto.
            </DialogDescription>
          </DialogHeader>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade Mínima</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? 1}
                      type="number"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Select onValueChange={(v) => setProductId(v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o produto" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectGroup>
                  <SelectLabel>Produto</SelectLabel>
                  {products?.map((product: Product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button className="w-full" type="submit">
              Registrar Entrada
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
