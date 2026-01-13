"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import Loading from "@/app/loading";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then(setProduct)
      .catch(() => setError(true));
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-950 dark:text-white font-bold">
        Product not found
      </div>
    );
  }

  if (!product) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors py-8 sm:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mb-10 transition-colors bg-white dark:bg-gray-900 px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800"
        >
          ← BACK TO EXPLORER
        </Link>

        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-10 sm:p-20 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-800">
            <div className="relative aspect-square w-full">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="lg:w-1/2 p-8 sm:p-16 flex flex-col justify-center">
            <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg w-fit mb-8">
              {product.category}
            </span>

            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-6">
              {product.title}
            </h1>

            <p className="text-4xl font-light text-green-600 dark:text-green-400 mb-10 font-mono">
              Rs. {product.price.toLocaleString()}
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-12">
              {product.description}
            </p>

            <button className="mt-auto w-full sm:w-fit px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-black rounded-2xl shadow-xl transition-all">
              ADD TO SHOPPING CART →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
