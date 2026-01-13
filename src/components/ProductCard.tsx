"use client";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { BiSolidStar, BiStar } from "react-icons/bi";

interface ProductCardProps {
  product: Product;
  isFav: boolean;
  onToggle: (id: number) => void;
}

export default function ProductCard({ product, isFav, onToggle }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col border rounded-2xl bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
      <Link href={`/products/${product.id}`} className="flex flex-col h-full">
        <div className="relative aspect-square w-full bg-white flex items-center justify-center overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-8 group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="p-5 flex flex-col flex-grow space-y-3">
          <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest px-2 py-1 bg-blue-50 dark:bg-blue-900/30 w-fit rounded-md">
            {product.category}
          </p>
          <h3 className="font-bold text-gray-900 dark:text-gray-100 line-clamp-2 leading-tight">
            {product.title}
          </h3>
          <div className="mt-auto pt-4 flex items-center justify-between">
            <span className="text-xl font-black text-gray-900 dark:text-white">
              Rs. {product.price}
            </span>
            <div className="text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                VIEW DETAILS →
            </div>
          </div>
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggle(product.id);
        }}
        className="absolute top-4 right-4 p-2.5 rounded-full bg-white/70 dark:bg-gray-800/70 shadow-lg backdrop-blur-md z-10 hover:bg-white dark:hover:bg-gray-700 transition-all border border-white/50 dark:border-gray-700"
      >
        {isFav ? (
          <BiSolidStar className="text-yellow-500 text-xl" />
        ) : (
          <BiStar className="text-gray-400 dark:text-gray-500 text-xl" />
        )}
      </button>
    </div>
  );
}