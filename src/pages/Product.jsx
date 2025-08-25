 import { ToastContainer, toast } from 'react-toastify';

import { useEffect, useState } from "react"
import axios from "axios"

import ProductForm from "../components/ProductForm"
import Edit from "../components/Edit"
import CardItem from "../components/Carditem"

export const Product = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const categories = ["All Categories", "electronics", "jewelery", "men's clothing", "women's clothing"]

  // fetch products
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data)
        setFilteredProducts(res.data)
      })
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory])

  // delete product by id
  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id))
    toast.success("Product deleted successfully!")
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    toast.info("Editing product...")
  }

  const handleAddProduct = (newProduct) => {
    const productWithId = { ...newProduct, id: Date.now() }
    setProducts([productWithId, ...products])
    setShowAddForm(false)
    toast.success("Product added successfully!")
  }

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))
    setEditingProduct(null)
    toast.success("Product updated successfully!")
  }

  return (
    <div className="upper">

      <div className="w-80 bg-white shadow-sm p-6 actionbar">
        <div className="bg-white rounded-lg border p-4">
          <h3 className="text-lg font-semibold mb-4">Actions</h3>

          <button
            onClick={() => setShowAddForm(true)}
            className="w-full bg-black text-white py-3 px-4 rounded-lg mb-6 hover:bg-gray-800 transition-colors"
          >
            Add New Product
          </button>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Search Products</h4>
              <input
                type="text"
                placeholder="Search by product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            <div>
              <h4 className="font-medium mb-2">Filter by Category</h4>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 element-box">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Products ({filteredProducts.length})</h2> <hr />
        </div>

        <CardItem products={filteredProducts} onDelete={handleDelete} onEdit={handleEdit} />
      </div>

      {showAddForm && (
        <ProductForm
          onSubmit={handleAddProduct}
          onClose={() => setShowAddForm(false)}
          categories={categories.slice(1)} 
        />
      )}

      {editingProduct && (
        <Edit
          product={editingProduct}
          onSubmit={handleUpdateProduct}
          onClose={() => setEditingProduct(null)}
          categories={categories.slice(1)} 
        />
      )}
      <ToastContainer />
    </div>
  )
}

export default Product
