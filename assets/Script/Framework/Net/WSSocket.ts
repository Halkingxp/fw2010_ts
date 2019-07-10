import { ProtoManager } from "../ProtoBuffer/ProtoManager";
import { ProtoConst } from "../ProtoBuffer/ProtoConst";

type ProtoCallback = (pro:any)=>void;

export default class WSSocket{
    mIsConnect = false;
    mWs:WebSocket = null;

    mHandler:Map<keyof ProtoConst,ProtoCallback[]> = new Map();

    
    constructor(public mHostName:string){

    }
    
    setHostName(hostname:string){
        this.mHostName = hostname;
    }

    startConnect(){
        if(this.mIsConnect){
            this.mWs.close();
        }
        this.mWs = new WebSocket(this.mHostName);
        this.mWs.binaryType = "arraybuffer";
        this.mWs.onmessage = this.onMessage.bind(this);
        this.mWs.onopen = this.onOpen.bind(this);
        this.mWs.onerror = this.onError.bind(this);
        this.mWs.onclose = this.onClose.bind(this);

    }

    addHandler(id:keyof ProtoConst,callback:ProtoCallback){
        if(this.mHandler.has(id)){
            this.mHandler.get(id).push(callback);
        }
        else{
            this.mHandler.set(id,[callback]);
        }
    }

    removeHandler(id:keyof ProtoConst,callback:ProtoCallback){
        if(id in this.mHandler){
            this.mHandler[id] = this.mHandler[id].filter(item=>{item != callback});
        }
    }

    onMessage(event){
        let unpackdata = ProtoManager.unpackage(event.data);

    }

    onError(event){
        console.log("receive error from the server:",this.mHostName);
    }

    onOpen(event){
        console.log("connected to the server:",this.mHostName);
        this.mIsConnect = true;
    }

    onClose(event){
        console.log("loss connect to the server:",this.mHostName);
        this.mIsConnect = false;
    }

    send(){
        let buf = Buffer.alloc(10);
        this.mWs.send(buf);
    }
}
