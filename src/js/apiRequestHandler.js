export class APIRequestHandler {
    static sendJSONRequest(requestURI, callback, postData = null, returnObject = null) {
        var req = APIRequestHandler.makeRequest();
        var cb = function () {
            // Only process finished requests
            if (req.readyState == 4) {
                if (req.status == "200") {
                    if (returnObject) {
                        callback(returnObject);
                    }
                    else {
                        var dataJSON = JSON.parse(req.responseText);
                        callback(dataJSON);
                    }
                }
                else {
                    console.log("Error processing request response. Host: " + requestURI + ".");
                }
            }
        };
        APIRequestHandler.triggerRequest(req, requestURI, cb, postData);
    }

    static makeRequest() {
        return new XMLHttpRequest();
    }

    static triggerRequest(req, requestURI, cb, postData) {
        req.overrideMimeType("application/json");
        req.open('GET', requestURI, true);
        req.onreadystatechange = cb;
        req.send(postData);
    }
};