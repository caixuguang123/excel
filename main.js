var XLSX = require('xlsx');
var request = require('request');
const random = require('random')


var cookie = request.cookie('JSESSIONID=2EFA6E11AC94EE80DB583F610AC30519')

var url = 'http://120.77.45.84:8001/srm/srList/savePatient.html';

var j = request.jar();

j.setCookie(cookie, url);

var wb = XLSX.readFile("02.xls");

const worksheet = wb.Sheets[wb.SheetNames[0]];

const arr = XLSX.utils.sheet_to_json(worksheet);

let errs = [];
let tasks = [];
for (let i = 0; i < arr.length; i++) {
    var i01 = random.int(0, 9);
    var i02 = random.int(10, 29);

    const obj = arr[i] || {};
    const inpatientNo = obj['慢病号'];
    const outpatientNo = inpatientNo;
    const patientName = obj['姓名'];
    const IDCard = obj['身份证号码'] || '';
    const birthDate = `${IDCard.substring(6, 10)}-${IDCard.substring(10, 12)}-${IDCard.substring(12, 14)}`;
    const gender = obj['性别'];
    const patientGender = gender === '男' ? 1 : 2;
    const participateDate = `2016-0${i01}-${i02}`;
    const orgCode = 'Y0038';
    const studySn = 2;
    const telephone = obj['电话'];

    const form = {
        inpatientNo,
        outpatientNo,
        patientName,
        birthDate,
        patientGender,
        participateDate,
        orgCode,
        studySn,
        IDCard,
        telephone
    };


    setTask(form);
}

function setTask(form) {
    tasks.push(new Promise((resolve, reject) => {
        request.post({url, jar: j, form}, (err, res, body) => {
            console.log(`post:${form.patientName}`)
            if (!body|| err) {
                errs.push(`failed: ${form.patientName}, err:${err}`)
            }
            resolve();
        })
    }))
}

async function a() {
    let res = await Promise.all(tasks);
    console.log(errs);
}

a();

