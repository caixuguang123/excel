var XLSX = require('xlsx');
var request = require('request');
const random = require('random');
var sleep = require('await-sleep');

// var r = request.defaults({'proxy': 'http://10.86.34.219:8080'});

// var cookie = request.cookie('JSESSIONID=8C011887DCC6CE4D54B15CB31064D00B')
var cookie = request.cookie('JSESSIONID=node014624z5pl23qxx2r4des820lw108.node0; orgType=3');


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
    return `${y}-${m}-${d}T00:00:00.000Z`
}

async function Basic(user) {
    const name = user['姓名'];
    const contract = user['合同编号'];
    const gender = user['性别'] === '女' ? '2' : '1';
    const birthDay = user['出生日期'];
    const ruxuanriqi = user['入选日期'];

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
                resolve(body['model']);
            }
            reject(1);
        })
    })
}

async function searchInvestigation(userId, type) {
    const url = `http://www.systemcdm.com:9009/investigationList/findInvestigationList?customerId=${userId}&investigationType=${type}&pagination=0&pageSize=1`
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
                resolve(body['model']['model'][0]['id']);
            }
            reject(1);
        })
    })
}

async function getInvestigationGeneral(id) {
    const url = `http://www.systemcdm.com:9009/investigation/findInvestigationGeneralById?id=${id}`;

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
                resolve(body['model']);
            }
            reject(1);
        })
    })

}

async function saveInvestigation(user, id) {
    const url = 'http://www.systemcdm.com:9009/investigation/saveInvestigationGeneralInfoByInvestigationId';

    let medicalSecurityTypeSet = [];
    let medical = user['医疗保障状况'];
    if (medical.indexOf('基本医疗') >= 0) {
        medicalSecurityTypeSet.push(1);
    }
    if (medical.indexOf('新农村') >= 0) {
        medicalSecurityTypeSet.push(2);
    }
    if (medical.indexOf('商业医疗') >= 0) {
        medicalSecurityTypeSet.push(5);
    }
    if (medical.indexOf('公费') >= 0) {
        medicalSecurityTypeSet.push(3);
    }
    if (medical.indexOf('大病') >= 0) {
        medicalSecurityTypeSet.push(4);
    }
    if (medicalSecurityTypeSet.length === 0) {
        medicalSecurityTypeSet.push(6)
    }

    let averageAnnualIncomeAtFamilyLastYear = 1;
    let lastYM = user['去年家庭年收入'];
    if (lastYM.indexOf('50,001') === 0) {
        averageAnnualIncomeAtFamilyLastYear = 2;
    }
    if (lastYM.indexOf('25,001') === 0) {
        averageAnnualIncomeAtFamilyLastYear = 1;
    }
    if (lastYM.indexOf('100,001') === 0) {
        averageAnnualIncomeAtFamilyLastYear = 3;
    }
    if (lastYM.indexOf('200,001') === 0) {
        averageAnnualIncomeAtFamilyLastYear = 5;
    }

    const degree = user['文化程度'];
    let degreeOfEducation = 1;
    if (degree.indexOf('初中') >= 0) {
        degreeOfEducation = 2;
    }
    if (degree.indexOf('高中') >= 0) {
        degreeOfEducation = 3;
    }
    if (degree.indexOf('大专') >= 0) {
        degreeOfEducation = 3;
    }
    if (degree.indexOf('本科') >= 0) {
        degreeOfEducation = 4;
    }
    if (degree.indexOf('研究生') >= 0) {
        degreeOfEducation = 5;
    }

    const marriage = user['婚姻状况'];
    let isLiveAlone = 1;
    if (marriage.indexOf('一同居住') >= 0) {
        isLiveAlone = 2;
    }

    let longevousPopulationAtFirstDegreeRelatives = 0;
    const long = user['家庭长寿人群'];
    if (marriage.indexOf('1') >= 0) {
        longevousPopulationAtFirstDegreeRelatives = 1;
    }
    if (marriage.indexOf('2') >= 0) {
        longevousPopulationAtFirstDegreeRelatives = 2;
    }


    let marriageStatus = 0;
    if (marriage.indexOf('一同居住') >= 0) {
        marriageStatus = 2;
    }
    if (marriage.indexOf('未婚') >= 0) {
        marriageStatus = 1;
    }
    if (marriage.indexOf('丧偶') >= 0) {
        marriageStatus = 4;
    }
    if (marriage.indexOf('离异') >= 0) {
        marriageStatus = 3;
    }

    let occupation = 10;
    const carierr = user['职业是'];
    if (carierr.indexOf('工人') >= 0) {
        occupation = 4;
    }
    if (carierr.indexOf('农民') >= 0) {
        occupation = 8;
    }
    if (carierr.indexOf('行政') >= 0) {
        occupation = 1;
    }
    if (carierr.indexOf('管理') >= 0) {
        occupation = 5;
    }
    if (carierr.indexOf('私营') >= 0) {
        occupation = 3;
    }
    if (carierr.indexOf('退休') >= 0) {
        occupation = 9;
    }
    if (carierr.indexOf('技术') >= 0) {
        occupation = 2;
    }
    let form = {
        investigationId: id,
        medicalSecurityTypeSet,


        abortionNum: 0,
        averageAnnualIncomeAtFamilyLastYear,
        averageAnnualIncomeLastYear: 0,
        // createTime: "2018-11-15 23:07:25"
        degreeOfEducation,
        isHaveTakenAcyeterion: 0,
        isLiveAlone,
        longevousPopulationAtFirstDegreeRelatives,
        marriageStatus,
        menopauseAge: 0,
        menopauseStatus: 0,
        occupation,
        otherOccupation: "",
        recordStatus: 3
    };

    return new Promise((resolve, reject) => {
        request.post({
            url,
            jar: j,
            body: form,
            json: true,
            headers: [{'Content-Type': 'application/json;charset=UTF-8',}]
        }, (err, res, body) => {
            if (!body || err) {
                reject(0);
            }
            if (body['isSuccess']) {
                resolve(1);
            }
            reject(1);
        })
    })
}

async function saveLifeStyle(user, id) {
    const day = user['密闭的环境下接触二手烟'];
    const url = 'http://www.systemcdm.com:9009/investigation/saveLifestyleByInvestigationId';

    let hasSecondSmokingDay = 0;
    if (day !== '否') {
        hasSecondSmokingDay = day;
    }
    let form = {
        drinkStatus: 3,
        hasSecondSmokingDay,
        investigationId: id,
        isHasSecondSmoking: hasSecondSmokingDay === 0 ? 2 : 1,
        learnHealthCareKnowledgeChannelSet: [],
        smokeStartTime: "1900-01-01",
        smokeStatus: 3,
        stopSmokeStartTime: "1900-01-01",
    };
    return new Promise((resolve, reject) => {
        request.post({
            url,
            jar: j,
            body: form,
            json: true,
            headers: [{'Content-Type': 'application/json;charset=UTF-8',}]
        }, (err, res, body) => {
            if (!body || err) {
                reject(0);
            }
            if (body['isSuccess']) {
                resolve(1);
            }
            reject(1);
        })
    })
}

async function saveFamilyHistory(user, id) {
    const url = 'http://www.systemcdm.com:9009/investigation/saveFamilyHistoryByInvestigationId';

    let a = user['心梗'];
    let b = user['脑卒中'];

    let form = {
        investigationId: id,
        isPersonInFamilyHasCerebralApoplexy: a === '无' ? 2 : 1,
        isPersonInFamilyHasCoronaryDisease: b === '无' ? 2 : 1,
        isPersonInFamilyHasTumour: 3,
    };
    return new Promise((resolve, reject) => {
        request.post({
            url,
            jar: j,
            body: form,
            json: true,
            headers: [{'Content-Type': 'application/json;charset=UTF-8',}]
        }, (err, res, body) => {
            if (!body || err) {
                reject(0);
            }
            if (body['isSuccess']) {
                resolve(1);
            }
            reject(1);
        })
    })
}

async function savePast(user, id) {
    const url = 'http://www.systemcdm.com:9009/investigation/savePastDiseasesHistoryByInvestigationId';

    let form = {
        atrialFibrillationDiagnosisTime: "1900-01-01",
        cerebralApoplexyDiagnosisTime: "1900-01-01",
        coronaryArteryRevascularizationDiagnosisTime: "1900-01-01",
        coronaryDiseaseDiagnosisTime: "1900-01-01",
        diabetesDiagnosisTime: "1900-01-01",
        gallstoneDiagnosisTime: "1900-01-01",
        haemorrhageOfDigestiveTractDiagnosisTime: "1900-01-01",
        heartFailureDiagnosisTime: "1900-01-01",
        hyperlipidemiaDiagnosisTime: "1900-01-01",
        hypertensionDiagnosisTime: "1900-01-01",
        investigationId: id,
        isHaveAtrialFibrillation: 0,
        isHaveCerebralApoplexy: 0,
        isHaveCoronaryArteryRevascularization: 0,
        isHaveCoronaryDisease: 0,
        isHaveDiabetes: 0,
        isHaveGallstone: 0,
        isHaveHaemorrhageOfDigestiveTract: 0,
        isHaveHeartFailure: 0,
        isHaveHyperlipidemia: 0,
        isHaveHypertension: 0,
        isHaveMiocardialInfarction: 0,
        isHavePeripheralVascularDisease: 0,
        isHaveRenalCalculus: 0,
        isHaveTumour: 0,
        miocardialInfarctionDiagnosisTime: "1900-01-01",
        peripheralVascularDiseaseDiagnosisTime: "1900-01-01",
        renalCalculusDiagnosisTime: "1900-01-01",
        tumourDiagnosisTime: "1900-01-01",
    };
    return new Promise((resolve, reject) => {
        request.post({
            url,
            jar: j,
            body: form,
            json: true,
            headers: [{'Content-Type': 'application/json;charset=UTF-8',}]
        }, (err, res, body) => {
            if (!body || err) {
                reject(0);
            }
            if (body['isSuccess']) {
                resolve(1);
            }
            reject(1);
        })
    })
}

async function bodyCheck(user, id) {
    const url = 'http://www.systemcdm.com:9009/investigation/savePhysiqueByInvestigationId';

    const height = user['身高'];
    const weight = user['体重'];
    const waist = user['腰围'];
    const fstRightHandBloodPressureDenominator = user['右手第y次舒张'];
    const fstRightHandBloodPressureMolecule = user['右手第一次收缩压'];
    const sndRightHandBloodPressureDenominator = user['右手第二次舒张压'];
    const sndRightHandBloodPressureMolecule = user['右手第二次收缩压'];
    const fstRightHandHeartRate = user['右手第一次心率'];
    const sndRightHandHeartRate = user['右手第二次心率'];
    const form = {
        fstRightHandBloodPressureDenominator,
        fstRightHandBloodPressureMolecule,
        fstRightHandHeartRate,
        height,
        investigationId: id,
        sndRightHandBloodPressureDenominator,
        sndRightHandBloodPressureMolecule,
        sndRightHandHeartRate,
        waist,
        weight,
    };
    return new Promise((resolve, reject) => {
        request.post({
            url,
            jar: j,
            body: form,
            json: true,
            headers: [{'Content-Type': 'application/json;charset=UTF-8',}]
        }, (err, res, body) => {
            if (!body || err) {
                reject(0);
            }
            if (body['isSuccess']) {
                resolve(1);
            }
            reject(1);
        })
    })
}

async function saveLab(user, id) {
    const url = 'http://www.systemcdm.com:9009/investigation/saveLaboratoryByInvestigationId';

    const fastingPlasmaGlucose = user['空腹血糖'];
    const totalCholesterol = user['总胆固醇'];
    const triglyceride = user['甘油三酯'];
    const hdlCholesterol = user['高密度脂蛋白胆固醇.'];
    const ldlCholesterol = user['低密度脂蛋白胆固醇'];

    const form = {
        albuminUnit: 0,
        apoaUnit: 1,
        apobUnit: 1,
        bloodUreaNitrogenUnit: 0,
        dimerDUnit: 0,
        directBilirubinUnit: 0,
        fastingPlasmaGlucose,
        fastingPlasmaGlucoseUnit: 1,
        globulinUnit: 0,
        hdlCholesterol,
        hdlCholesterolUnit: 1,
        highSensitivityCardiacTroponinIUnit: 0,
        highSensitivityTroponinUnit: 0,
        indirectBilirubinUnit: 0,
        investigationId: id,
        ldlCholesterol,
        ldlCholesterolUnit: 1,
        microalbuminuriaNegativeOption: 0,
        ntProBnpUnit: 0,
        recordStatus: 3,
        serumCreatinineUnit: 0,
        totalBileAcidUnit: 0,
        totalBilirubinUnit: 0,
        totalCholesterol,
        totalCholesterolUnit: 1,
        totalProteinUnit: 0,
        triglyceride,
        triglycerideUnit: 1,
        uricAcidUnit: 0,
        urineAlbuminCreatinineRatioUnit: 0,
        urineGlucoseUnit: 0,
        urineMicroalbuminUnit: 1,
        varBnpUnit: 0,
        varLPPAUnit: 1,
    };

    return new Promise((resolve, reject) => {
        request.post({
            url,
            jar: j,
            body: form,
            json: true,
            headers: [{'Content-Type': 'application/json;charset=UTF-8',}]
        }, (err, res, body) => {
            if (!body || err) {
                reject(0);
            }
            if (body['isSuccess']) {
                resolve(1);
            }
            reject(1);
        })
    })
}

async function main() {

    for (let i = 7; i < 49; i++) {
        try {
            const user = arr[i];
            if (!user['姓名']) {
                continue
            }
            console.log(user['姓名']);
            const id = await Basic(user);
            await sleep(3000);
            await yibanqingkuang(user, id);
            await sleep(3000);
            const investigationId = await searchInvestigation(id, 2);
            await sleep(3000);
            await saveInvestigation(user, investigationId);
            await sleep(3000);
            await saveLifeStyle(user, investigationId);
            await sleep(3000);
            await saveFamilyHistory(user, investigationId);
            await sleep(3000);
            await savePast(user, investigationId);
            await sleep(3000);
            await bodyCheck(user, investigationId);
            await sleep(3000);
            await saveLab(user, investigationId);
            await sleep(3000);
        } catch (e) {
            console.log('err', e)
        }
    }
}

main();