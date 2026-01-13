import axios from "axios";
import { Product } from "@/types/product";

export async function getProducts() {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");
    return res.data;
  } catch (error) {
    console.error("Build-time fetch failed:", error);
    return []; 
  }
}
export async function getProduct(id: string): Promise<Product> {
  try {
    const res = await axios.get<Product>(`https://fakestoreapi.com/products/${id}`);
    if (!res.data) {
      throw new Error("No data found for this product");
    }
    
    return res.data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw new Error("Product not found");
  }
}