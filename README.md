# 🛒 Product Explorer Dashboard 5. 
Open [https://demo-ecommerce-demo.netlify.app/].

A production-ready frontend application built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. This dashboard demonstrates component architecture, API integration, and responsive design.

i had to use useEffect because on hosting or in app router also somethimes these free api works sometimes dont work making ssr page client side but you can check src/lib.product.ts for api call

 const products = await getProducts();
 const product = await getProduct(id);
---

## 🚀 Setup Instructions

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd product-explorer

```


2. **Install dependencies:**
```bash
npm install

```


3. **Configure Next.js Images:**
Ensure `next.config.js` includes the following to allow the API images to load:
```javascript
images: {
  remotePatterns: [{ protocol: 'https', hostname: 'fakestoreapi.com' }],
}

```


4. **Run the development server:**
```bash
npm run dev


---

## ✨ Features Implemented

* 
**Product Listing**: Fetches and displays products from `https://fakestoreapi.com/products` in a responsive grid.


**Search & Filtering**:
* Client-side search by product title.


* Filter by distinct categories.


* Bonus: Sorting by price (High/Low) and Name (A-Z).


**Product Details**: Dynamic routing (`/products/[id]`) showing large images, titles, descriptions, and pricing.

**Favorites Feature**:
* Mark/unmark products as favorites.


* Persistent storage using `localStorage`.


* Filter to display only favorite items.




**UX & Responsive UI**:
* Mobile-first layout usable on mobile, tablet, and desktop.


* Loading states (Skeletons) and Error handling.


**Bonus Implementation**:
* Infinite scroll for product loading.


* Dark mode support.





---

## 🧠 Assumptions / Trade-offs

* 
**Client-Side State for Favorites**: Chose `localStorage` for favorites persistence as it provides the fastest user experience for client-side state without requiring a backend database.


* 
**Fetching Strategy**: Used Server Components for initial data fetching to improve SEO and initial load speed, while using Client Components for interactive filtering and sorting.


* 
**Infinite Scroll vs. Pagination**: Implemented Infinite Scroll to simulate a modern dashboard feel, even though the source API provides the full dataset in one request.


* 
**Component Structure**: Organized project into `components`, `lib`, `hooks`, and `types` folders to ensure clean, maintainable, and typed code.



---

**Next Step:** Would you like me to generate the Vercel deployment configuration or provide the unit test setup for this project?
