
export enum MsgEvents{
    TestEvent,

}

export class CallFunc{
    constructor(public callArg:Function,public thisArg:any){

    }

    notify(...arg:any[]):void{
        if(this.thisArg){
            this.callArg.call(this.thisArg,...arg);
        }else{
            this.callArg(...arg);
        }
        
    }

    compare(callArg:Function,context:any){
        return this.thisArg === context && this.callArg == callArg;
    }

}


export class MsgDispatcher{
    static ins:MsgDispatcher = new MsgDispatcher();

    private eventCallList:Map<MsgEvents,CallFunc[]>;

    constructor(){
        this.eventCallList = new Map();
    }

    addEvent(eventName:MsgEvents,func:Function,thisArg:any = null){
        if(eventName in this.eventCallList){
            this.eventCallList[eventName].push(new CallFunc(func,thisArg));
        }
        else{
            this.eventCallList[eventName] = [new CallFunc(func,thisArg)];
        }
    }

    removeEvent(eventName:MsgEvents,func:Function,thisArg:any){
        if(eventName in this.eventCallList){
            this.eventCallList[eventName] = this.eventCallList[eventName].filter(item=>!item.compare(func,thisArg) );
        }
    }

    clearEvent(eventName:MsgEvents){
        this.eventCallList[eventName] = [];
    }

    dispatchEvent(eventName:MsgEvents,...arg:any[]){
        if(eventName in this.eventCallList){
            for(let func of this.eventCallList[eventName]){
                func.notify(...arg);
            } 
        }
        else{
            console.log("do not add the event:" + eventName);
        }
    }


}
