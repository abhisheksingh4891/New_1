"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { useFavorites } from "@/hooks/useFavorites";
import {
  BiSolidStar,
  BiStar,
  BiSearch,
  BiFilterAlt,
  BiSort,
} from "react-icons/bi";

export default function ProductGrid({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [showFavs, setShowFavs] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();

  const [visibleCount, setVisibleCount] = useState(8);
  const observerTarget = useRef(null);

  // since i dont have api here so i using js methods if api would have been here then these all below not required

  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filtered = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    const matchesFavs = !showFavs || favorites.includes(p.id);
    return matchesSearch && matchesCategory && matchesFavs;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "name-az") return a.title.localeCompare(b.title);
    if (sortBy === "name-za") return b.title.localeCompare(a.title);
    return 0;
  });

  const loadMore = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && visibleCount < sorted.length) {
        setVisibleCount((prev) => prev + 4);
      }
    },
    [visibleCount, sorted.length]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(loadMore, { threshold: 0.1 });
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [loadMore]);

  const visibleProducts = sorted.slice(0, visibleCount);

  return (
    <section className="space-y-10">
      <div className="flex flex-col gap-6 bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl transition-all">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6 relative">
            <BiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all placeholder:text-gray-500 font-medium"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(8);
              }}
            />
          </div>

          <div className="md:col-span-3 relative">
            <BiFilterAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <select
              className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white capitalize appearance-none cursor-pointer font-medium"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setVisibleCount(8);
              }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3 relative">
            <BiSort className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <select
              className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white appearance-none cursor-pointer font-medium"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Sort By: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-az">Name: A to Z</option>
              <option value="name-za">Name: Z to A</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-6 gap-4">
          <div className="flex gap-2"></div>

          <button
            onClick={() => setShowFavs(!showFavs)}
            className={`group flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all shadow-sm border ${
              showFavs
                ? "bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400"
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-red-200 dark:hover:border-red-900/50"
            }`}
          >
            {showFavs ? (
              <BiSolidStar className="text-xl" />
            ) : (
              <BiStar className="text-xl group-hover:text-red-500 transition-colors" />
            )}
            <span>{showFavs ? "Showing Favorites" : "Favorites Only"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFav={favorites.includes(product.id)}
            onToggle={toggleFavorite}
          />
        ))}
      </div>

      <div
        ref={observerTarget}
        className="flex flex-col items-center justify-center py-16"
      >
        {visibleCount < sorted.length ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-bold tracking-widest text-xs uppercase">
              Loading More
            </p>
          </div>
        ) : (
          <p className="text-gray-400 font-medium">
            You&apos;ve reached the end of the collection.
          </p>
        )}
      </div>
    </section>
  );
}
