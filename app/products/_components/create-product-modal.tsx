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
import { Minus, Plus } from "lucide-react";
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
import { Textarea } from "../../../components/ui/textarea";
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
import type { Category } from "@/types/category.type";
import { revalidateProducts } from "@/lib/actions";

const createProductFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  quantity: z.number().default(0),
  minQuantity: z.number().min(1).default(1),
  categoryId: z.string(),
});

export function CreateProductModal() {
  const form = useForm({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: {
      name: "",
      description: "",
      minQuantity: 1,
      categoryId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createProductFormSchema>) {
    console.log(values);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    await revalidateProducts();

    if (!response.ok) {
      toast.info("Falha ao criar produto");
    }
  }

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const categoriesResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`,
        {
          next: {
            revalidate: 30,
            tags: ["categories"],
          },
        }
      );

      return categoriesResponse.json();
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus /> Criar Produto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <DialogHeader>
            <DialogTitle>Criar Produto</DialogTitle>
            <DialogDescription>
              Preencha as informações abaixo para criar o produto.
            </DialogDescription>
          </DialogHeader>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Produto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Seringa"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ex: Seringa descartável estéril, corpo transparente com graduação, bico Luer Slip/Luer Lock, capacidade de 10 mL, embalagem individual, uso único."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minQuantity"
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
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          <SelectLabel>Categoria</SelectLabel>
                          {categories.map((category: Category) => (
                            <SelectItem key={category.id} value={category.id}>
                              <div
                                style={{
                                  backgroundColor: category.color,
                                }}
                                className="aspect-square size-3 rounded"
                              />
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Criar Produto
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
