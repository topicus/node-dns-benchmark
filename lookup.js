const {getDomains} = require("./domain-loader");
const dns = require("dns")
console.log(process.env.DEBUG);
let hstart;
getDomains(1).then( domains => {
    hstart = process.hrtime();
    return resolve(domains);

}).then( count => {
    const hrend = process.hrtime(hstart);
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
    console.log(`Count: ${count}`);
})

function resolve(domains) {
    const options = {
        family: 4
    };
    return new Promise((resolve, reject)=> {
        let count = 0
        domains.forEach(domain => {
            dns.lookup(domain, {}, (err, address, family) => {
                count++
                if(count === domains.length -1) {
                    return resolve(count);
                } 
            })
        });
    })
}