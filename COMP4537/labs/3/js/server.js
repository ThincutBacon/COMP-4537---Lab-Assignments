class Server {
    constructor(port) {
        this.PORT = port;

        this.http = require('http');
        this.url = require('url'); 
        this.fs = require('fs');

        this.STRINGS = require("../lang/messages/en/user.js").STRINGS;

        this.Utils = require("./modules/utils.js").Utils;

        this.init();
    }

    init () {
        this.http.createServer((req, res) => {
            const parsed_url = this.url.parse(req.url, true);
            
            const pathname = parsed_url.pathname;
            const queries = parsed_url.query;

            if (pathname ==  "/COMP4537/labs/3/getDate/") {
                const name = queries["name"]
                const cust_message = this.getCustomMessage(name);
                res.writeHead(200, {
                    "content-type": "text/html"
                });
                res.write(cust_message);   
                res.end();
            }

            
        }).listen(this.PORT, () => console.log(`Server is listesning on port ${this.PORT}`));
    }

    getCustomMessage (name) {
        const full_message = `${this.STRINGS.MESSAGE} ${new this.Utils().getDate()}.`;
        const placeholder = this.STRINGS.MESSAGE_NAME_PLACEHOLDER;

        const custom_message = full_message.replace(placeholder, name);

        const styled_message = `<span style="color:blue">${custom_message}</span>`
        
        return styled_message;
    }

}

new Server(5000);