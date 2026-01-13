import { getProduct } from '@/lib/product';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 
  const product = await getProduct(id);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-950 dark:text-white font-bold">
      Product not found
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors py-8 sm:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mb-10 transition-colors bg-white dark:bg-gray-900 px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          ← BACK TO EXPLORER
        </Link>

        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-10 sm:p-20 bg-white flex items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-800">
            <div className="relative aspect-square w-full shadow-inner">
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
            
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-[1.1]">
              {product.title}
            </h1>
            
            <p className="text-4xl font-light text-green-600 dark:text-green-400 mb-10 font-mono">
              Rs. {product.price.toLocaleString()}
            </p>
            
            <div className="space-y-4 mb-12">
              <h2 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                PRODUCT DESCRIPTION
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            <button className="group mt-auto w-full sm:w-fit px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-black rounded-2xl shadow-xl shadow-blue-500/30 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3">
              ADD TO SHOPPING CART
              <span className="transition-transform group-hover:translate-x-2">→</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}