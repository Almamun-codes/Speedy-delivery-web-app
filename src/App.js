import { NotFound } from "http-errors";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
// import About from "./Components/About/About";
import AddService from "./Components/AddService/AddService";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Services from "./Components/Services/Services";
import MyOrders from "./Components/MyOrders/MyOrders";
import ManageAll from "./Components/ManageAll/ManageAll";
import LogIn from "./Components/UserLogin/LogIn";
import Register from "./Components/UserLogin/Register";
import AuthProvider from "./Context/AuthProvider";
import PlaceOrder from "./Components/PlaceOrder/PlaceOrder";

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>

            <Route path="/home">
              <Home></Home>
            </Route>

            <PrivateRoute path="/service">
              <Services></Services>
            </PrivateRoute>

            <PrivateRoute path="/place-order/:id">
              <PlaceOrder></PlaceOrder>
            </PrivateRoute>

            {/* <Route path="/about">
              <About></About>
            </Route> */}

            <PrivateRoute path="/my-orders">
              <MyOrders></MyOrders>
            </PrivateRoute>

            <PrivateRoute path="/manage-all-orders">
              <ManageAll></ManageAll>
            </PrivateRoute>

            <PrivateRoute path="/add-a-service">
              <AddService></AddService>
            </PrivateRoute>

            <Route path="/login">
              <LogIn></LogIn>
            </Route>

            <Route path="/register">
              <Register></Register>
            </Route>

            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
          <Footer></Footer>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
