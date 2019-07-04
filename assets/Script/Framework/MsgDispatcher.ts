
export enum MsgEvents{
    TestEvent,

}

interface callFunc{
    (p1?:any):any
}


export class MsgDispatcher{
    static ins:MsgDispatcher = new MsgDispatcher();

    private eventCallList:Map<MsgEvents,callFunc[]>;

    constructor(){
        this.eventCallList = new Map();
    }

    addEvent(eventName:MsgEvents,func:callFunc){
        if(eventName in this.eventCallList){
            this.eventCallList[eventName].push(func);
        }
        else{
            this.eventCallList[eventName] = [func];
        }
    }

    removeEvent(eventName:MsgEvents,func:callFunc){
        if(eventName in this.eventCallList){
            this.eventCallList[eventName] = this.eventCallList[eventName].filter(item=>item != func);
        }
    }

    clearEvent(eventName:MsgEvents){
        this.eventCallList[eventName] = [];
    }

    dispatchEvent(eventName:MsgEvents,param = {}){
        if(eventName in this.eventCallList){
            for(let func of this.eventCallList[eventName]){
                func(param);
            } 
        }
        else{
            console.log("do not add the event:" + eventName);
        }
    }


}
