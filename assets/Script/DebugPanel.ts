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


@ccclass
@PanelPathConfig("DebugPanel")
export default class DebugPanel extends BaseUIPanel {


    @property(cc.RichText)
    mRichText = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        let ws = new WSSocket("ws://123.207.167.163:9010/ajaxchattest");
        ws.testCall = this.onmessage.bind(this);
        ws.startConnect();
        
    }

    onBtn1Clicked(){
        Test.do1(this.mRichText);
    }

    onmessage(s:string){
        this.mRichText.string =  this.mRichText.string + s;
    }

    closebtn(){
        this.node.destroy();
    }

    // update (dt) {}
}
