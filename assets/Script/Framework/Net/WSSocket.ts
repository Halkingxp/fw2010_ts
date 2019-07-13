import { ProtoManager } from "../ProtoBuffer/ProtoManager";
import { ProtoConst } from "../ProtoBuffer/ProtoConst";
import { Buffer } from "buffer";

type ProtoCallback = (pro:any)=>void;

export default class WSSocket{
    mIsConnect = false;
    mWs:WebSocket = null;
    mSendHeartBeat = true;
    mHandler:Map<ProtoConst,ProtoCallback[]> = new Map();

    mLastSendTime:number = null;
    mLastReceiveTime:number = null;

    mTimerSendHeartbeat:any= null;
    mTimerCheckNet:any= null;

    testCall:ProtoCallback = null;

    constructor(public mHostName:string){
        this.mLastSendTime = Date.now();
    }
    
    setHostName(hostname:string){
        this.mHostName = hostname;
    }

    startConnect(){
        if(this.mIsConnect || this.mWs){
            this.mWs.close();
        }

        this.mWs = new WebSocket(this.mHostName);
        this.mWs.binaryType = "arraybuffer";
        this.mWs.onmessage = this.onMessage.bind(this);
        this.mWs.onopen = this.onOpen.bind(this);
        this.mWs.onerror = this.onError.bind(this);
        this.mWs.onclose = this.onClose.bind(this);

    }

    addHandler(id:ProtoConst,callback:ProtoCallback){
        if(this.mHandler.has(id)){
            this.mHandler.get(id).push(callback);
        }
        else{
            this.mHandler.set(id,[callback]);
        }
    }

    removeHandler(id:ProtoConst,callback:ProtoCallback){
        if(id in this.mHandler){
            this.mHandler[id] = this.mHandler[id].filter(item=>{item != callback});
        }
    }

    clearHandler(id:ProtoConst){
        if(this.mHandler.has(id)){
            this.mHandler.delete(id);
        }
    }

    onMessage(event){
        console.log("onMessage:",event.data);
        console.log(typeof event.data)
        if(this.testCall){
            this.testCall(event.data);
        }
        // let unpackdata = ProtoManager.unpackage(Buffer.from(event.data));
        // // let c = ProtoManager.getPkModel(unpackdata.pkId);
        // // if(! c.verify(unpackdata.body)){
        // //     throw new Error("verify stream data error,pkid:" + unpackdata.pkId);
        // // }
        // // let decoded = c.decode(unpackdata.body);

        // if(unpackdata.pkId > 0 && this.mHandler.has(unpackdata.pkId)){
        //     for(let cb of this.mHandler[unpackdata.pkId]){
        //         cb(unpackdata);
        //     }
        // }

    }

    onError(event){
        console.log("receive error from the server:",this.mHostName);
    }

    onOpen(event){
        console.log("connected to the server:",this.mHostName);
        this.mIsConnect = true;
        if(this.mSendHeartBeat){
            this.startHearbeat();
        }
    }

    onClose(event){
        console.log("loss connect to the server:",this.mHostName);
        this.mIsConnect = false;

    }

    send(id:ProtoConst,message:any){
        let uint8barray = message.encode
        let buf = Buffer.alloc(10);
        this.mWs.send(buf);
    }

    startHearbeat(){
        this.clearHandler(ProtoConst.heartBeat);
        this.addHandler(ProtoConst.heartBeat,this.pong);

        if(this.mTimerSendHeartbeat){
            clearInterval(this.mTimerSendHeartbeat);
            this.mTimerSendHeartbeat = null;
        }

        this.mTimerSendHeartbeat = setInterval(()=>{
            if(this.mIsConnect){
                this.ping();
            }
        },5000);
        
        this.mTimerCheckNet = setInterval(()=>{
            if(this.mIsConnect){
                if(this.mLastReceiveTime - this.mLastSendTime > 10000){
                    console.log("网络超时。。。");
                    this.mWs.close();
                    this.mIsConnect = false;
                }
            }else{
                this.startConnect();
            }
        },5000);

    }

    pong(){
        this.mLastReceiveTime = Date.now();
        console.log("delay ms:",this.mLastReceiveTime - this.mLastSendTime);

    }

    ping(){
        if (this.mWs) {
            this.mLastSendTime = Date.now();
            // this.send(ProtoConst.heartBeat,null);
            this.mWs.send("ping" + this.mLastSendTime)
        }
    }
}
