let APIURL = "";

switch (window.location.hostname) {
  case "localhost":
  case "127.0.0.1":
    APIURL = "http://localhost:5000";
    break;
case "loyoulty.herokuapp.com": 
APIURL = "https://loyoulty-api.herokuapp.com"

}

export default APIURL;
