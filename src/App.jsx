import React from 'react'
import { atom, useRecoilValue, selectorFamily } from 'recoil'
import './App.css'
import { initialProductList } from './productList'

const productListAtom = atom({
  key: 'productListAtom',
  default: initialProductList
})

const filterAtom = atom({
  key: 'filterAtom',
  default: [{ brands: ['대구 반할만떡', '풀무원'], prices: [1000, 5000] }]
})

const productListSelectorFamily = selectorFamily({
  key: 'productListSelectorFamily', 
  get: (필터모음 = [{ brand: ['대구 반할만떡', '풀무원'] }]) => ({ get }) => {
    const productList = get(productListAtom)
    const 브랜드필터 = (상품) => {
      const 브랜드조건배열 = 필터모음?.find(필터 => 필터.brands)?.brands || []
      return 브랜드조건배열.some(브랜드 => {
        return 브랜드 === 상품.brand
      })
    }
    const 가격필터 = (상품) => {
      const [최솟값, 최댓값] = 필터모음?.find(필터 => 필터.prices)?.prices || []
      
      return 상품.price >= 최솟값 && 상품.price <= 최댓값
    }

    return productList.filter(브랜드필터).filter(가격필터)
  }
})

const ProductList = () => {
  const filter = useRecoilValue(filterAtom)
  const productList = useRecoilValue(productListSelectorFamily(filter))

  return (
    <>
      {
        productList.map(product => {
          return (
            <div>
              <span>{product.name}</span>
              <span>{product.price}</span>
            </div>
          )
        })
      }
    </>
  )
}

function App() {

  return (
    <div className="App">
      <ProductList />
    </div>
  )
}

export default App
