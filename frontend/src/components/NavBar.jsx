import { Button, Container, Flex, HStack , Text } from "@chakra-ui/react"
import { LuPlusSquare } from "react-icons/lu"
import { Link } from "react-router-dom"
import { useColorMode , useColorModeValue } from "./ui/color-mode"
import {IoMoon} from "react-icons/io5";
import {LuSun} from "react-icons/lu";
import { useProductStore } from "../store/product";


const NavBar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    

  return (
    <Container maxW={"1500px"} px={4}>
        <Flex h= {12} alignItems={"center"} justifyContent={"space-between"} flexDir={{base: "column", sm: "row"}}>
        <Text
     
					fontSize={{ base: "20px", sm: "20px" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
          fontFamily={"'HK Grotesk', sans-serif"}
          _hover={{
            color: useColorModeValue("gray.600", "gray.300"),
   transition: "color 0.2s ease"

          }}
					
				>
					<Link to={"/"} >Famazon </Link>
				</Text>
                <HStack spacing={2} alignItems={"center"}>
                <Link to= {"/create"}>
                <Button>
                    <LuPlusSquare></LuPlusSquare>
                </Button>
                </Link>
                <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}

                </Button>

                </HStack>
            
        </Flex>
    </Container> //centers 
  )
}

export default NavBar