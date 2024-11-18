import { Box , Heading, HStack, IconButton, Image,Text ,  VStack, Input, useDisclosure, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import {  useColorModeValue } from './ui/color-mode'
    import { LuPencil, LuTrash } from 'react-icons/lu';
import { useProductStore } from '../store/product';
import { useToast } from '@chakra-ui/toast';
import { Modal , ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/modal'


 export const ProductCard = ({product}) => {
    const bg = useColorModeValue("white" , "gray.700");
    const textColor = useColorModeValue("gray.800" , " gray.200");
    const {deleteProduct , updateProduct} = useProductStore();
    const toast = useToast();

    const [updatedProduct, setUpdatedProduct] = useState(product);

    const { open, onOpen, onClose } = useDisclosure();

    
    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProduct(pid);
        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true
            })
        }else{
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true
            })
        }
    }

    const  handleUpdateProduct = async (pid, updatedProduct) => {
           const {success,message} =  await updateProduct(pid, updatedProduct);
            onClose();
            if(!success){
                toast({
                    title: "Error",
                    description: message,
                    status: "error",
                    isClosable: true
                })
            }else{
                toast({
                    title: "Success",
                    description: "Product updated successfully!",
                    status: "success",
                    isClosable: true
                })
            }
    }
  

  return (
    <Box
    shadow={'lg'}
    rounded={'lg'}
    overflow={'hidden'}
    transition='all 0.3s'
    _hover={{transform: "translateY(-5px)",shadow: "xl"}}
    bg={bg}
    >
        <Image src={product.image} alt={product.name} h={"200px"} w='full' objectFit={'cover'}/>
        <Box p={4}>
            <Heading as='h3' size={"md"} mb={2}>
                {product.name}
            </Heading>
            <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
                ${product.price}
            </Text>
            <HStack >
                <IconButton onClick={onOpen} ><LuPencil /> </IconButton>

                <IconButton onClick={() => handleDeleteProduct(product._id)}> <LuTrash color='red'/> </IconButton>

            </HStack>

        </Box>



        <Modal isOpen={open} onClose={onClose}  >
        <ModalOverlay />
        <ModalContent        
           w={"500px"} h={"300px"}bg={useColorModeValue("#F5F6F7", "#2D3748")}  sx={{               // Using sx prop
            borderRadius: '1rem'}}    
          p={10} rounded={"lg"} shadow={"md"} mt={"350px"} left={"700px"}
      >

          <ModalHeader mb={"17px"}>Update Product</ModalHeader>
          <ModalCloseButton  
       position="absolute"
       right="8px"  // Adjust this value
       top="8px"    // Adjust this value
   
        />
          <ModalBody>
            <VStack gap={4}>
                <Input
                placeholder='Product Name'
                name='name'
                value={updatedProduct.name}
                onChange={ (e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value})}
                />
                <Input
                placeholder='Price'
                name='price'
                type='number'
                value={updatedProduct.price}
                onChange={ (e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value})}
                />
                <Input
                placeholder='Image URL'
                name='image'
                value={updatedProduct.image}
                onChange={ (e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value})}
                />
                
            </VStack>
          </ModalBody>
          <ModalFooter gap={"7px"} mt={"24px"} alignContent={"center"}  >
            <Button onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                Update
            </Button>
            <Button onClick={onClose}>
                Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Box>
         
    
  )
};


