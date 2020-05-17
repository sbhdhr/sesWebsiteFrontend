import React, { Component } from "react";
import AlertDataService from "../../services/AlertDataService";
import { toast } from "react-toastify";
import "./AlertTable.css";
import store from "store";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

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
    AlertDataService.getMaxIncId().then((response) => {
      console.log(response.data);
      this.setState({ count: response.data });
    });
    this.refreshAlerts();
    this.interval = setInterval(this.refreshAlerts, 2000);
  }

  refreshAlerts() {
    AlertDataService.retrieveAllAlerts().then((response) => {
      //console.log(response);
      this.setState({ alerts: response.data });
    });

    if (this.state.alerts.length > 0) {
      var obj = this.state.alerts[this.state.alerts.length - 1];

      console.log(obj.id);
      // detect new requests
      if (this.state.count < obj.id) {
        for (var i = 0; i < this.state.alerts.length; i++) {
          if (this.state.alerts[i].id > this.state.count) {
            toast.error(
              "New alert " +
                `${this.state.alerts[i].id}` +
                " @ " +
                `${this.state.alerts[i].createdAt}`,
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              }
            );
          }
        }
        this.setState({ count: obj.id });
      }
    }
  }

  deleteAlertClicked(id) {
    //alert("delete"+id);
    AlertDataService.deleteAlert(id).then((response) => {
      const msg = `🗑️ Deleted alert `;
      toast.success( msg+ `${id}`, {
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

  handleLogout() {
    store.remove("loggedIn");
    history.push("/");
    window.location.reload(false);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <div class="container top-panel">
          <div class="row">
            <div class="col-sm">
              <h4 >All Alerts</h4>
            </div>
            <div class="col-sm"></div>
            <div class="col-sm">
              <button
                className="btn btn-warning float-right"
                onClick={() => this.handleLogout()}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>
                  ID
                </th>
                <th>
                  Description
                </th>
                <th>
                  Timestamp
                </th>
                <th></th>
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
