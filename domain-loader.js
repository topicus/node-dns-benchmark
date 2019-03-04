const fs = require("fs");
const readline = require("readline")

const lineReader = readline.createInterface({
    input: require('fs').createReadStream('domains.txt')
});

module.exports.getDomains = function getDomains(quantity){
    let counter = 0;
    const domains = [];
    return new Promise( (resolve, reject) => {
        lineReader.on('line', function (line) {
            const domain = line.split(",")[1].replace(/['"]+/g, '');
            domains.push(domain);
            counter++;
            if(quantity === counter)  {
                domains.shift()
                resolve(domains);
                lineReader.removeAllListeners();
                return;
            }
                
        });
        
    });    
};