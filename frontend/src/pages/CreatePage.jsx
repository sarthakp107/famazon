import { Container, VStack, Box, Heading, Input, Button } from '@chakra-ui/react';
import React from 'react'
import { useState } from 'react';
import { useColorModeValue } from '../components/ui/color-mode';
import { useProductStore } from '../store/product';
import { useToast } from '@chakra-ui/toast';






const CreatePage = () => {

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });

    const toast = useToast();
    const {createProduct} = useProductStore();
    const handleAddProduct = async() => {
      
        const {success,message} = await createProduct(newProduct);
        console.log("Response:", {success, message});
        if(!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true
              });
        }else{
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true
              });
        }
    };
    
    return (
        <Container maxW={"container.sm"}>
            <VStack
                spacing={8}
            >
                <Heading as={"h1"} size={"4xl"} textAlign={"center"} mb={8} mt={50}>
                    Create New Product
                </Heading>
                <Box w={"lg"} bg={useColorModeValue("white", "gray.800")}
                    p={6} rounded={"lg"} shadow={"md"}
                >
                    <VStack spacing={4}>
                        <Input
                            placeholder='Product Name'
                            name='name'
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <Input
                            placeholder='Price'
                            name='price'
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                        <Input 
                            placeholder='Image URL'
                            name='image'
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        />



                    </VStack>

                </Box>


                <Box w={"sm"} bg={useColorModeValue("white", "gray.600")} >
                    <VStack spacing={5}>
                        <Button  w='lg' onClick={handleAddProduct}>
                            Add Product
                        </Button>
                    </VStack>
                </Box>

            </VStack>

        </Container>
    )
}

export default CreatePage