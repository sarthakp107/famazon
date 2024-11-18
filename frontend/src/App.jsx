import { Box  } from "@chakra-ui/react"
import { useColorModeValue } from "./components/ui/color-mode";
import { Route, Routes } from "react-router-dom"
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Footer  from "./components/Footer";


function App() {
  return (
    <Box minH= {"100vh"}  bg={useColorModeValue("gray.100" , "gray.900")}>
    <NavBar />
    <Routes>
      <Route path = "/" element = {<HomePage />} />
      <Route path = "/create" element = {<CreatePage />} />
    </Routes>
    {/* <Footer /> */}
    </Box>
  )
}

export default App;
