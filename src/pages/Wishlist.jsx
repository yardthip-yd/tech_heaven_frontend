import React, { useEffect } from 'react';
import { ShoppingCart, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useWishlistStore from '@/stores/wishlistStore';
import useCartStore from '@/stores/cartStore';
import useAuthStore from '@/stores/authStore';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, actionGetWishlist, actionRemoveFromWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  const { token } = useAuthStore();

  useEffect(() => {
    if (token) {
      actionGetWishlist(token);
    }
  }, [token, actionGetWishlist]);

  const handleDelete = (productId) => {
    actionRemoveFromWishlist(token, productId);
  };

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <Table>
          <TableCaption>List of your saved items in Wishlist.</TableCaption>
          <TableBody>
            {wishlist.map((item) => (
              <TableRow key={item.product?.id}>
                <TableCell className="flex justify-center items-center"> {/* ใช้ flex เพื่อจัดตำแหน่ง */}
                  {item.product?.ProductImages.length > 0 && (
                    <img 
                      src={item.product.ProductImages[0].imageUrl} 
                      alt={item.product.name} 
                      className="w-20 h-20 object-cover rounded-lg" 
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium text-base cursor-pointer" onClick={() => navigate(`/product/${item.product?.id}`)}>
                  {item.product?.name || 'Unknown Product'}
                  <p className="text-sm text-gray-500">{item.product?.description || 'No Description'}</p>
                </TableCell>
                <TableCell className="font-medium text-base">THB {item.product?.price || '0.00'}</TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => handleAddToCart(item.product)}
                    className="mr-2"
                    disabled={!item.product}
                  >
                    <ShoppingCart className="w-5 h-5 hover:text-blue-500 transition-transform" />
                  </button>
                </TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => handleDelete(item.product?.id)}
                    disabled={!item.product}
                  >
                    <Trash className="w-5 h-5 transition-transform" />
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
