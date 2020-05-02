import React, { Component } from "react";
import AlertDataService from "../../services/AlertDataService";
import { toast } from "react-toastify";
import "../table/AlertTable.css";
import store from 'store';
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

class AlertTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts: [],
      count: 0,
    };
    this.refreshAlerts = this.refreshAlerts.bind(this);
    this.deleteAlertClicked = this.deleteAlertClicked.bind(this);
    
  }

  componentDidMount() {
    this.refreshAlerts();
    this.interval = setInterval(this.refreshAlerts, 2000);
  }

  refreshAlerts() {
    AlertDataService.retrieveAllAlerts().then((response) => {
      //console.log(response);
      this.setState({ alerts: response.data });
    });
    var obj = this.state.alerts[this.state.alerts.length - 1];
    if (this.state.alerts.length > 0) {
      //console.log(obj.id);
      // detect new requests
      if (this.state.count < obj.id && this.state.count != 0) {
        for (var i = this.state.count + 1; i <= obj.id; i++) {
          toast.error("New alert " + `${i}` + " @ " + `${obj.createdAt}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      }
      this.setState({ count: obj.id });
    }
  }

  deleteAlertClicked(id) {
    //alert("delete"+id);
    AlertDataService.deleteAlert(id).then((response) => {
      toast.success("🗑️ Deleted alert " + `${id}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      //this.setState({ message: `Delete of alert ${id} Successful` })
      this.refreshAlerts();
    });
  }

  handleLogout(){
    store.remove('loggedIn');
    history.push("/");
    window.location.reload(false);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <div class="container"  style={{ marginTop: "20px" }}>
          <div class="row">
            <div class="col-sm">
              <h4>All Alerts</h4>
            </div>
            <div class="col-sm"></div>
            <div class="col-sm">
              <button className="btn btn-warning float-right" onClick={() => this.handleLogout()}>Logout</button>
            </div>
          </div>
        </div>

        <div className="container" style={{ marginTop: "20px" }}>
          <table className="table" >
            <thead>
              <tr>
                <th style={{ backgroundColor: "#092445", color: "#ffffff" }}>
                  ID
                </th>
                <th style={{ backgroundColor: "#092445", color: "#ffffff" }}>
                  Description
                </th>
                <th style={{ backgroundColor: "#092445", color: "#ffffff" }}>
                  Timestamp
                </th>
                <th
                  style={{ backgroundColor: "#092445", color: "#ffffff" }}
                ></th>
              </tr>
            </thead>
            <tbody>
              {this.state.alerts.map((alert) => (
                <tr key={alert.id}>
                  <td>{alert.id}</td>
                  <td>{alert.desc}</td>
                  <td>{alert.createdAt}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteAlertClicked(alert.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AlertTable;
