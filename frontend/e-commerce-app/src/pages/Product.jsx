import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useParams, useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate
import Breadcrum from '../components/Breadcrums/Breadcrum';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook for redirection

  // Find the product by id
  useEffect(() => {
    const foundProduct = all_product.find((e) => e.id === Number(productId));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/404'); // Redirect to a 404 page if product is not found
    }
  }, [all_product, productId, navigate]); // Include navigate in dependency array

  // Check if product is not yet loaded or missing
  if (!product) {
    return (
      <div>
        <p>Loading product details...</p>
      </div>
    );
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox product={product} /> {/* Pass the product to DescriptionBox */}
      <RelatedProducts productId={product.id} /> {/* Pass the productId to RelatedProducts */}
    </div>
  );
};

export default Product;
