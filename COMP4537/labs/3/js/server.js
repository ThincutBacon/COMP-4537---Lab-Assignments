class Server {
    constructor() {
        this.http = require('http');
        this.url = require('url'); 

        this.STRINGS = require("../lang/messages/en/user.js").STRINGS;

        this.Utils = require("./modules/utils.js").Utils;

        this.init();
    }

    init () {
        this.http.createServer((req, res) => {
            let queries = this.url.parse(req.url, true)

            const name = queries.query["name"]
            const cust_message = this.getCustomMessage(name);
            res.writeHead(200, {
                "content-type": "text/html"
            });
            res.write(cust_message);
            res.end();
        }).listen(5000)

        console.log("listening...")
    }

    getCustomMessage (name) {
        const full_message = `${this.STRINGS.MESSAGE} ${new this.Utils().getDate()}.`;
        const placeholder = this.STRINGS.MESSAGE_NAME_PLACEHOLDER;

        const custom_message = full_message.replace(placeholder, name);

        const styled_message = `<span style="color:blue">${custom_message}</span>`
        
        return styled_message;
    }

}

new Server()