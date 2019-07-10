
export default class WSSocket{
    mIsConnect = false;
    mWs:WebSocket = null;


    
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

    onMessage(event){
        
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
