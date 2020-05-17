import React, { Component } from "react";
import TopBar from "../topbar/topbar";
import AlertTable from "../table/AlertTable";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import store from 'store';

class HomePage extends Component {

    componentDidMount() {
        if(!(store.get("loggedIn")===true)){
            this.props.history.push("/");
        }
        document.body.style.backgroundImage = "none";
        // alert(document.body.style.backgroundImage);
    }

  render() {
    return (
      <div>
        <TopBar />
        <AlertTable />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

export default HomePage;
