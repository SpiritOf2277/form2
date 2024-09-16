import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const MultiStepForm = () => {
  const [step, setStep] = useState(1); // Поточний крок
  const [categoryData, setCategoryData] = useState(null);
  const [productData, setProductData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Функція для обробки даних категорії
  const handleCategorySubmit = (data) => {
    setCategoryData(data); // Зберігаємо дані категорії
    setStep(2); // Переходимо на наступний крок
  };

  // Функція для обробки даних продукту
  const handleProductSubmit = async (data) => {
    try {
      const productResponse = await axios.post('/api/products', data);
      setProductData(productResponse.data); // Зберігаємо дані продукту
      console.log('Product added successfully:', productResponse.data);
      alert('Product added successfully');
      setStep(3); // Переходимо на результат
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      {step === 1 && (
        <form onSubmit={handleSubmit(handleCategorySubmit)}>
          <h2>Add Category</h2>

          {/* Назва категорії */}
          <label>
            Category Name:
            <input
              type="text"
              {...register('categoryName', {
                required: 'Category name is required',
                minLength: { value: 2, message: 'At least 2 characters' },
              })}
            />
            {errors.categoryName && (
              <p style={{ color: 'red' }}>{errors.categoryName.message}</p>
            )}
          </label>
          <br />

          {/* Опис категорії */}
          <label>
            Description:
            <input
              type="text"
              {...register('categoryDescription', {
                required: 'Description is required',
              })}
            />
            {errors.categoryDescription && (
              <p style={{ color: 'red' }}>{errors.categoryDescription.message}</p>
            )}
          </label>
          <br />

          <button type="submit">Next</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit(handleProductSubmit)}>
          <h2>Add Product</h2>

          {/* Назва продукту */}
          <label>
            Product Name:
            <input
              type="text"
              {...register('productName', {
                required: 'Product name is required',
                minLength: { value: 2, message: 'At least 2 characters' },
              })}
            />
            {errors.productName && (
              <p style={{ color: 'red' }}>{errors.productName.message}</p>
            )}
          </label>
          <br />

          {/* Ціна продукту */}
          <label>
            Price (in kopiykas):
            <input
              type="number"
              {...register('productPrice', {
                required: 'Price is required',
                min: { value: 1, message: 'Price must be greater than 0' },
              })}
            />
            {errors.productPrice && (
              <p style={{ color: 'red' }}>{errors.productPrice.message}</p>
            )}
          </label>
          <br />

          {/* Опис продукту */}
          <label>
            Product Description:
            <input
              type="text"
              {...register('productDescription', {
                required: 'Description is required',
              })}
            />
            {errors.productDescription && (
              <p style={{ color: 'red' }}>{errors.productDescription.message}</p>
            )}
          </label>
          <br />

          <button type="submit">Submit</button>
        </form>
      )}

      {step === 3 && categoryData && productData && (
        <div>
          <h2>Category and Product Added</h2>
          <div>
            <h3>Category</h3>
            <p>Name: {categoryData.categoryName}</p>
            <p>Description: {categoryData.categoryDescription}</p>
          </div>
          <div>
            <h3>Product</h3>
            <p>Name: {productData.productName}</p>
            <p>Price: {(productData.productPrice / 100).toFixed(2)} UAH</p>
            <p>Description: {productData.productDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
