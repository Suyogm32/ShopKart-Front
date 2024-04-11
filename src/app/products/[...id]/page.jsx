"use client";
import Header from '@/app/components/Header'
import React from 'react'
import CartContextProvider from '@/app/components/CartContext';

const  ProductPage = () => {
  return (
    <CartContextProvider>
    <Header/>
    </CartContextProvider>
  )
}

export default  ProductPage