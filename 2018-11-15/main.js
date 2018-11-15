var XLSX = require('xlsx');
var request = require('request');
const random = require('random');
var sleep = require('await-sleep');

// var r = request.defaults({'proxy': 'http://10.86.34.219:8080'});

// var cookie = request.cookie('JSESSIONID=8C011887DCC6CE4D54B15CB31064D00B')
var cookie = request.cookie('JSESSIONID=node01cg9j707c2hqyra70jg3dxe6l43.node0;Path=/');


var url = 'http://120.77.45.84:8001/srm/srList/savePatient.html';

var j = request.jar();

j.setCookie(cookie, 'http://www.systemcdm.com');
// j.setHeader('token', 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJub2RlMDFjZzlqNzA3YzJocXlyYTcwamczZHhlNmw0MyJ9.wp3FTJn-Wsy6iIj4Kgz7wXLZn2a8kogda_m8iDrWl6k');

var wb = XLSX.readFile("2018new.xls");

const worksheet = wb.Sheets[wb.SheetNames[0]];

const arr = XLSX.utils.sheet_to_json(worksheet);
let errs = [];
let tasks = [];

//

function dateExtract(date) {
    const firstIdx = date.indexOf('//');
    const lastIdx = date.lastIndexOf('//');
    const y = date.substring(0, firstIdx);
    let m = date.substring(firstIdx + 2, lastIdx);
    const space = date.indexOf(' ');
    let d = date.substring(lastIdx + 2);
    if (space > 0) {
        d = date.substring(lastIdx + 2, space);
    }
    if (m.length === 1) {
        m = '0' + m;
    }
    if (d.length === 1) {
        d = '0' + d;
    }
    return `${y}-${m}-${d}T16:00:00.000Z`
}

async function Basic(user) {
    const name = user['姓名'];
    const contract = user['合同编号'];
    const gender = user['性别'] === '女' ? '2' : '1';
    const birthDay = user['出生日期'];
    const ruxuanriqi = user['入选日期'];
    console.log(name, contract, gender, dateExtract(birthDay), dateExtract(ruxuanriqi));

    const form = {
        orgId: 29,
        customerName: name,
        contractNumber: contract,
        gender,
        birthDate: dateExtract(birthDay),
        beSelectedDate: dateExtract(ruxuanriqi)
    };

    const url = 'http://www.systemcdm.com:9009/customer/saveCustomerInfo';

    return new Promise((resolve, reject) => {
        request.post({
            url,
            jar: j,
            form,
        }, (err, res, body) => {
            body = JSON.parse(body);
            if (!body || err) {
                reject(0);
            }

            if (body['isSuccess']) {
                console.log('saveBasic', 'succeed');
                resolve(body['model']);
            }
            reject(1);
        })
    })
}

function retractAddress(addr) {
    const idx = addr.lastIndexOf('^');
    return addr.substring(idx + 1);
}

async function yibanqingkuang(user, id) {
    const address = retractAddress(user['详细通讯住址']);
    const basicForm = await getBasic(id);
    let form = {
        ...basicForm['customerBaseInfoVO'],
        ...basicForm['customerSensitiveInfoVO'],
        nextVisitDate: basicForm['nextVisitDate'],
    };
    form['provinceId'] = 440000;
        form['cityId'] = 441900;
        form['countyId'] = 441900111;
        form['townId'] = 914329655000;
        form['address'] = address;
        form['postalcode'] = 523400;

    const url = 'http://www.systemcdm.com:9009/customer/saveCustomerInfo';

    return new Promise((resolve, reject) => {
        request.post({
            url,
            jar: j,
            form,
        }, (err, res, body) => {
            body = JSON.parse(body);
            if (!body || err) {
                reject(0);
            }

            if (body['isSuccess']) {
                console.log('saveYiBan: ', 'succeed');
                resolve(body['model']);
            }
            reject(1);
        })
    })

}

async function getBasic(id) {
    const url = `http://www.systemcdm.com:9009/customer/findCustomerDetailVO?id=${id}`;
    return new Promise((resolve, reject) => {
        request.get({
            url,
            jar: j,
        }, (err, res, body) => {
            body = JSON.parse(body);
            if (!body || err) {
                reject(0);
            }
            if (body['isSuccess']) {
                console.log('getBasic: ', 'succeed');
                resolve(body['model']);
            }
            reject(1);
        })
    })
}

async function searchInvestigation(userId, type){
    const url =`http://www.systemcdm.com:9009/investigationList/findInvestigationList?customerId=${userId}&investigationType=${type}&pagination=0&pageSize=1`
    return new Promise((resolve, reject) => {
        request.get({
            url,
            jar: j,
        }, (err, res, body) => {
            body = JSON.parse(body);
            if (!body || err) {
                reject(0);
            }
            if (body['isSuccess']) {
                console.log('searchInvestigation: ', 'succeed');
                resolve(body['model']['model'][0]['id']);
            }
            reject(1);
        })
    })
}

async function getInvestation(id){

}

async function main() {
    // const id = await Basic(arr[3]);
    // console.log(id);
    // await yibanqingkuang(arr[3],1120);
    const investation = await searchInvestigation(1120,2);
    console.log(investation)
    await sleep(5000);
}

main()