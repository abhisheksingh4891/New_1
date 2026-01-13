import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/product";
// export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();
  
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Product Explorer
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Discover our curated collection of premium products.
          </p>
        </header>
        
        <ProductGrid products={products} />
      </div>
    </main>
  );
}