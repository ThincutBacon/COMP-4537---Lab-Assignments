class Server {
    constructor(port) {
        this.PORT = port;
        this.BASE_PATH = "/COMP4537/labs/3/";

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


            switch (pathname) {
                case `${this.BASE_PATH}getDate/`: {
                    const name = queries["name"];
                    const cust_message = this.getCustomMessage(name);
                    res.writeHead(200, {
                        "content-type": "text/html"
                    });
                    res.write(cust_message);   
                    res.end();
                }
                break;

                case `${this.BASE_PATH}writeFile/`: {
                    const text = queries["text"];
                    console.log(text);

                    this.fs.appendFile("../text/file.txt", `${text}\n`, (err) => {
                        if (err) {
                            res.writeHead(500, {
                                "content-type": "text/plain"
                            });  
                            res.end(`Failed to write to file: ${filename}`);
                            return;
                        }
                        res.writeHead(200, {
                            "content-type": "text/plain"
                        });  
                        res.end(`Successfully Appended: ${text}`);
                    });
                                 
                }
                break;

                case `${this.BASE_PATH}readFile/`: {
                    const filename = queries["filename"];
                    
                    this.fs.readFile(`../text/${filename}`, "utf8", (err, data) => {
                        if (err) {
                            res.writeHead(404, {
                                "content-type": "text/plain"
                            });  
                            res.end(`File not found: ${filename}`);
                            return;
                        }
                        res.writeHead(200, {
                            "content-type": "text/plain"
                        });
                        res.end(data);
                    })
                }
                break;
            
                default: {
                    console.log("Hello");
                    res.writeHead(200, {
                        "content-type": "text/plain"
                    }); 
                    res.end('Hello, world!');
                }
            }

        }).listen(this.PORT, '0.0.0.0', () => console.log(`Server is listening on port ${this.PORT}`));
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