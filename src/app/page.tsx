"use client";

import { useEffect, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/types/product";
import Loading from "./loading";

export default function Home() {

  //  i had to use useEffect because on hosting or in app router also somethimes these free api works sometimes dont work 
  // but you can check src/lib.product.ts for api call
  // const products = await getProducts();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://fakestoreapi.com/products", {
      signal: controller.signal,
    })
      .then(res => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(true);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load products. Please refresh.
      </p>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
