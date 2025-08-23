import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types/product.type";
import { format } from "date-fns";

export async function ProductsTable() {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL!}/products`,
    {
      next: {
        revalidate: 60,
        tags: ["products"],
      },
    }
  );

  const products: Product[] = await result.json();

  return (
    <div>
      <div className="bg-background overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="h-9 py-2">Nome</TableHead>
              <TableHead className="h-9 py-2">Descrição</TableHead>
              <TableHead className="h-9 py-2">Quantidade</TableHead>
              <TableHead className="h-9 py-2">Data</TableHead>
              <TableHead className="h-9 py-2">Categoria</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="py-2">{product.name}</TableCell>
                <TableCell className="py-2 truncate max-w-xs">
                  {product.description}
                </TableCell>
                <TableCell className="py-2">{product.quantity}</TableCell>
                <TableCell className="py-2">
                  {format(new Date(product.createdAt), "dd/MM/yyyy")}
                </TableCell>
                <TableCell className="py-2">{product.categoryName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
