import { CreateProductModal } from "@/components/create-product-modal"
import { ProductsTable } from "@/components/products-table"

export default async function Home() {

  return (
    <div>
      <div className="space-y-4">
        <CreateProductModal />
        <ProductsTable />
      </div>
    </div>
  )
}