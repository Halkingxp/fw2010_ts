
interface ICallBack{
    (va:any):any;
}

export class Http{
    static baseUrl:string = "http://jsonplaceholder.typicode.com/";

    setBaseUrl(url:string){
        Http.baseUrl = url;
    }

    static get(path:string,data:any,handler:ICallBack,extraUrl?:string){
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000;

        if(!extraUrl){
            extraUrl = Http.baseUrl;
        }
        let sendPath = path;
        let sendText = "?";
        for(let k in data){
            if(sendText != "?"){
                sendText +="&"
            }
            sendText +=(k + "=" +data[k])
        }
            //组装完整的URL
        let requestURL = extraUrl + sendPath + encodeURI(sendText);
        //发送请求
        cc.log("RequestURL:" + requestURL);
        xhr.open("GET", requestURL, true);

        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
            // xhr.setRequestHeader("Content-type","text/html;charset=UTF-8");
        }
        // else{
            // xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.setRequestHeader("Content-type","application/json");
        // }
        
        let timer = setTimeout(function() {
            xhr.abort();
            cc.log('http timeout');
            retryFunc();
        }, 5000);

        let retryFunc = function() {
            data.hasRetried = true;
            Http.get(path, data, handler, extraUrl);
        };

        xhr.onreadystatechange = function () {
            cc.log("onreadystatechange");
            clearTimeout(timer);
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                // console.log("http res(" + xhr.responseText.length + "):" + xhr.responseText);        
                let respText = xhr.responseText;
                let ret = null;
                try {
                    ret = JSON.parse(respText);
                } catch (e) {
                    console.log("err:" + e);
                    ret = {
                        errcode: -10001,
                        errmsg: e
                    };
                }
                cc.log("request from [" + xhr.responseURL + "] data [", ret, "]");
                if (handler) {
                    handler(ret);
                    // if (ret.errcode != 0 && ret.errmsg) {
                    //     cc.vv.utils.showToast(ret.errmsg);
                    // }
                }

                handler = null;
            }
            else if (xhr.readyState === 4) {
                if (data.hasRetried) {
                    return;
                }

                cc.log('other readystate == 4' + ', status:' + xhr.status);
                setTimeout(function () {
                    retryFunc();
                }, 5000);
            }
            else {
                cc.log('other readystate:' + xhr.readyState + ', status:' + xhr.status);
            }
        };

        try {
            xhr.send();
        }
        catch (e) {
            //setTimeout(retryFunc, 200);
            retryFunc();
        }

        return xhr;
    }

    static post(path:string,data:any,handler:ICallBack,extraUrl?:string){
        let xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000
        if(!extraUrl){
            extraUrl = Http.baseUrl;
        }
        //解析请求路由以及格式化请求参数
        let sendPath = path;
            //组装完整的URL
        let requestURL = extraUrl + sendPath ;

        //发送请求
        cc.log("RequestURL:" + requestURL);
        // cc.log("sendtext:" + sendtext);
        xhr.open("POST", requestURL, true);

        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
            // xhr.setRequestHeader("Content-type","text/html;charset=UTF-8");
        }
        // else{
            // xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.setRequestHeader("Content-type","application/json");
        // }
        
        let timer = setTimeout(function() {
            xhr.abort();
            cc.log('http timeout');
            retryFunc();
        }, 5000);

        let retryFunc = function() {
            data.hasRetried = true;
            Http.post(path, data, handler, extraUrl);
        };

        xhr.onreadystatechange = function () {
            cc.log("onreadystatechange");
            clearTimeout(timer);
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                // console.log("http res(" + xhr.responseText.length + "):" + xhr.responseText);        
                let respText = xhr.responseText;
                let ret = null;
                try {
                    ret = JSON.parse(respText);
                } catch (e) {
                    console.log("err:" + e);
                    ret = {
                        errcode: -10001,
                        errmsg: e
                    };
                }
                cc.log("request from [" + xhr.responseURL + "] data [", ret, "]");
                if (handler) {
                    handler(ret);
                    // if (ret.errcode != 0 && ret.errmsg) {
                    //     cc.vv.utils.showToast(ret.errmsg);
                    // }
                }

                handler = null;
            }
            else if (xhr.readyState === 4) {
                if (data.hasRetried) {
                    return;
                }

                cc.log('other readystate == 4' + ', status:' + xhr.status);
                setTimeout(function () {
                    retryFunc();
                }, 5000);
            }
            else {
                cc.log('other readystate:' + xhr.readyState + ', status:' + xhr.status);
            }
        };

        try {
            xhr.send(JSON.stringify(data));
        }
        catch (e) {
            //setTimeout(retryFunc, 200);
            retryFunc();
        }

        return xhr;
    }

    static getAsync(path:string,data:any,extraUrl?:string):Promise<any>{
        return new Promise((res, rej) => {

            try {
                var xhr = cc.loader.getXMLHttpRequest();
                xhr.timeout = 5000;

                if (!extraUrl) {
                    extraUrl = Http.baseUrl;
                }
                let sendPath = path;
                let sendText = "?";
                for (let k in data) {
                    if (sendText != "?") {
                        sendText += "&"
                    }
                    sendText += (k + "=" + data[k])
                }
                //组装完整的URL
                let requestURL = extraUrl + sendPath + encodeURI(sendText);
                // xhr.responseType = "json"
                xhr.open("GET", requestURL, true)
                xhr.setRequestHeader("Content-Type", "application/json")
                xhr.onerror = () => { throw new Error("xhr-on-error") }
                xhr.ontimeout = () => { throw new Error("xhr-on-timeout") }
                xhr.onreadystatechange = () => {
                    if (xhr.readyState != 4) {
                        return;
                    }
                    if (xhr.status >= 200 && xhr.status < 400) {
                        return res(JSON.parse(xhr.response))
                    } else {
                        // rej();
                        rej(new Error("xhr-status-not-200-400"));
                    }
                }
                xhr.send()
            } catch (error) {
                return rej(error);
            }


        })
    }

    static postAsync(path:string,data:any,extraUrl?:string):Promise<any>{
        return new Promise((res, rej) => {

            try {
                var xhr = cc.loader.getXMLHttpRequest();
                xhr.timeout = 5000;

                if (!extraUrl) {
                    extraUrl = Http.baseUrl;
                }
                let sendPath = path;
                //组装完整的URL
                let requestURL = extraUrl + sendPath;
                // xhr.responseType = "json"
                xhr.open("POST", requestURL, true)
                xhr.setRequestHeader("Content-Type", "application/json")
                xhr.onerror = () => { throw new Error("xhr-on-error") }
                xhr.ontimeout = () => { throw new Error("xhr-on-timeout") }
                xhr.onreadystatechange = () => {
                    if (xhr.readyState != 4) {
                        return;
                    }
                    if (xhr.status >= 200 && xhr.status < 400) {
                        return res(JSON.parse(xhr.response))
                    } else {
                        // rej();
                        rej(new Error("xhr-status-not-200-400"));
                    }
                }
                xhr.send(JSON.stringify(data))
            } catch (error) {
                return rej(error);
            }


        })
    }  
}
