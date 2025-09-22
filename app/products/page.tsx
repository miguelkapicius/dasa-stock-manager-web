import { CreateProductModal } from "@/app/products/_components/create-product-modal";
import { ProductsTable } from "@/app/products/_components/products-table";
import { JoinProductModal } from "./_components/join-product-modal";

export default function ProductsPage() {
  return (
    <div className="space-y-12">
      <h2 className="font-medium text-2xl tracking-tight">Produtos</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CreateProductModal />
          <JoinProductModal />
        </div>
        <ProductsTable />
      </div>
    </div>
  );
}
