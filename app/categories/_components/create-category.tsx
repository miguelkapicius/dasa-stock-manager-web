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
import { Plus } from "lucide-react";
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

import { revalidateCategories } from "@/lib/actions";

const createCategoryFormSchema = z.object({
  name: z.string(),
  color: z.string(),
  description: z.string(),
});

export function CreateCategoryModal() {
  const form = useForm({
    resolver: zodResolver(createCategoryFormSchema),
    defaultValues: {
      name: "",
      color: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createCategoryFormSchema>) {
    console.log(values);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    await revalidateCategories();

    if (!response.ok) {
      toast.info("Falha ao criar categoria");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus /> Criar Categoria
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <DialogHeader>
            <DialogTitle>Criar Categoria</DialogTitle>
            <DialogDescription>
              Preencha as informações abaixo para criar a categoria.
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
                  <FormLabel>Nome da Categoria</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="Ex: Descartáveis"
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
                      placeholder="Ex: Produtos de uso único, destinados ao consumo imediato ou temporário, que devem ser descartados após a utilização."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3">
                  <FormLabel>Cor</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Criar Categoria
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
