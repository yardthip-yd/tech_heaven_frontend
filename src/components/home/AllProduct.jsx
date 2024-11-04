import React from 'react'

const AllProduct = () => {

  const products = [
    { id: 1, name: "AMD Ryzen 5 5500", details: "Socket: AM4, 6 cores, 12 threads", price: "฿3,150.00", img: "https://via.placeholder.com/150" },
    { id: 2, name: "Intel Core i3-12100F", details: "Socket: 1700, 4 cores, 8 threads", price: "฿2,890.00", img: "https://via.placeholder.com/150" },
    { id: 3, name: "Intel Core i5-12400F", details: "Socket: 1700, 6 cores, 12 threads", price: "฿3,890.00", img: "https://via.placeholder.com/150" },
    { id: 4, name: "AMD Ryzen 5 5600X", details: "Socket: AM4, 6 cores, 12 threads", price: "฿4,970.00", img: "https://via.placeholder.com/150" },
    // Add more products as needed
  ];
  return (
    <div className="h-screen w-full flex items-center max-h-[300px] bg-blue-100">AllProduct

    </div>
  )
}

export default AllProduct