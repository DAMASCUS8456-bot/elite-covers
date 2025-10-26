import Image from "next/image";

export default function Home() {
  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold mb-4">Welcome to the Store</h1>
      <p className="opacity-80 mb-6">Browse our latest products and add them to your cart.</p>
      <div>
        <a className="text-blue-600 underline" href="/products">Go to Products →</a>
      </div>
    </div>
  );
}
