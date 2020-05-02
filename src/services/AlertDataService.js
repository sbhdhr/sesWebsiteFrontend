import axios from 'axios'

const API_URL = 'https://ses-project-bitsme.herokuapp.com/api'
const ALERT_API_URL = `${API_URL}/alert`

class AlertDataService {

    retrieveAllAlerts() {
        return axios.get(`${ALERT_API_URL}/all`);
    }

    deleteAlert(id) {
        //console.log(`${ALERT_API_URL}/${id}`);
        var a = axios.delete(`${ALERT_API_URL}/${id}`);
        console.log(a);
        return a;
    }
}

export default new AlertDataService()
