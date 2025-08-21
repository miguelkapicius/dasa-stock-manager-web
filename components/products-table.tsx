import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Product } from "@/types/product.type"
import {format} from "date-fns"
import {ptBR} from "date-fns/locale"

const programmingLanguages = [
  {
    id: "1",
    name: "JavaScript",
    releaseYear: "1995",
    developer: "Brendan Eich",
    typing: "Dynamic",
    paradigm: "Multi-paradigm",
    extension: ".js",
    latestVersion: "ES2021",
    popularity: "High",
  },
  {
    id: "2",
    name: "Python",
    releaseYear: "1991",
    developer: "Guido van Rossum",
    typing: "Dynamic",
    paradigm: "Multi-paradigm",
    extension: ".py",
    latestVersion: "3.10",
    popularity: "High",
  },
  {
    id: "3",
    name: "Java",
    releaseYear: "1995",
    developer: "James Gosling",
    typing: "Static",
    paradigm: "Object-oriented",
    extension: ".java",
    latestVersion: "17",
    popularity: "High",
  },
  {
    id: "4",
    name: "C++",
    releaseYear: "1985",
    developer: "Bjarne Stroustrup",
    typing: "Static",
    paradigm: "Multi-paradigm",
    extension: ".cpp",
    latestVersion: "C++20",
    popularity: "High",
  },
  {
    id: "5",
    name: "Ruby",
    releaseYear: "1995",
    developer: "Yukihiro Matsumoto",
    typing: "Dynamic",
    paradigm: "Multi-paradigm",
    extension: ".rb",
    latestVersion: "3.0",
    popularity: "Low",
  },
]

export async function ProductsTable() {

    const result = await fetch(`${process.env.BACKEND_URL!}/products`, {
      next: {
        revalidate: 60
      }
    })

    const products: Product[] = await result.json()

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
                <TableCell className="py-2">{product.description}</TableCell>
                <TableCell className="py-2">{product.quantity}</TableCell>
                <TableCell className="py-2">{format(new Date(product.createdAt), 'dd/MM/yyyy')}</TableCell>
                <TableCell className="py-2">{product.categoryName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    </div>
  )
}
