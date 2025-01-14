import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/solid";
import Spinner from "../../Components/Spinner";
import { useProduct } from "../../Context/ProductContext"; // Ensure correct import path
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import { useFavorite } from "../../Context/FavoriteContext"; // Ensure correct import path
import styles from "./styles.module.css"; // Ensure the correct path to the CSS file

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { product, loading, error, fetchProductByID } = useProduct(); // Get fetchProductByID from the context
  const { addToFavorite, favoriteItems } = useFavorite();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const findCartItem = cartItems.find((item) => item.id === product?.id);
  const findFavoriteItem = favoriteItems.find((item) => item.id === product?.id);

  const { product_id } = useParams(); // Get the product ID from URL params

  useEffect(() => {
    if (product_id) {
      console.log("Fetching product with ID:", product_id); // Debugging log for product_id
      fetchProductByID(product_id); // Trigger the API call to fetch product
    }
  }, [product_id, fetchProductByID]); // Ensure fetchProductByID is a dependency

  console.log("Fetched product:", product); // Debugging log for fetched product

  const handleCartClick = () => {
    const productToAdd = {
      ...product,
      image: product.imageUrl // Ensure 'image' is set when adding to the cart
    };
  
    if (findCartItem) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(productToAdd)); // Add product with the correct 'image' key
    }
  };
  

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>No product found.</p>;
  }

  return (
    <div className="flex flex-wrap max-w-7xl mx-auto my-4">
      <div className="w-full sm:w-2/2 md:w-2/2 xl:w-5/5 p-4 flex flex-wrap">
        <img
          alt="ecommerce"
          className={styles.image}
          src={product.imageUrl || "/placeholder.png"} // Fallback for missing images
        />
        <div className="lg:w-2/3 w-full lg:pl-10 lg:py-6 my-auto">
          <h2 className={styles.brand}>
            {product.category ? product.category.toUpperCase() : "No Category"} {/* Fallback for category */}
          </h2>
          <h1 className="text-gray-900 text-2xl font-bold tracking-tight mb-1">
            {product.name || "No Title Available"} {/* Fallback for name */}
          </h1>
          <div className={styles.rating}>
            {/* Handle ratings */}
            <p className="text-xs ml-1 font-light mt-0.5">No ratings available</p>
          </div>
          <p className={styles.productDetailText}>
            {product.description || "No description available"} {/* Fallback for description */}
          </p>
          <div className="flex">
            <div className="my-auto">
              <span className="font-extralight text-2xl inline-block align-middle mt-2 my-auto">
                $ {product.price ? product.price.toFixed(2) : "0.00"}
              </span>
            </div>
            <div className="block ml-auto my-auto mt-0">
              <div className={styles.addToCart}>
                <button className={styles.addToCartButton} onClick={handleCartClick}>
                  <ShoppingCartIcon className={styles.shoppingCartIcon} aria-hidden="true" />
                  <div className="flex flex-col self-center">
                    <span className={styles.buttonText}>
                      {findCartItem ? "Remove from cart" : "Add to Cart"}
                    </span>
                  </div>
                </button>
              </div>
            </div>
            <div className="block my-auto">
              <button
                className={!findFavoriteItem ? styles.favButton : styles.removeFavButton}
                onClick={() => addToFavorite(product, findFavoriteItem)}
              >
                <HeartIcon className={styles.heartIcon} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
