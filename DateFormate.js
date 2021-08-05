/*
*对Date的扩展，将 Date 转化为指定格式的String
*月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
* 例子：
* (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
* (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
*/
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/*
 *数组去重复代码数据 
 * @params:{arrs} [1,2,3,2,3] => [1,2,3]
 * 
*/
export const uniques = (item, map = new Map()) => item.reduce((accumulation, current) => (accumulation.concat(map.has(current) ? [] : map.set(current, current).get(current))), [])

/*
 *针对于业务场景：本周、本年、本月 
 * 
 * 输出开始事件 结束时间
 */
export const exportDate = (keyword,n=7) => {
    let now = new Date()
    let years = now.getFullYear();
    let months = now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
    //获取一个月最后一天
    let lastDate = new Date(years, months, 0).getDate();
    let day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
    let hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
    let mins = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
    let seconds = now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();

    switch (keyword) {
        case '本年':
            //半年就是 1月1号的0:00:00 到12月22号 11:59:59
            return { startTime: `${years}/01/01 00:00:00`, endTime: `${years}/12/12 23:59:59` };
        case '本月':
            return { startTime: `${years}/${months}/01 00:00:00`, endTime: `${years}/${months}/${lastDate} 23:59:59` };
        case '本周':
            //获取当前时间时间戳
            let now = new Date().getTime();
            //今天往后7天毫秒
            let sevenDay = n * 24 * 60 * 60 * 1000;
            //毫秒数量相加
            let endDay = new Date(now + sevenDay);
            //转化时间格式
            let endYears = endDay.getFullYear();
            let endMonths = endDay.getMonth() + 1 < 10 ? `0${endDay.getMonth() + 1}` : endDay.getMonth() + 1;
            let endDays = endDay.getDate() < 10 ? `0${endDay.getDate()}` : endDay.getDate();
            let endHour = endDay.getHours() < 10 ? `0${endDay.getHours()}` : endDay.getHours();
            let endMins = endDay.getMinutes() < 10 ? `0${endDay.getMinutes()}` : endDay.getMinutes();
            let endSeconds = endDay.getSeconds() < 10 ? `0${endDay.getSeconds()}` : endDay.getSeconds();
            return { startTime: `${years}/${months}/${day} ${hour}:${mins}:${seconds}`, endTime: `${endYears}/${endMonths}/${endDays} ${endHour}:${endMins}:${endSeconds}` }
    }
}
//动态生成uuid
function  uuid() {
	var temp_url = URL.createObjectURL(new Blob());
	var uuid = temp_url.toString();
	URL.revokeObjectURL(temp_url);
	return  uuid.substr(uuid.lastIndexOf("/")+1)
}


// String 构造函数的原型对象的一个方法。
    String.prototype.IsPicture = function()
    {
        //判断是否是图片 - strFilter必须是小写列举
        var strFilter=".jpeg|.gif|.jpg|.png|.bmp|.pic|"
        if(this.indexOf(".")>-1)
        {
            var p = this.lastIndexOf(".");
            //alert(p);
            //alert(this.length);
            var strPostfix=this.substring(p,this.length) + '|';        
            strPostfix = strPostfix.toLowerCase();
            //alert(strPostfix);
            if(strFilter.indexOf(strPostfix)>-1)
            {
                //alert("True");
                return true;
            }
        }        
        //alert('False');
        return false;            
    }
