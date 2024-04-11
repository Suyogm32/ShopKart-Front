import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Center from './Center';
import ProductBox from './ProductBox';
const ProductsGrid=styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 20px;
  padding-top: 20px;
`;
const Title=styled.div`
  font-size: 2rem;
  font-weight: 700;
`;
const NewProducts = () => {
  const [recentProducts,setRecentProducts]=useState([]);
  useEffect(()=>{
    fetch('/api',{
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(resp => resp.json()) // Parse response body as JSON
    .then(data => {
      setRecentProducts(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  },[])
  return (
    <Center>
      <Title>New Arrivals</Title>
    <ProductsGrid>
      {recentProducts?.length>0 &&
        recentProducts.map((product,index)=>(
          <ProductBox key={index} {...product}/>
        ))
      }
    </ProductsGrid>
    </Center>
  )
}

export default NewProducts