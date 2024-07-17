import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Welcome from "./components/GuestComponents/Welcome";
import Signup from "./components/Authcomponent/signup";
import Login from "./components/Authcomponent/login";
import Home from "./components/Homecomponent/home";
function App() {
  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/smartexpensetracker/home" element={<Home />}></Route>
            <Route path="/smartexpensetracker/welcome" element={<Welcome />} />
            <Route path="/smartexpensetracker/signup" element={<Signup />} />
            <Route path="/smartexpensetracker/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
