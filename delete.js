const url = 'http://120.77.45.84:8001/srm/srList/delete.html';
var request = require('request');
var cookie = request.cookie('JSESSIONID=A57277D5ABE34A73A600310F876D871F')
var j = request.jar();

j.setCookie(cookie, 'http://120.77.45.84:8001');

async function del(patientSn) {
    const form = {patientSns: `${patientSn};0`, count: '1'};
    return new Promise((resolve, reject) => {
        request.post({
            url,
            jar: j,
            form,
        }, (err, res, body) => {
            if (!body || err) {
                reject(0);
            }

            const str = body.toString();
            console.log(str);
            reject(1);
        })
    })
}

async function main() {
    try {
        let res = await del('8080');
        console.log(res);
    }catch (e) {
        console.log(e)
    }

}

main();