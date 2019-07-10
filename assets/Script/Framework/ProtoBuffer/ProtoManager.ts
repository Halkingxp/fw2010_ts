import { ProtoConst } from "./ProtoConst";

export interface IMessage{
    pkId?:number;
    pkLength?:number;
    body?:Buffer;
}

export class ProtoManager{
    static mHeadLength = 8;
    static mBufCatch:Buffer = null;
    static mIndex = 0;
    constructor(){

    }

    static init(){
        ProtoManager.mBufCatch = Buffer.alloc(4096);
    }
    static package(pkId:ProtoConst,body:Uint8Array):Buffer{
        let headBuf = Buffer.alloc(ProtoManager.mHeadLength);
        // let jsonStr = JSON.stringify(json);
        let bodyBuf = Buffer.from(body);
        //超过一字节的大端写入
        headBuf.writeInt32BE(pkId, 0);
        headBuf.writeInt32BE(body.byteLength, 4);
        return Buffer.concat([headBuf, bodyBuf]);

    }

    static unpackage(buf:Buffer):IMessage{
        if(buf.length < 1){
            return
        }

        let data:IMessage = {};
        data.pkId = buf.readInt32BE(0);
        data.pkLength = buf.readInt32BE(4);
        if(data.pkLength + 8 != buf.length){
            throw new Error("receive error length!!");
        }
        data.body = buf.slice(8,data.pkLength);
        return data;
    }

    static unpackage2(buf:Buffer){
        if(buf.length < 1){
            return
        }
        if(buf.length < 8){
            buf.copy(ProtoManager.mBufCatch,ProtoManager.mIndex,0,buf.length);
            ProtoManager.mIndex += buf.length;
            if(ProtoManager.mIndex < 8){
                return;
            }
        }
        let pkId = ProtoManager.mBufCatch.readInt32BE(0);
        let pkLength = ProtoManager.mBufCatch.readInt32BE(4);

        if( (pkLength + ProtoManager.mHeadLength) >  ProtoManager.mIndex){
            return;
        }
        let body = Buffer.alloc(pkLength);
        ProtoManager.mIndex -= pkLength;
        ProtoManager.mBufCatch.copy(body);
        ProtoManager.mBufCatch.copy(ProtoManager.mBufCatch,0,pkLength,ProtoManager.mIndex);

    }


}