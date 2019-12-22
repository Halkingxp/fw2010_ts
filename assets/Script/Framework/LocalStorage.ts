
export enum LocalKey{
    Test,
    Test1,
}

export  class LocalStorage{
    
    static getNumber(key:LocalKey):number{
        let v= cc.sys.localStorage.getItem(key.toString());
        return Number(v);
    }
    static setNumber(v:number,key:LocalKey){
        cc.sys.localStorage.setItem(key.toString(),v.toString());
    }
    static getString(key:LocalKey):string{
        let v= cc.sys.localStorage.getItem(key.toString());
        return v;
    }
    static setString(v:string,key:LocalKey){
        cc.sys.localStorage.setItem(key.toString(),v);
    }
    static getObject(key:LocalKey):object{
        let v= cc.sys.localStorage.getItem(key.toString());
        return JSON.parse(v) ;
    }
    static setObject(v:object,key:LocalKey){
        cc.sys.localStorage.setItem(key.toString(),JSON.stringify(v));
    }
    static clearItem(key:LocalKey){
        cc.sys.localStorage.removeItem(key.toString());
    }
}

