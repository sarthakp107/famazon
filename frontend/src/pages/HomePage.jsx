import React, { useEffect } from 'react'
import { Container, VStack, Text, Heading, HStack, SimpleGrid } from '@chakra-ui/react'
import { Link } from "react-router-dom"

import { LuShoppingCart } from "react-icons/lu"
import { useProductStore } from '../store/product'
import { ProductCard } from '../components/ProductCard'

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  },
    [fetchProducts]);
  console.log("prodcuts", products);
  return (
    <Container maxW='container.xl' py={12}>
      <VStack gap={"10px"}>

        <Heading as={"h1"} size={"4xl"} textAlign={"center"} mb={6} mt={5} textTransform={"uppercase"}>
          our products
        </Heading>

        <SimpleGrid

          columns={{
            base: 1,
            md: 2,
            lg: 3
          }}
          gap={"10px"}
          w={"full"}

        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}

        </SimpleGrid>

          {products.length === 0 && (
            <VStack spacing={6}>  {/* Use VStack for better spacing */}
            <Heading
              size="2xl"
              textAlign="center"
              textTransform="uppercase"
              color="red"
            >
              <HStack
                justify="center"
                spacing={4}
                mb={4}  /* Add margin bottom */
              >
                <LuShoppingCart size={50} />
                No Products found!
              </HStack>
            </Heading>
  
            <Link
              to="/create"
              style={{ textDecoration: 'none' }}  /* Remove underline */
            >
              <Text
                fontSize="xl"  /* Increased font size */
                color="blue.500"  /* Add color */
                fontWeight="semibold"  /* Make it bold */
                _hover={{
                  color: "blue.600",
                  textDecoration: "underline"
                }}
                transition="all 0.2s"  /* Smooth transition */
                cursor="pointer"
              >
                Create a Product
              </Text>
            </Link>
          </VStack>
          )}




      </VStack>
    </Container>
  )
}

export default HomePage