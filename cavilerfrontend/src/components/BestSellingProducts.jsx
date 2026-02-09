import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Card = ({ children, className }) => {
  return (
    <div className={`border rounded-lg shadow-md bg-white ${className}`}>{children}</div>
  );
};

const CardContent = ({ children, className }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`w-full mt-3 py-2 rounded-lg text-white bg-orange-500 hover:bg-orange-600 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const products = [
  {
    id: 1,
    image: "/product1.jpg",
    title: "Vidyarjan Quick Revision Cards for JEE Physics, Chemistry and Mathematics 2025",
    price: "₹1554.00",
    oldPrice: "₹1999.00",
  },
  {
    id: 2,
    image: "/product2.jpg",
    title: "Vidyarjan 37 Years NEET Previous Year Solved Question Papers (PYQ) | Physics, Chemistry, and Biology",
    price: "₹999.00",
    oldPrice: "₹1999.00",
  },
  {
    id: 3,
    image: "/product3.jpg",
    title: "Vidyarjan Quick Revision Cards for NEET Physics, Chemistry and Biology 2025 | NEET Flash Cards",
    price: "₹1554.00",
    oldPrice: "₹1999.00",
  },
  {
    id: 4,
    image: "/product4.jpg",
    title: "Best NCERT Book for Vidyarjan Tejas | Physics, Chemistry, Biology",
    price: "₹3000.00",
    oldPrice: "₹3000.00",
  },
];

function handleClick (direction){


}
const BestSellingProducts = () => {
  return (
    <div className="px-4 py-8">
      <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-black ">🔥 Best Selling Products</h2>
        <a href="#" className="text-orange-500 font-semibold">View More &gt;</a>
      </div>
      <div className="relative mt-4">
        {/* Added justify-center to center the cards */}
        <div className="flex w-full  gap-4  ">
          {products.map((product) => (
            <Card key={product.id} className="w-full flex-shrink-0">
              <CardContent>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="mt-2 text-sm font-semibold line-clamp-2">
                  {product.title}
                </h3>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg font-bold">{product.price}</span>
                  <span className="text-sm text-gray-500 line-through">
                    {product.oldPrice}
                  </span>
                </div>
                <Button>+ ADD TO CART</Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <button onClick={()=>{handleClick(-1)}} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <button onClick={()=>handleClick(1)} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default BestSellingProducts;

