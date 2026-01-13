import { Product } from "@/types/product";

const API = "https://fakestoreapi.com/products";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(API);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${API}/${id}`);

  if (!res.ok) {
    throw new Error("Product not found");
  }

  return res.json();
}
