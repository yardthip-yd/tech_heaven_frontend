// pages/Wishlist.js
import React, { useEffect } from 'react';
import { ShoppingCart, Trash } from 'lucide-react';
import useWishlistStore from '@/stores/wishlistStore';
import useCartStore from '@/stores/cartStore';
import useAuthStore from '@/stores/authStore'; 
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Wishlist = () => {
  const { wishlist, actionGetWishlist, actionRemoveFromWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addToCart);
  const { token } = useAuthStore(); 

  useEffect(() => {
    if (token) {
      actionGetWishlist(token); // ใช้ token ในการเรียกดึงข้อมูล wishlist
    }
  }, [token, actionGetWishlist]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <Table>
          <TableCaption>List of your saved items in Wishlist.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wishlist.map((item) => (
              <TableRow key={item.product.id}>
                <TableCell className="font-medium">{item.product.name}</TableCell>
                <TableCell>{item.product.description}</TableCell>
                <TableCell>THB {item.product.price}</TableCell>
                <TableCell className="text-right">
                  <button
                    onClick={() => addToCart({ ...item.product, quantity: 1 })}
                    className="mr-2"
                  >
                    <ShoppingCart className="w-5 h-5 hover:scale-110 transition-transform text-blue-500" />
                  </button>
                  <button
                    onClick={() => actionRemoveFromWishlist(token, item.product.id)}
                    className="text-red-500"
                  >
                    <Trash className="w-5 h-5 hover:scale-110 transition-transform" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Wishlist;
