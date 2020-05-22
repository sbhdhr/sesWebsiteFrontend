import axios from 'axios'

const API_URL = 'https://bits-me-ses-backend.herokuapp.com/api'
//const API_URL = 'http://localhost:8080/api'
const ALERT_API_URL = `${API_URL}/alert`

class AlertDataService {

    retrieveAllAlerts() {
        return axios.get(`${ALERT_API_URL}/all`);
    }

    getMaxIncId(){
        return axios.get(`${ALERT_API_URL}/max`);
    }

    deleteAlert(id) {
        //console.log(`${ALERT_API_URL}/${id}`);
        var a = axios.delete(`${ALERT_API_URL}/${id}`);
        console.log(a);
        return a;
    }
}

export default new AlertDataService()
