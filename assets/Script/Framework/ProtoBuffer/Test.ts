// import * as protobuf from "protobufjs"
import * as proto from "./proto"

export default class Test{
    constructor(){

    }
    
    static do(){
        let message = proto.awesomepackage.AwesomeMessage.create({awesomeField:"hello1"})
        message.awesomeField = "hello222";
        cc.log(JSON.stringify(message));

        let buffer = proto.awesomepackage.AwesomeMessage.encode(message).finish();
        console.log(`buffer = ${Array.prototype.toString.call(buffer)}`);
      
        let decoded = proto.awesomepackage.AwesomeMessage.decode(buffer);
        console.log(`decoded = ${JSON.stringify(decoded)}`);
    }

    static do1(rt:cc.RichText){
        let message = proto.awesomepackage.AwesomeMessage.create({awesomeField:"hello1"})
        
        rt.string =  rt.string.concat(JSON.stringify(message),"<br/>");

        let buffer = proto.awesomepackage.AwesomeMessage.encode(message).finish();
        
        // console.log(`buffer = ${Array.prototype.toString.call(buffer)}`);
      
        rt.string =  rt.string.concat(`buffer = ${Array.prototype.toString.call(buffer)}`,"<br/>");

        let decoded = proto.awesomepackage.AwesomeMessage.decode(buffer);
        // console.log(`decoded = ${JSON.stringify(decoded)}`);
        rt.string =  rt.string.concat(`decoded = ${JSON.stringify(decoded)}`,"<br/>");
    }
}
