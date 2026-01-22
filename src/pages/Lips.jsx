import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/product/ProductCard'

function ProductDetails({ category }) {

  const [data, setData] = useState({})

  useEffect(() => {
    axios
      .get('http://localhost:3000/products')
      .then((res) => setData(res.data[category] || {}))
  }, [category])

  return (
    <div className='flex flex-col gap-5 m-auto w-fit mt-5'>

      {Object.keys(data).map((section) => (
        <div key={section} className='flex flex-col gap-3'>
          <h2 className='text-3xl capitalize'>{section}</h2>

          <div className='flex gap-4'>
            {data[section].map((e) => (
              <ProductCard key={e.id} product={e} />
            ))}
          </div>
        </div>
      ))}

    </div>
  )
}

export default ProductDetails
