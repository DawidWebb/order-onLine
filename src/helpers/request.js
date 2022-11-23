import axios from "axios";

const request = axios.create({
	baseURL: "https://ordersback.b4a.app",
	// baseURL: "http://localhost:9000",

	validateStatus: false,
});

export default request;
