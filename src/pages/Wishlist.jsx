import React, { useEffect } from 'react';
import { ShoppingCart, Trash, HeartOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
import { Card } from "@/components/ui/card";

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
    toast.error("Removed from wishlist!");
  };

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    toast.success("Added to cart!");
  };

  if (wishlist.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-slate-900">Wishlist</h2>
        <p className="text-slate-600 mb-8">Manage your saved products and add them to your cart when you're ready to purchase.</p>
        <Card className="p-12 text-center">
          <HeartOff className="w-16 h-16 mx-auto mb-4 text-slate-400" />
          <h3 className="text-xl font-semibold mb-2 text-slate-700">Your wishlist is empty</h3>
          <p className="text-slate-500 mb-6">Start adding items to your wishlist to save them for later!</p>
          <button 
            onClick={() => navigate('/products')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Products
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto mb-20">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Wishlist</h2>
        <p className="text-slate-600 mt-2">Manage your saved products and add them to your cart when you're ready to purchase.</p>
      </div>

      {/* Wishlist Table */}
      <Card className="overflow-y-auto max-h-[80vh]">
        <Table>
          <TableCaption>Your saved items</TableCaption>
          <TableBody>
            {wishlist.map((item) => (
              <TableRow 
                key={item.product?.id}
                className="group hover:bg-slate-50 transition-colors"
              >
                <TableCell className="w-24">
                  {item.product?.ProductImages.length > 0 && (
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={item.product.ProductImages[0].imageUrl}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell 
                  className="cursor-pointer"
                  onClick={() => navigate(`/product/${item.product?.id}`)}
                >
                  <div className="group-hover:text-blue-600 transition-colors font-medium text-base mb-1">
                    {item.product?.name || 'Unknown Product'}
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2">
                    {item.product?.description || 'No Description'}
                  </p>
                </TableCell>
                <TableCell className="font-medium text-base text-slate-900">
                  THB {(item.product?.price || 0).toLocaleString("en-US", { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}
                </TableCell>
                <TableCell className="w-20">
                  <button
                    onClick={() => handleAddToCart(item.product)}
                    className="p-2 rounded-full hover:bg-blue-100 transition-colors group/btn"
                    disabled={!item.product}
                    title="Add to Cart"
                  >
                    <ShoppingCart className="w-5 h-5 group-hover/btn:text-blue-600 transition-colors" />
                  </button>
                </TableCell>
                <TableCell className="w-20">
                  <button
                    onClick={() => handleDelete(item.product?.id)}
                    disabled={!item.product}
                    className="p-2 rounded-full hover:bg-red-100 transition-colors group/btn"
                    title="Remove from Wishlist"
                  >
                    <Trash className="w-5 h-5 group-hover/btn:text-red-600 transition-colors" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Wishlist;
