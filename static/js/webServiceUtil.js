var isDebug = false;
var localDomain = "192.168.50.230";   //请求地址

var isDebugLocal = true;
var localUrl = "192.168.50.15";    //跳转地址http:

var isDebugAr = false;
var localDomainAr = "192.168.50.15";   //AR请求地址

//小蚂蚁AR webService地址
const apiWebServiceURLOfLocalsAr = "https://" + localDomainAr + "/easyArRecWebservice";
const apiWebServiceURLOfRemoteAr = "https://www.maaee.com/easyArRecWebservice";
var apiWebServiceURLAr = isDebugAr ? apiWebServiceURLOfLocalsAr : apiWebServiceURLOfRemoteAr;

//小蚂蚁webService地址
const apiWebServiceURLOfLocals = "http://" + localDomain + "/Excoord_ApiServer/webservice";
const apiWebServiceURLOfRemote = "https://www.maaee.com/Excoord_For_Education/webservice";
var apiWebServiceURL = isDebug ? apiWebServiceURLOfLocals : apiWebServiceURLOfRemote;

//小蚂蚁mobile地址
const mobileURLOfLocal = "http://" + localUrl + ":8091/#/";
const mobileURLOfRemote = "http://jiaoxue.maaee.com:8091/#/";


function WebServiceUtil() {

};

WebServiceUtil.mobileServiceURL = isDebugLocal ? mobileURLOfLocal : mobileURLOfRemote;

WebServiceUtil.requestLittleAntApi = function (flag, data, listener) {
    $.ajax({
        type: "post",
        url: flag ? apiWebServiceURL : apiWebServiceURLAr,
        data: {params: data},
        dataType: "json",
        success: function (result) {
            listener.onResponse(result);
        }, error: function (error) {
            listener.onError(error);
        }
    });
}

WebServiceUtil.requestLittleAntApiAR = function (data, listener) {
    $.ajax({
        type: "post",
        url: apiWebServiceURLAr,
        data: {params: data},
        dataType: "json",
        success: function (result) {
            listener.onResponse(result);
        }, error: function (error) {
            listener.onError(error);
        }
    });
}

/**
 * 系统非空判断
 * @param content
 * @returns {boolean}
 */
WebServiceUtil.isEmpty = function (content) {
    if (content == null || content == "null" || content == "" || typeof(content) == "undefined") {
        return true;
    } else {
        return false;
    }
};

/**
 * 时间戳转年月日
 * @param nS
 * @returns {string}
 */
WebServiceUtil.formatYMD = function (nS) {
    var da = new Date(parseInt(nS));
    var year = da.getFullYear();
    var month = da.getMonth() + 1;
    var date = da.getDate();
    var ymdStr = [year, month, date].join('-');
    return ymdStr;
};

/**
 * 时间戳转年月
 * @param nS
 * @returns {string}
 */
WebServiceUtil.formatYM = function (nS) {
    var da = new Date(parseInt(nS));
    var year = da.getFullYear();
    var month = da.getMonth() + 1;
    var ymdStr = [year, month].join('-');
    return ymdStr;
};

/**
 * 时间戳转时分
 * @param nS
 * @returns {string}
 */
WebServiceUtil.formatHM = function (nS) {
    var da = new Date(parseInt(nS));
    var hour = da.getHours() + ":";
    var minutes = da.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var hmStr = hour + minutes;
    return hmStr;
};

WebServiceUtil.createUUID = function () {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
};


