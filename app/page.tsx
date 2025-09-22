import { RemovalsTable } from "@/components/removals-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CountsResume } from "@/types/counts.type";

export default async function Dashboard() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/counts`,
    {
      next: {
        revalidate: 10,
      },
    }
  );

  const counts: CountsResume = await response.json();

  const stats = [
    {
      title: "Produtos em estoque",
      value: counts.total,
    },
    {
      title: "Estoque baixo",
      value: counts.minumum,
    },
    {
      title: "Entradas",
      value: counts.join,
    },
    {
      title: "Saídas",
      value: counts.removal,
    },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h2 className="font-medium text-2xl tracking-tight">Dashboard</h2>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader>
              <CardTitle>{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-3xl">{stat.value}</span>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <h3 className="font-medium text-xl">Últimas retiradas</h3>
        <RemovalsTable />
      </section>
    </div>
  );
}
