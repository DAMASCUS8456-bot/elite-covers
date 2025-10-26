export default function OffersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-2">Current Offers</h1>
      <ul className="list-disc ml-6">
        <li>Free shipping on orders over $50</li>
        <li>Buy 2 tees, get 10% off</li>
        <li>Use code WELCOME10 for 10% off first order</li>
      </ul>
      <p className="text-sm opacity-70 mt-3">Offers subject to change and limited by stock availability.</p>
    </div>
  )
}
