const { ccclass, property, menu } = cc._decorator;

import UIManager from "./Framework/UImanager";
import CommonPanel from "./Lobby/CommonPanel";
import AudioManager from "./Framework/AudioManager"
import { Http } from "./Framework/Net/Http";
import Test from "./Framework/ProtoBuffer/Test";
import { ProtoConst } from "./Framework/ProtoBuffer/ProtoConst";
import WSSocket from "./Framework/Net/WSSocket";

// import axios from 'axios';

export default class Debug extends cc.Component{
    onLoad(){

    }

    start(){
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event) {
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                UIManager.ins.openPanel(CommonPanel);
                AudioManager.ins.playClickEffect();
                break;
            case cc.macro.KEY.b:
                UIManager.ins.closePanel(CommonPanel);
                break;
            case cc.macro.KEY.c:
                Http.get("todos/1",{a:"a"},(va)=>{
                    cc.log(typeof va)
                    cc.log(va.title);
                })
                break;

            case cc.macro.KEY.d:
                Http.getAsync("todos/1", { a: "a" }).then((va)=>{
                    cc.log(typeof va)
                    cc.log(va.title);
                }).catch(()=>{
                    console.log("err");
                })
                break;
            
            case cc.macro.KEY.e:
                Test.do();
                console.log(ProtoConst.enterGameWorld.toString());
                let ws = new WSSocket("ws://121.40.165.18:8800");
                ws.startConnect();
                break;
            case cc.macro.KEY.f:
                // axios.get("https://jsonplaceholder.typicode.com/todos/1").then((response,)=>{
                //     console.log(response);
                // }).catch((err)=>{
                //     console.log(err);
                // });
                break;
        }
    }
}   
