var XLSX = require('xlsx');
var request = require('request');
const random = require('random')
var sleep = require('sleep');

// var r = request.defaults({'proxy': 'http://10.86.34.219:8080'});

// var cookie = request.cookie('JSESSIONID=8C011887DCC6CE4D54B15CB31064D00B')
var cookie = request.cookie('JSESSIONID=D9CC8597D263930DB5063F95AA42D743')

var url = 'http://120.77.45.84:8001/srm/srList/savePatient.html';

var j = request.jar();

j.setCookie(cookie, 'http://www.systemcdm.com:8678');

var wb = XLSX.readFile("2018new.xls");

const worksheet = wb.Sheets[wb.SheetNames[0]];

const arr = XLSX.utils.sheet_to_json(worksheet);

let errs = [];
let tasks = [];

async function main() {
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
        // const orgCode = 'Y0038';
        // const orgCode = 'Y0033';
        // const orgCode = 'Y0001';
        const orgCode = 'Y0031';
        const studySn = 2;
        const telephone = obj['电话'];


        const s7g0text2 = obj['身高'];
        const s7g0text29 = obj['体重'];
        const s7g0text28 = obj['腰围'];

        const s7g0text26 = obj['臀围'];
        const s7g0text50 = obj['颈围'];

        //
        const s7g0g57text1 = obj['右手第一次收缩压'];
        const c11 = obj['右手第一次舒张压'];
        const s7g0g57text3 = obj['右手第二次收缩压'];
        const c12 = obj['右手第二次舒张压'];

        const location = obj['地址'];
        const degree = obj['文化程度'];

        const danguchun = obj['总胆固醇'] || '';
        const ganyou = obj['甘油三酯'] || '';
        const kongfuxuetang = obj['空腹血糖'] || '';
        const gaomidu = obj['高密度脂蛋白胆固醇HDLC'] || '';
        const dimidu = obj['低密度脂蛋白胆固醇LDLC'] || '';
        const zhongxing = obj['中性粒细胞数计数'] || '';
        const hongxibao = obj['红细胞'] || '';
        const xuehongdanbai = obj['血红蛋白浓度'] || '';
        const baixibao = obj['白细胞计数'] || '';
        const xuexiaoban = obj['血小板计数'] || '';
        const linbaxibao = obj['淋巴细胞数计数'] || '';
        const gubing = obj['谷丙'] || '';
        const gucao = obj['谷草'] || '';
        const zongdanbai = obj['总蛋白'] || '';
        const baidanbai = obj['白蛋白'] || '';
        const qiudanbai = obj['球蛋白'] || '';
        const zongdanhongsu = obj['总胆红素'] || '';
        const jianjiedanhongsu = obj['间接胆红素'] || '';
        const tongxingbanpangguangsuan = obj['同型半胱氨酸'] || '';
        const xueniaosudan = obj['血尿素氮'] || '';
        const xuejigan = obj['血肌酐'] || '';
        const xuejianongdu = obj['血钾浓度'] || '';
        const xuenanongdu = obj['血钠浓度'] || '';
        const xuegainongdu = obj['血钙浓度'] || '';
        const niaoweiliangbaidanbai = obj['尿微量白蛋白'] || '';

        const pingjunshousuoya = obj['24小时收缩压平均值'] || '';
        const pingjunshuzhangya = obj['24小时舒张压平均值'] || '';
        const baitianshousuo = obj['白天收缩压平均值'] || '';
        const baitianshuzhang = obj['白天舒张压平均值'] || '';
        const yejianshousuo = obj['夜间收缩压平均值'] || '';
        const yejianshuzhang = obj['夜间舒张压平均值'] || '';
        const pingjunmailv = obj['24小时心率平均值'] || '';
        const baitianmailv = obj['白天心率平均值'] || '';
        const yejianmailv = obj['夜间心率平均值'] || '';
        const xinlv = obj['心率'] || '';
        const dianyaRV5 = obj['电压RV5'] || '';
        const dianyaSV1 = obj['电压SV1'] || '';
        const QRS = obj['QRS间期'] || '';
        const PR = obj['P-R时限'] || '';


        const left = obj['左侧'] !== undefined ? obj['左侧'] : '';
        const left2 = obj['左侧2'] !== undefined ? obj['左侧2'] : '';
        const right = obj['右侧'] !== undefined ? obj['右侧'] : '';
        const right2 = obj['右侧2'] !== undefined ? obj['右侧2'] : '';
        const zhudongmai = obj['主动脉'] !== undefined ? obj['主动脉'] : '';
        const zuofang = obj['左房'] !== undefined ? obj['左房'] : '';
        const zuoshishuzhang = obj['左室舒张末径'] !== undefined ? obj['左室舒张末径'] : '';
        const zuoshishousuo = obj['左室收缩末径'] !== undefined ? obj['左室收缩末径'] : '';
        const shijiange = obj['室间隔'] !== undefined ? obj['室间隔'] : '';
        const houbi = obj['后壁'] !== undefined ? obj['后壁'] : '';
        const youshi = obj['右室'] !== undefined ? obj['右室'] : '';
        let zuofangrongji = obj['左房容积'] !== undefined ? obj['左房容积'] : '';
        if (zuofangrongji)
            zuofangrongji = zuofangrongji.toFixed(1);
        let zuoshishuzhangmorongji = obj['左室舒张末容积'] !== undefined ? obj['左室舒张末容积'] : '';
        if (zuoshishuzhangmorongji)
            zuoshishuzhangmorongji = zuoshishuzhangmorongji.toFixed(1)
        let zuoshishousuomorongji = obj['左室收缩末容积'] !== undefined ? obj['左室收缩末容积'] : '';
        if (zuoshishousuomorongji)
            zuoshishousuomorongji = zuoshishousuomorongji.toFixed(1)
        let shexuefenshu = obj['射血分数'] !== undefined ? obj['射血分数'] : '';
        if (shexuefenshu)
            shexuefenshu = shexuefenshu.toFixed(1)
        const zhudongmaibansudu = obj['主动脉瓣速度'] !== undefined ? obj['主动脉瓣速度'] : '';
        const zhudongmaibanfanliu = obj['主动脉瓣返流'] !== undefined ? obj['主动脉瓣返流'] : '';
        const erjianmaibanfanliu = obj['二尖瓣返流'] !== undefined ? obj['二尖瓣返流'] : '';
        const sanjianmaibanfanliu = obj['三尖瓣返流'] !== undefined ? obj['三尖瓣返流'] : '';


        try {
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
            const createRes = await createUser(form);
            console.log(createRes);

            const res = await getPatientId(patientName, inpatientNo);
            console.log(res);

            let basicForm = {params: `{"formdata":{"s1":{"s1g0":{"level":1,"gtype":"group","repeatable":false,"value":{"s1g0text2":{"gtype":"control","ctype":"text","value":"${patientName}"},"c1":{"gtype":"control","ctype":"select","value":"${patientGender}"},"s1g0date4":{"gtype":"control","ctype":"date","value":"${birthDate}"},"s1g0radio35":{"gtype":"control","ctype":"radio","value":""},"s1g0text36":{"gtype":"control","ctype":"text","value":"${IDCard}"},"s1g0text8":{"gtype":"control","ctype":"text","value":"${location}"},"s1g0text37":{"gtype":"control","ctype":"text","value":""},"s1g0g10":{"level":2,"gtype":"group","repeatable":true,"value":[{"s1g0g10text2":{"gtype":"control","ctype":"text","value":"${patientName}"},"s1g0g10text1":{"gtype":"control","ctype":"text","value":"${telephone}"},"s1g0g10text3":{"gtype":"control","ctype":"text","value":""}}]},"s1g0text12":{"gtype":"control","ctype":"text","value":""},"s1g0select13":{"gtype":"control","ctype":"select","value":"00${degree}"},"s1g0select16":{"gtype":"control","ctype":"select","value":""},"s1g0g11":{"level":2,"gtype":"group","repeatable":false,"value":{"s1g0g11radio22":{"gtype":"control","ctype":"radio","value":""},"s1g0g11text20":{"gtype":"control","ctype":"text","value":""},"s1g0g11text21":{"gtype":"control","ctype":"text","value":""},"s1g0g11text10":{"gtype":"control","ctype":"text","value":""},"s1g0g11text11":{"gtype":"control","ctype":"text","value":""}}},"s1g0text18":{"gtype":"control","ctype":"text","value":""},"s1g0select19":{"gtype":"control","ctype":"select","value":""},"s1g0text20":{"gtype":"control","ctype":"text","value":""},"s1g0select21":{"gtype":"control","ctype":"select","value":""},"s1g0select22":{"gtype":"control","ctype":"select","value":""},"s1g0select23":{"gtype":"control","ctype":"select","value":""},"s1g0select24":{"gtype":"control","ctype":"select","value":""},"s1g0select25":{"gtype":"control","ctype":"select","value":""},"s1g0text26":{"gtype":"control","ctype":"text","value":""},"s1g0g12":{"level":2,"gtype":"group","repeatable":false,"value":{"s1g0g12select1":{"gtype":"control","ctype":"select","value":"1"},"s1g0g12text2":{"gtype":"control","ctype":"text","value":"1"}}},"s1g0radio30":{"gtype":"control","ctype":"radio","value":"002"},"s1g0radio31":{"gtype":"control","ctype":"radio","value":"002"}}}},"s2":{"s2g0":{"level":1,"gtype":"group","repeatable":false,"value":{"s2g0radio138":{"gtype":"control","ctype":"radio","value":""},"s2g0radio20":{"gtype":"control","ctype":"radio","value":""},"s2g0radio26":{"gtype":"control","ctype":"radio","value":""},"s2g0radio29":{"gtype":"control","ctype":"radio","value":""},"s2g0radio32":{"gtype":"control","ctype":"radio","value":""},"s2g0radio35":{"gtype":"control","ctype":"radio","value":""},"s2g0radio38":{"gtype":"control","ctype":"radio","value":""},"s2g0radio39":{"gtype":"control","ctype":"radio","value":""},"s2g0text55":{"gtype":"control","ctype":"text","value":""},"s2g0text56":{"gtype":"control","ctype":"text","value":""},"s2g0text57":{"gtype":"control","ctype":"text","value":""},"s2g0radio60":{"gtype":"control","ctype":"radio","value":""},"s2g0radio62":{"gtype":"control","ctype":"radio","value":""},"s2g0text63":{"gtype":"control","ctype":"text","value":""},"s2g0text64":{"gtype":"control","ctype":"text","value":""},"s2g0text65":{"gtype":"control","ctype":"text","value":""},"s2g0g143":{"level":2,"gtype":"group","repeatable":false,"value":{"s2g0g143radio4":{"gtype":"control","ctype":"radio","value":""}}},"s2g0radio73":{"gtype":"control","ctype":"radio","value":""},"s2g0radio121":{"gtype":"control","ctype":"radio","value":""},"s2g0radio123":{"gtype":"control","ctype":"radio","value":""},"s2g0radio129":{"gtype":"control","ctype":"radio","value":""},"s2g0radio128":{"gtype":"control","ctype":"radio","value":""},"s2g0radio127":{"gtype":"control","ctype":"radio","value":""},"s2g0radio126":{"gtype":"control","ctype":"radio","value":""},"s2g0radio125":{"gtype":"control","ctype":"radio","value":""},"s2g0radio124":{"gtype":"control","ctype":"radio","value":""},"s2g0g137":{"level":2,"gtype":"group","repeatable":false,"value":{"s2g0g137radio1":{"gtype":"control","ctype":"radio","value":""},"s2g0g137text2":{"gtype":"control","ctype":"text","value":""}}},"s2g0g138":{"level":2,"gtype":"group","repeatable":false,"value":{"s2g0g138radio2":{"gtype":"control","ctype":"radio","value":""},"s2g0g138text3":{"gtype":"control","ctype":"text","value":""}}},"s2g0g139":{"level":2,"gtype":"group","repeatable":false,"value":{"s2g0g139radio2":{"gtype":"control","ctype":"radio","value":""},"s2g0g139text3":{"gtype":"control","ctype":"text","value":""}}}}}},"s3":{"s3g0":{"level":1,"gtype":"group","repeatable":false,"value":{"s3g0radio2":{"gtype":"control","ctype":"radio","value":"0"},"s3g0radio7":{"gtype":"control","ctype":"radio","value":"003"},"s3g0radio8":{"gtype":"control","ctype":"radio","value":"003"},"s3g0radio9":{"gtype":"control","ctype":"radio","value":"003"},"s3g0radio10":{"gtype":"control","ctype":"radio","value":"003"}}}},"s4":{"s4g0":{"level":1,"gtype":"group","repeatable":false,"value":{"s4g0radio3":{"gtype":"control","ctype":"radio","value":"002"},"s4g0radio14":{"gtype":"control","ctype":"radio","value":"002"},"s4g0radio13":{"gtype":"control","ctype":"radio","value":"002"},"s4g0radio12":{"gtype":"control","ctype":"radio","value":"002"},"s4g0radio11":{"gtype":"control","ctype":"radio","value":"002"},"s4g0radio10":{"gtype":"control","ctype":"radio","value":"002"},"s4g0radio9":{"gtype":"control","ctype":"radio","value":"002"},"s4g0radio8":{"gtype":"control","ctype":"radio","value":"002"},"s4g0radio7":{"gtype":"control","ctype":"radio","value":"002"},"s4g0radio6":{"gtype":"control","ctype":"radio","value":"002"},"s4g0radio5":{"gtype":"control","ctype":"radio","value":"002"},"s4g0radio4":{"gtype":"control","ctype":"radio","value":"002"}}}},"s5":{"s5g0":{"level":1,"gtype":"group","repeatable":false,"value":{"s5g0radio68":{"gtype":"control","ctype":"radio","value":"002"},"s5g0date2":{"gtype":"control","ctype":"date","value":""},"s5g0select3":{"gtype":"control","ctype":"select","value":""},"s5g0radio5":{"gtype":"control","ctype":"radio","value":"002"},"s5g0date7":{"gtype":"control","ctype":"date","value":""},"s5g0select9":{"gtype":"control","ctype":"select","value":""},"s5g0radio11":{"gtype":"control","ctype":"radio","value":"002"},"s5g0date13":{"gtype":"control","ctype":"date","value":""},"s5g0radio69":{"gtype":"control","ctype":"radio","value":"1"},"s5g0checkbox70":{"gtype":"control","ctype":"checkbox","value":[]},"s5g0radio16":{"gtype":"control","ctype":"radio","value":"002"},"s5g0date46":{"gtype":"control","ctype":"date","value":""},"s5g0radio31":{"gtype":"control","ctype":"radio","value":"002"},"s5g0date47":{"gtype":"control","ctype":"date","value":""},"s5g0radio30":{"gtype":"control","ctype":"radio","value":"002"},"s5g0date48":{"gtype":"control","ctype":"date","value":""},"s5g0radio29":{"gtype":"control","ctype":"radio","value":"002"},"s5g0date49":{"gtype":"control","ctype":"date","value":""},"s5g0radio28":{"gtype":"control","ctype":"radio","value":"002"},"s5g0date50":{"gtype":"control","ctype":"date","value":""},"s5g0radio27":{"gtype":"control","ctype":"radio","value":"002"},"s5g0date51":{"gtype":"control","ctype":"date","value":""},"s5g0radio26":{"gtype":"control","ctype":"radio","value":"002"},"s5g0date52":{"gtype":"control","ctype":"date","value":""},"s5g0radio25":{"gtype":"control","ctype":"radio","value":"002"},"s5g0date53":{"gtype":"control","ctype":"date","value":""},"s5g0radio24":{"gtype":"control","ctype":"radio","value":"002"},"s5g0date54":{"gtype":"control","ctype":"date","value":""},"s5g0radio23":{"gtype":"control","ctype":"radio","value":"002"},"s5g0date55":{"gtype":"control","ctype":"date","value":""},"s5g0radio22":{"gtype":"control","ctype":"radio","value":"002"},"s5g0date57":{"gtype":"control","ctype":"date","value":""},"s5g0radio60":{"gtype":"control","ctype":"radio","value":"002"},"s5g0date56":{"gtype":"control","ctype":"date","value":""},"s5g0radio59":{"gtype":"control","ctype":"radio","value":"002"},"s5g0date58":{"gtype":"control","ctype":"date","value":""},"s5g0radio19":{"gtype":"control","ctype":"radio","value":"002"},"s5g0date33":{"gtype":"control","ctype":"date","value":""}}}}},"crfVersionId":414,"operationType":"0","eventSn":"21","studySn":"2","patientSn":"${res}","patientCrfSn":"-1","btnType":"save","pageType":"common"}`}

            let bodyCheckForm = {params: `{"formdata":{"s7":{"s7g0":{"level":1,"gtype":"group","repeatable":false,"value":{"s7g0text2":{"gtype":"control","ctype":"text","value":"${s7g0text2}"},"s7g0text29":{"gtype":"control","ctype":"text","value":"${s7g0text29}"},"s7g0text28":{"gtype":"control","ctype":"text","value":"${s7g0text28}"},"s7g0text27":{"gtype":"control","ctype":"text","value":""},"s7g0text26":{"gtype":"control","ctype":"text","value":"${s7g0text26}"},"s7g0text50":{"gtype":"control","ctype":"text","value":"${s7g0text50}"},"s7g0text49":{"gtype":"control","ctype":"text","value":""},"s7g0text48":{"gtype":"control","ctype":"text","value":""},"s7g0text47":{"gtype":"control","ctype":"text","value":""},"s7g0text46":{"gtype":"control","ctype":"text","value":""},"s7g0text45":{"gtype":"control","ctype":"text","value":""},"s7g0text44":{"gtype":"control","ctype":"text","value":""},"s7g0text43":{"gtype":"control","ctype":"text","value":""},"s7g0text42":{"gtype":"control","ctype":"text","value":""},"s7g0text41":{"gtype":"control","ctype":"text","value":""},"s7g0text40":{"gtype":"control","ctype":"text","value":""},"c0":{"gtype":"control","ctype":"radio","value":""},"s7g0text51":{"gtype":"control","ctype":"text","value":""},"c1":{"gtype":"control","ctype":"radio","value":""},"s7g0text38":{"gtype":"control","ctype":"text","value":""},"s7g0text37":{"gtype":"control","ctype":"text","value":""},"s7g0text36":{"gtype":"control","ctype":"text","value":""},"s7g0text55":{"gtype":"control","ctype":"text","value":""},"s7g0g56":{"level":2,"gtype":"group","repeatable":false,"value":{"s7g0g56text1":{"gtype":"control","ctype":"text","value":""},"c2":{"gtype":"control","ctype":"text","value":""},"c14":{"gtype":"control","ctype":"placeholder","value":""},"s7g0g56text5":{"gtype":"control","ctype":"text","value":""},"c5":{"gtype":"control","ctype":"text","value":""},"c15":{"gtype":"control","ctype":"placeholder","value":""},"s7g0g56text6":{"gtype":"control","ctype":"text","value":""},"c7":{"gtype":"control","ctype":"text","value":""}}},"s7g0g57":{"level":2,"gtype":"group","repeatable":false,"value":{"s7g0g57text1":{"gtype":"control","ctype":"text","value":"${s7g0g57text1}"},"c11":{"gtype":"control","ctype":"text","value":"${c11}"},"c16":{"gtype":"control","ctype":"placeholder","value":""},"s7g0g57text3":{"gtype":"control","ctype":"text","value":"${s7g0g57text3}"},"c12":{"gtype":"control","ctype":"text","value":"${c12}"},"c17":{"gtype":"control","ctype":"placeholder","value":""},"s7g0g57text2":{"gtype":"control","ctype":"text","value":""},"c13":{"gtype":"control","ctype":"text","value":""},"c18":{"gtype":"control","ctype":"placeholder","value":""}}}}}}},"crfVersionId":409,"operationType":"0","eventSn":"23","studySn":"2","patientSn":"${res}","patientCrfSn":"-1","btnType":"save","pageType":"common"}`};

            let labForm = {params: `{"formdata":{"s8":{"s8g0":{"level":1,"gtype":"group","repeatable":false,"value":{"s8g0textnumber11":{"gtype":"control","ctype":"textnumber","value":"${danguchun}"},"c11":{"gtype":"control","ctype":"radio","value":""},"s8g0textnumber22":{"gtype":"control","ctype":"textnumber","value":"${ganyou}"},"c9":{"gtype":"control","ctype":"radio","value":""},"s8g0textnumber12":{"gtype":"control","ctype":"textnumber","value":"${kongfuxuetang}"},"c8":{"gtype":"control","ctype":"radio","value":""},"s8g0textnumber20":{"gtype":"control","ctype":"textnumber","value":"${gaomidu}"},"c7":{"gtype":"control","ctype":"radio","value":""},"s8g0textnumber21":{"gtype":"control","ctype":"textnumber","value":""},"c6":{"gtype":"control","ctype":"radio","value":""},"s8g0textnumber18":{"gtype":"control","ctype":"textnumber","value":"${dimidu}"},"c5":{"gtype":"control","ctype":"radio","value":""},"s8g0textnumber17":{"gtype":"control","ctype":"textnumber","value":""},"c4":{"gtype":"control","ctype":"radio","value":""},"s8g0textnumber16":{"gtype":"control","ctype":"textnumber","value":""},"c3":{"gtype":"control","ctype":"radio","value":""},"s8g0textnumber15":{"gtype":"control","ctype":"textnumber","value":""},"c2":{"gtype":"control","ctype":"radio","value":""},"s8g0textnumber14":{"gtype":"control","ctype":"textnumber","value":""},"c1":{"gtype":"control","ctype":"radio","value":""},"s8g0textnumber13":{"gtype":"control","ctype":"textnumber","value":""},"c10":{"gtype":"control","ctype":"radio","value":""},"s8g0textnumber19":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber23":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber25":{"gtype":"control","ctype":"textnumber","value":"${zhongxing}"},"s8g0textnumber37":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber36":{"gtype":"control","ctype":"textnumber","value":"${hongxibao}"},"s8g0textnumber35":{"gtype":"control","ctype":"textnumber","value":"${xuehongdanbai}"},"s8g0textnumber34":{"gtype":"control","ctype":"textnumber","value":"${baixibao}"},"s8g0textnumber33":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber32":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber31":{"gtype":"control","ctype":"textnumber","value":"${xuexiaoban}"},"s8g0textnumber30":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber29":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber28":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber27":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber26":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber47":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber46":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber44":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber43":{"gtype":"control","ctype":"textnumber","value":"${linbaxibao}"},"s8g0textnumber42":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber41":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber40":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber39":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber38":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber56":{"gtype":"control","ctype":"textnumber","value":""},"s8g0select57":{"gtype":"control","ctype":"select","value":""},"s8g0textnumber55":{"gtype":"control","ctype":"textnumber","value":"${gubing}"},"s8g0textnumber54":{"gtype":"control","ctype":"textnumber","value":"${gucao}"},"s8g0textnumber53":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber52":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber51":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber50":{"gtype":"control","ctype":"textnumber","value":"${zongdanbai}"},"s8g0textnumber49":{"gtype":"control","ctype":"textnumber","value":"${baidanbai}"},"s8g0textnumber67":{"gtype":"control","ctype":"textnumber","value":"${qiudanbai}"},"s8g0textnumber66":{"gtype":"control","ctype":"textnumber","value":"${zongdanhongsu}"},"s8g0textnumber65":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber64":{"gtype":"control","ctype":"textnumber","value":"${jianjiedanhongsu}"},"s8g0textnumber63":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber62":{"gtype":"control","ctype":"textnumber","value":"${tongxingbanpangguangsuan}"},"s8g0textnumber61":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber60":{"gtype":"control","ctype":"textnumber","value":"${xueniaosudan}"},"s8g0textnumber59":{"gtype":"control","ctype":"textnumber","value":"${xuejigan}"},"s8g0textnumber76":{"gtype":"control","ctype":"textnumber","value":"${xuejianongdu}"},"s8g0textnumber81":{"gtype":"control","ctype":"textnumber","value":"${xuenanongdu}"},"s8g0textnumber80":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber79":{"gtype":"control","ctype":"textnumber","value":"${xuegainongdu}"},"s8g0textnumber78":{"gtype":"control","ctype":"textnumber","value":"${niaoweiliangbaidanbai}"},"c0":{"gtype":"control","ctype":"radio","value":""},"s8g0textnumber75":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber74":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber73":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber72":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber71":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber70":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber69":{"gtype":"control","ctype":"textnumber","value":""}}}}},"crfVersionId":413,"operationType":"0","eventSn":"24","studySn":"2","patientSn":"${res}","patientCrfSn":"-1","btnType":"save","pageType":"common"}`}

            let xindianForm = {params: `{"formdata":{"s9":{"s9g0":{"level":1,"gtype":"group","repeatable":false,"value":{"s9g0text2":{"gtype":"control","ctype":"text","value":"${pingjunshousuoya}"},"c0":{"gtype":"control","ctype":"text","value":"${pingjunshuzhangya}"},"s9g0text8":{"gtype":"control","ctype":"text","value":"${baitianshousuo}"},"c1":{"gtype":"control","ctype":"text","value":"${baitianshuzhang}"},"s9g0text7":{"gtype":"control","ctype":"text","value":"${yejianshousuo}"},"c2":{"gtype":"control","ctype":"text","value":"${yejianshuzhang}"},"s9g0text11":{"gtype":"control","ctype":"text","value":""},"c3":{"gtype":"control","ctype":"text","value":""},"s9g0text6":{"gtype":"control","ctype":"text","value":"${pingjunmailv}"},"s9g0text10":{"gtype":"control","ctype":"text","value":"${baitianmailv}"},"s9g0text9":{"gtype":"control","ctype":"text","value":"${yejianmailv}"},"s9g0g13":{"level":2,"gtype":"group","repeatable":false,"value":{"s9g0g13text3":{"gtype":"control","ctype":"text","value":""},"s9g0g13text2":{"gtype":"control","ctype":"text","value":""}}},"s9g0g14":{"level":2,"gtype":"group","repeatable":false,"value":{"s9g0g14text2":{"gtype":"control","ctype":"text","value":""},"s9g0g14text3":{"gtype":"control","ctype":"text","value":""}}},"s9g0text81":{"gtype":"control","ctype":"text","value":""},"s9g0text17":{"gtype":"control","ctype":"text","value":""},"s9g0text25":{"gtype":"control","ctype":"text","value":""},"s9g0text21":{"gtype":"control","ctype":"text","value":""},"s9g0text23":{"gtype":"control","ctype":"text","value":""},"s9g0text24":{"gtype":"control","ctype":"text","value":""},"s9g0text69":{"gtype":"control","ctype":"text","value":""},"s9g0text68":{"gtype":"control","ctype":"text","value":""},"s9g0text57":{"gtype":"control","ctype":"text","value":""},"s9g0text39":{"gtype":"control","ctype":"text","value":""},"s9g0text56":{"gtype":"control","ctype":"text","value":""},"s9g0text43":{"gtype":"control","ctype":"text","value":""},"s9g0text48":{"gtype":"control","ctype":"text","value":""},"c4":{"gtype":"control","ctype":"radio","value":""},"s9g0text60":{"gtype":"control","ctype":"text","value":""},"s9g0text71":{"gtype":"control","ctype":"text","value":"${xinlv}"},"s9g0radio78":{"gtype":"control","ctype":"radio","value":""},"s9g0text77":{"gtype":"control","ctype":"text","value":"${dianyaRV5}"},"s9g0text76":{"gtype":"control","ctype":"text","value":"${dianyaSV1}"},"s9g0text75":{"gtype":"control","ctype":"text","value":""},"s9g0text74":{"gtype":"control","ctype":"text","value":"${QRS}"},"s9g0text73":{"gtype":"control","ctype":"text","value":"${PR}"}}}}},"crfVersionId":412,"operationType":"0","eventSn":"25","studySn":"2","patientSn":"${res}","patientCrfSn":"-1","btnType":"save","pageType":"common"}`};

            let yingxiangxueForm = {params: `{"formdata":{"s10":{"s10g0":{"level":1,"gtype":"group","repeatable":false,"value":{"s10g0g3":{"level":2,"gtype":"group","repeatable":false,"value":{"s10g0g3text2":{"gtype":"control","ctype":"text","value":"${left}"},"s10g0g3text3":{"gtype":"control","ctype":"text","value":"${left2}"},"s10g0g4radio4":{"gtype":"control","ctype":"radio","value":""},"s10g0g4radio5":{"gtype":"control","ctype":"radio","value":""},"s10g0g3radio6":{"gtype":"control","ctype":"radio","value":""},"s10g0g3radio7":{"gtype":"control","ctype":"radio","value":""}}},"s10g0g4":{"level":2,"gtype":"group","repeatable":false,"value":{"s10g0g4text2":{"gtype":"control","ctype":"text","value":"${right}"},"s10g0g4text3":{"gtype":"control","ctype":"text","value":"${right2}"},"c0":{"gtype":"control","ctype":"radio","value":""},"c2":{"gtype":"control","ctype":"radio","value":""},"s10g0g4radio6":{"gtype":"control","ctype":"radio","value":""},"s10g0g4radio7":{"gtype":"control","ctype":"radio","value":""}}},"s10g0text13":{"gtype":"control","ctype":"text","value":"${zhudongmai}"},"s10g0text32":{"gtype":"control","ctype":"text","value":""},"s10g0text31":{"gtype":"control","ctype":"text","value":"${zuofang}"},"s10g0text30":{"gtype":"control","ctype":"text","value":"${zuoshishuzhang}"},"s10g0text29":{"gtype":"control","ctype":"text","value":"${zuoshishousuo}"},"s10g0text28":{"gtype":"control","ctype":"text","value":"${shijiange}"},"s10g0text27":{"gtype":"control","ctype":"text","value":"${houbi}"},"s10g0text26":{"gtype":"control","ctype":"text","value":"${youshi}"},"s10g0text25":{"gtype":"control","ctype":"text","value":""},"s10g0text24":{"gtype":"control","ctype":"text","value":"${zuofangrongji}"},"s10g0text23":{"gtype":"control","ctype":"text","value":"${zuoshishuzhangmorongji}"},"s10g0text22":{"gtype":"control","ctype":"text","value":"${zuoshishousuomorongji}"},"s10g0text21":{"gtype":"control","ctype":"text","value":"${shexuefenshu}"},"s10g0text20":{"gtype":"control","ctype":"text","value":""},"s10g0text19":{"gtype":"control","ctype":"text","value":""},"s10g0text18":{"gtype":"control","ctype":"text","value":""},"s10g0text17":{"gtype":"control","ctype":"text","value":"${zhudongmaibansudu}"},"s10g0text16":{"gtype":"control","ctype":"text","value":"${zhudongmaibanfanliu}"},"s10g0text15":{"gtype":"control","ctype":"text","value":"${erjianmaibanfanliu}"},"s10g0text14":{"gtype":"control","ctype":"text","value":"${sanjianmaibanfanliu}"},"s10g0text7":{"gtype":"control","ctype":"text","value":""},"s10g0text12":{"gtype":"control","ctype":"text","value":""},"s10g0text11":{"gtype":"control","ctype":"text","value":""},"s10g0text10":{"gtype":"control","ctype":"text","value":""},"s10g0text9":{"gtype":"control","ctype":"text","value":""},"s10g0text8":{"gtype":"control","ctype":"text","value":""}}}}},"crfVersionId":27,"operationType":"0","eventSn":"26","studySn":"2","patientSn":"${res}","patientCrfSn":"-1","btnType":"save","pageType":"common"}`};

            if (patientName && res) {
                console.log('save basic...')
                let basicres = await saveBodyCheck(basicForm);
                console.log(basicres);
                sleep.sleep(1);

                console.log('save body check...')
                let bodyres = await saveBodyCheck(bodyCheckForm);
                console.log(bodyres);
                sleep.sleep(1);

                if (bodyres) {
                    bodyres = JSON.parse(bodyres);
                    const patientCrfSn = bodyres.patientCrfSn;
                    bodyCheckForm = {params: `{"formdata":{"s7":{"s7g0":{"level":1,"gtype":"group","repeatable":false,"value":{"s7g0text2":{"gtype":"control","ctype":"text","value":"${s7g0text2}"},"s7g0text29":{"gtype":"control","ctype":"text","value":"${s7g0text29}"},"s7g0text28":{"gtype":"control","ctype":"text","value":"${s7g0text28}"},"s7g0text27":{"gtype":"control","ctype":"text","value":""},"s7g0text26":{"gtype":"control","ctype":"text","value":"${s7g0text26}"},"s7g0text50":{"gtype":"control","ctype":"text","value":"${s7g0text50}"},"s7g0text49":{"gtype":"control","ctype":"text","value":""},"s7g0text48":{"gtype":"control","ctype":"text","value":""},"s7g0text47":{"gtype":"control","ctype":"text","value":""},"s7g0text46":{"gtype":"control","ctype":"text","value":""},"s7g0text45":{"gtype":"control","ctype":"text","value":""},"s7g0text44":{"gtype":"control","ctype":"text","value":""},"s7g0text43":{"gtype":"control","ctype":"text","value":""},"s7g0text42":{"gtype":"control","ctype":"text","value":""},"s7g0text41":{"gtype":"control","ctype":"text","value":""},"s7g0text40":{"gtype":"control","ctype":"text","value":""},"c0":{"gtype":"control","ctype":"radio","value":""},"s7g0text51":{"gtype":"control","ctype":"text","value":""},"c1":{"gtype":"control","ctype":"radio","value":""},"s7g0text38":{"gtype":"control","ctype":"text","value":""},"s7g0text37":{"gtype":"control","ctype":"text","value":""},"s7g0text36":{"gtype":"control","ctype":"text","value":""},"s7g0text55":{"gtype":"control","ctype":"text","value":""},"s7g0g56":{"level":2,"gtype":"group","repeatable":false,"value":{"s7g0g56text1":{"gtype":"control","ctype":"text","value":""},"c2":{"gtype":"control","ctype":"text","value":""},"c14":{"gtype":"control","ctype":"placeholder","value":""},"s7g0g56text5":{"gtype":"control","ctype":"text","value":""},"c5":{"gtype":"control","ctype":"text","value":""},"c15":{"gtype":"control","ctype":"placeholder","value":""},"s7g0g56text6":{"gtype":"control","ctype":"text","value":""},"c7":{"gtype":"control","ctype":"text","value":""}}},"s7g0g57":{"level":2,"gtype":"group","repeatable":false,"value":{"s7g0g57text1":{"gtype":"control","ctype":"text","value":"${s7g0g57text1}"},"c11":{"gtype":"control","ctype":"text","value":"${c11}"},"c16":{"gtype":"control","ctype":"placeholder","value":""},"s7g0g57text3":{"gtype":"control","ctype":"text","value":"${s7g0g57text3}"},"c12":{"gtype":"control","ctype":"text","value":"${c12}"},"c17":{"gtype":"control","ctype":"placeholder","value":""},"s7g0g57text2":{"gtype":"control","ctype":"text","value":""},"c13":{"gtype":"control","ctype":"text","value":""},"c18":{"gtype":"control","ctype":"placeholder","value":""}}}}}}},"crfVersionId":409,"operationType":"1","eventSn":"23","studySn":"2","patientSn":"${res}","patientCrfSn":"${patientCrfSn}","btnType":"submit","pageType":"common"}`}
                    await saveBodyCheck(bodyCheckForm);
                    sleep.sleep(1);
                }

                console.log('save lab...')
                let labres = await saveBodyCheck(labForm);
                console.log(labres);
                sleep.sleep(1);

                if (labres) {
                    labres = JSON.parse(labres);
                    const patientCrfSn = labres.patientCrfSn;
                    labForm = {params: `{"formdata":{"s8":{"s8g0":{"level":1,"gtype":"group","repeatable":false,"value":{"s8g0textnumber11":{"gtype":"control","ctype":"textnumber","value":"${danguchun}"},"c11":{"gtype":"control","ctype":"radio","value":""},"s8g0textnumber22":{"gtype":"control","ctype":"textnumber","value":"${ganyou}"},"c9":{"gtype":"control","ctype":"radio","value":""},"s8g0textnumber12":{"gtype":"control","ctype":"textnumber","value":"${kongfuxuetang}"},"c8":{"gtype":"control","ctype":"radio","value":""},"s8g0textnumber20":{"gtype":"control","ctype":"textnumber","value":"${gaomidu}"},"c7":{"gtype":"control","ctype":"radio","value":""},"s8g0textnumber21":{"gtype":"control","ctype":"textnumber","value":""},"c6":{"gtype":"control","ctype":"radio","value":""},"s8g0textnumber18":{"gtype":"control","ctype":"textnumber","value":"${dimidu}"},"c5":{"gtype":"control","ctype":"radio","value":""},"s8g0textnumber17":{"gtype":"control","ctype":"textnumber","value":""},"c4":{"gtype":"control","ctype":"radio","value":""},"s8g0textnumber16":{"gtype":"control","ctype":"textnumber","value":""},"c3":{"gtype":"control","ctype":"radio","value":""},"s8g0textnumber15":{"gtype":"control","ctype":"textnumber","value":""},"c2":{"gtype":"control","ctype":"radio","value":""},"s8g0textnumber14":{"gtype":"control","ctype":"textnumber","value":""},"c1":{"gtype":"control","ctype":"radio","value":""},"s8g0textnumber13":{"gtype":"control","ctype":"textnumber","value":""},"c10":{"gtype":"control","ctype":"radio","value":""},"s8g0textnumber19":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber23":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber25":{"gtype":"control","ctype":"textnumber","value":"${zhongxing}"},"s8g0textnumber37":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber36":{"gtype":"control","ctype":"textnumber","value":"${hongxibao}"},"s8g0textnumber35":{"gtype":"control","ctype":"textnumber","value":"${xuehongdanbai}"},"s8g0textnumber34":{"gtype":"control","ctype":"textnumber","value":"${baixibao}"},"s8g0textnumber33":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber32":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber31":{"gtype":"control","ctype":"textnumber","value":"${xuexiaoban}"},"s8g0textnumber30":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber29":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber28":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber27":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber26":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber47":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber46":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber44":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber43":{"gtype":"control","ctype":"textnumber","value":"${linbaxibao}"},"s8g0textnumber42":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber41":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber40":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber39":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber38":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber56":{"gtype":"control","ctype":"textnumber","value":""},"s8g0select57":{"gtype":"control","ctype":"select","value":""},"s8g0textnumber55":{"gtype":"control","ctype":"textnumber","value":"${gubing}"},"s8g0textnumber54":{"gtype":"control","ctype":"textnumber","value":"${gucao}"},"s8g0textnumber53":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber52":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber51":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber50":{"gtype":"control","ctype":"textnumber","value":"${zongdanbai}"},"s8g0textnumber49":{"gtype":"control","ctype":"textnumber","value":"${baidanbai}"},"s8g0textnumber67":{"gtype":"control","ctype":"textnumber","value":"${qiudanbai}"},"s8g0textnumber66":{"gtype":"control","ctype":"textnumber","value":"${zongdanhongsu}"},"s8g0textnumber65":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber64":{"gtype":"control","ctype":"textnumber","value":"${jianjiedanhongsu}"},"s8g0textnumber63":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber62":{"gtype":"control","ctype":"textnumber","value":"${tongxingbanpangguangsuan}"},"s8g0textnumber61":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber60":{"gtype":"control","ctype":"textnumber","value":"${xueniaosudan}"},"s8g0textnumber59":{"gtype":"control","ctype":"textnumber","value":"${xuejigan}"},"s8g0textnumber76":{"gtype":"control","ctype":"textnumber","value":"${xuejianongdu}"},"s8g0textnumber81":{"gtype":"control","ctype":"textnumber","value":"${xuenanongdu}"},"s8g0textnumber80":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber79":{"gtype":"control","ctype":"textnumber","value":"${xuegainongdu}"},"s8g0textnumber78":{"gtype":"control","ctype":"textnumber","value":"${niaoweiliangbaidanbai}"},"c0":{"gtype":"control","ctype":"radio","value":""},"s8g0textnumber75":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber74":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber73":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber72":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber71":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber70":{"gtype":"control","ctype":"textnumber","value":""},"s8g0textnumber69":{"gtype":"control","ctype":"textnumber","value":""}}}}},"crfVersionId":413,"operationType":"1","eventSn":"24","studySn":"2","patientSn":"${res}","patientCrfSn":"${patientCrfSn}","btnType":"submit","pageType":"common"}`};
                    await saveBodyCheck(labForm);
                    sleep.sleep(1);
                }

                console.log('save xindian...');
                let xindianres = await saveBodyCheck(xindianForm);
                console.log(xindianres);
                sleep.sleep(1);

                if (xindianres) {
                    xindianres = JSON.parse(xindianres);
                    const patientCrfSn = xindianres.patientCrfSn;
                    xindianForm = {params: `{"formdata":{"s9":{"s9g0":{"level":1,"gtype":"group","repeatable":false,"value":{"s9g0text2":{"gtype":"control","ctype":"text","value":"${pingjunshousuoya}"},"c0":{"gtype":"control","ctype":"text","value":"${pingjunshuzhangya}"},"s9g0text8":{"gtype":"control","ctype":"text","value":"${baitianshousuo}"},"c1":{"gtype":"control","ctype":"text","value":"${baitianshuzhang}"},"s9g0text7":{"gtype":"control","ctype":"text","value":"${yejianshousuo}"},"c2":{"gtype":"control","ctype":"text","value":"${yejianshuzhang}"},"s9g0text11":{"gtype":"control","ctype":"text","value":""},"c3":{"gtype":"control","ctype":"text","value":""},"s9g0text6":{"gtype":"control","ctype":"text","value":"${pingjunmailv}"},"s9g0text10":{"gtype":"control","ctype":"text","value":"${baitianmailv}"},"s9g0text9":{"gtype":"control","ctype":"text","value":"${yejianmailv}"},"s9g0g13":{"level":2,"gtype":"group","repeatable":false,"value":{"s9g0g13text3":{"gtype":"control","ctype":"text","value":""},"s9g0g13text2":{"gtype":"control","ctype":"text","value":""}}},"s9g0g14":{"level":2,"gtype":"group","repeatable":false,"value":{"s9g0g14text2":{"gtype":"control","ctype":"text","value":""},"s9g0g14text3":{"gtype":"control","ctype":"text","value":""}}},"s9g0text81":{"gtype":"control","ctype":"text","value":""},"s9g0text17":{"gtype":"control","ctype":"text","value":""},"s9g0text25":{"gtype":"control","ctype":"text","value":""},"s9g0text21":{"gtype":"control","ctype":"text","value":""},"s9g0text23":{"gtype":"control","ctype":"text","value":""},"s9g0text24":{"gtype":"control","ctype":"text","value":""},"s9g0text69":{"gtype":"control","ctype":"text","value":""},"s9g0text68":{"gtype":"control","ctype":"text","value":""},"s9g0text57":{"gtype":"control","ctype":"text","value":""},"s9g0text39":{"gtype":"control","ctype":"text","value":""},"s9g0text56":{"gtype":"control","ctype":"text","value":""},"s9g0text43":{"gtype":"control","ctype":"text","value":""},"s9g0text48":{"gtype":"control","ctype":"text","value":""},"c4":{"gtype":"control","ctype":"radio","value":""},"s9g0text60":{"gtype":"control","ctype":"text","value":""},"s9g0text71":{"gtype":"control","ctype":"text","value":"${xinlv}"},"s9g0radio78":{"gtype":"control","ctype":"radio","value":""},"s9g0text77":{"gtype":"control","ctype":"text","value":"${dianyaRV5}"},"s9g0text76":{"gtype":"control","ctype":"text","value":"${dianyaSV1}"},"s9g0text75":{"gtype":"control","ctype":"text","value":""},"s9g0text74":{"gtype":"control","ctype":"text","value":"${QRS}"},"s9g0text73":{"gtype":"control","ctype":"text","value":"${PR}"}}}}},"crfVersionId":412,"operationType":"1","eventSn":"25","studySn":"2","patientSn":"${res}","patientCrfSn":"${patientCrfSn}","btnType":"submit","pageType":"common"}`};
                    await saveBodyCheck(xindianForm);
                    sleep.sleep(1);
                }

                console.log('save ying xiang...');
                let yingxianngres = await saveBodyCheck(yingxiangxueForm);
                console.log(yingxianngres);
                sleep.sleep(1);

                if (yingxianngres) {
                    yingxianngres = JSON.parse(yingxianngres);
                    const patientCrfSn = yingxianngres.patientCrfSn;
                    yingxiangxueForm = {params: `{"formdata":{"s10":{"s10g0":{"level":1,"gtype":"group","repeatable":false,"value":{"s10g0g3":{"level":2,"gtype":"group","repeatable":false,"value":{"s10g0g3text2":{"gtype":"control","ctype":"text","value":"${left}"},"s10g0g3text3":{"gtype":"control","ctype":"text","value":"${left2}"},"s10g0g4radio4":{"gtype":"control","ctype":"radio","value":""},"s10g0g4radio5":{"gtype":"control","ctype":"radio","value":""},"s10g0g3radio6":{"gtype":"control","ctype":"radio","value":""},"s10g0g3radio7":{"gtype":"control","ctype":"radio","value":""}}},"s10g0g4":{"level":2,"gtype":"group","repeatable":false,"value":{"s10g0g4text2":{"gtype":"control","ctype":"text","value":"${right}"},"s10g0g4text3":{"gtype":"control","ctype":"text","value":"${right2}"},"c0":{"gtype":"control","ctype":"radio","value":""},"c2":{"gtype":"control","ctype":"radio","value":""},"s10g0g4radio6":{"gtype":"control","ctype":"radio","value":""},"s10g0g4radio7":{"gtype":"control","ctype":"radio","value":""}}},"s10g0text13":{"gtype":"control","ctype":"text","value":"${zhudongmai}"},"s10g0text32":{"gtype":"control","ctype":"text","value":""},"s10g0text31":{"gtype":"control","ctype":"text","value":"${zuofang}"},"s10g0text30":{"gtype":"control","ctype":"text","value":"${zuoshishuzhang}"},"s10g0text29":{"gtype":"control","ctype":"text","value":"${zuoshishousuo}"},"s10g0text28":{"gtype":"control","ctype":"text","value":"${shijiange}"},"s10g0text27":{"gtype":"control","ctype":"text","value":"${houbi}"},"s10g0text26":{"gtype":"control","ctype":"text","value":"${youshi}"},"s10g0text25":{"gtype":"control","ctype":"text","value":""},"s10g0text24":{"gtype":"control","ctype":"text","value":"${zuofangrongji}"},"s10g0text23":{"gtype":"control","ctype":"text","value":"${zuoshishuzhangmorongji}"},"s10g0text22":{"gtype":"control","ctype":"text","value":"${zuoshishousuomorongji}"},"s10g0text21":{"gtype":"control","ctype":"text","value":"${shexuefenshu}"},"s10g0text20":{"gtype":"control","ctype":"text","value":""},"s10g0text19":{"gtype":"control","ctype":"text","value":""},"s10g0text18":{"gtype":"control","ctype":"text","value":""},"s10g0text17":{"gtype":"control","ctype":"text","value":"${zhudongmaibansudu}"},"s10g0text16":{"gtype":"control","ctype":"text","value":"${zhudongmaibanfanliu}"},"s10g0text15":{"gtype":"control","ctype":"text","value":"${erjianmaibanfanliu}"},"s10g0text14":{"gtype":"control","ctype":"text","value":"${sanjianmaibanfanliu}"},"s10g0text7":{"gtype":"control","ctype":"text","value":""},"s10g0text12":{"gtype":"control","ctype":"text","value":""},"s10g0text11":{"gtype":"control","ctype":"text","value":""},"s10g0text10":{"gtype":"control","ctype":"text","value":""},"s10g0text9":{"gtype":"control","ctype":"text","value":""},"s10g0text8":{"gtype":"control","ctype":"text","value":""}}}}},"crfVersionId":27,"operationType":"1","eventSn":"26","studySn":"2","patientSn":"${res}","patientCrfSn":"${patientCrfSn}","btnType":"submit","pageType":"common"}`};
                    await saveBodyCheck(yingxiangxueForm);
                    sleep.sleep(1);
                }
            }
        } catch (e) {
            console.log('failed:', e)
        }

        sleep.sleep(5);


        // const form = {
        //     inpatientNo,
        //     outpatientNo,
        //     patientName,
        //     birthDate,
        //     patientGender,
        //     participateDate,
        //     orgCode,
        //     studySn,
        //     IDCard,
        //     telephone
        // };


        // setTask(form);
    }
}

main();

function setTask(form) {
    tasks.push(new Promise((resolve, reject) => {
        request.post({url, jar: j, form}, (err, res, body) => {
            console.log(`post:${form.patientName}`)
            if (!body || err) {
                errs.push(`failed: ${form.patientName}, err:${err}`)
            }
            resolve();
        })
    }))
}


function createUser(form) {
    return new Promise((resolve, reject) => {
        console.log(`create user: ${form.patientName}`);
        request.post({
            url,
            jar: j,
            form,
        }, (err, res, body) => {
            if (!body || err) {
                reject(0);
            }

            const str = body.toString();
            if (str.indexOf('true') >= 0) {
                console.log('succeed');
                resolve(str);
            } else {
                console.log('failed');
                reject(1);
            }
        })
    })
}

async function getPatientId(patientName, inPatientNo) {
    const form = {
        currentPage: 1,
        totalPage: 1,
        jumpToPage: '',
        studySn: 2,
        queryCondsJson: '',
        orderBy: 'participateDate desc',
        outPatientNo: '',
        inPatientNo,
        participateDateFrom: '',
        participateDateTo: '',
        patientName,
        patientGender: '',
        upDateTimeFrom: '',
        upDateTimeTo: '',
        orgCode: '',
        doctorName: '',
        tabFlag: 'simple',
        advQueryCondsJson: '',
    };

    const nUrl = `http://120.77.45.84:8001/srm/srList/singleSR.html`;

    return new Promise((resolve, reject) => {
        request.post({url: nUrl, jar: j, form}, (err, res, body) => {
            console.log(`get:${form.patientName}`);
            if (!body || err) {
                resolve(null);
            }

            const str = body.toString();
            const idx1 = str.indexOf('&amp;patientSn=');
            const idx2 = str.indexOf('&amp;position=');

            const id = str.substring(idx1 + 15, idx2);
            if (id) {
                resolve(id);
            }
            resolve(null);
        })
    })
}

function saveBodyCheck(form) {

    const nUrl = 'http://120.77.45.84:8001/srm/caseCrfForm/saveUserDataCollectForm.html';

    return new Promise((resolve, reject) => {
        request.post({
            url: nUrl,
            jar: j,
            form,
        }, (err, res, body) => {
            if (!body || err) {
                reject(0);
            }

            const str = body.toString();
            if (str.indexOf('true') >= 0) {
                console.log('succeed');
                resolve(body);
            }
            reject(1);
        })
    })
}


