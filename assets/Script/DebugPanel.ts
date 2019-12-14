// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property, menu } = cc._decorator;

import {PanelPathConfig,BaseUIPanel} from "./Framework/BaseUIPanel";
import Test from "./Framework/ProtoBuffer/Test";
import WSSocket from "./Framework/Net/WSSocket";
import UIManager from "./Framework/UImanager";

// import axios from './Framework/Net/axios.min.js';

@ccclass
@PanelPathConfig("DebugPanel")
export default class DebugPanel extends BaseUIPanel {


    @property(cc.RichText)
    mRichText = null;
    ws : WSSocket;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.ws = new WSSocket("ws://123.207.167.163:9010/ajaxchattest");
        this.ws.testCall = this.onmessage.bind(this);
        this.ws.startConnect();
        // axios.get("https://jsonplaceholder.typicode.com/todos/1").then((response,)=>{
        //     console.log(response);
        //     this.mRichText.string =  this.mRichText.string + JSON.stringify(response.data) ;
        // }).catch((err)=>{
        //     console.log(err);
        // });
    }

    onBtn1Clicked(){
        Test.do1(this.mRichText);
    }

    onmessage(s:string){
        this.mRichText.string =  this.mRichText.string + s;
    }

    closebtn(){
        this.ws.closeConnect();
        this.node.destroy();
    }

    // update (dt) {}
}
