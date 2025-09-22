import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { CreateCategoryModal } from "./_components/create-category";
import type { Category } from "@/types/category.type";

export default async function CategoriesPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`, {
    next: {
      revalidate: 10,
    },
  });
  const categories: Category[] = await res.json();

  return (
    <div className="space-y-12">
      <h2 className="font-medium text-2xl tracking-tight">Categorias</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CreateCategoryModal />
        </div>
        <section className="grid grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="relative">
              <CardHeader className="flex items-center justify-between">
                <CardTitle>{category.name}</CardTitle>
                <Badge variant={"outline"}>
                  {category.totalProducts >= 1 && category.totalProducts}{" "}
                  {category.totalProducts > 1 && "Produtos"}{" "}
                  {category.totalProducts === 1 && "Produto"}
                  {category.totalProducts === 0 && "Nenhum Produto"}
                </Badge>
              </CardHeader>
              <CardContent>
                <CardDescription>{category.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <CardDescription>
                  {format(new Date(category.createdAt), "dd/MM/yyyy")}
                </CardDescription>
                <div
                  className="absolute bottom-6 rounded-l-xl left-1/2 h-6 flex items-center justify-center w-1/2"
                  style={{ backgroundColor: category.color }}
                >
                  <CardDescription className="text-foreground">
                    {category.color}
                  </CardDescription>
                </div>
              </CardFooter>
            </Card>
          ))}
        </section>
      </div>
    </div>
  );
}
