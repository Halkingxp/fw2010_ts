// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import GlobeData from "./Common/GlobalData"
import {MsgEvents,MsgDispatcher} from "./Framework/MsgDispatcher"
import ManagerCenter from "./Framework/ManagerCenter"

import Debug from "./Debug"
import AudioManager from "./Framework/AudioManager";

@ccclass
export default class StartProject extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.String)
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //常驻进程
        cc.game.addPersistRootNode(this.node);
        this.node.addComponent(ManagerCenter);
        this.node.addComponent(Debug);
        
        if(cc.sys.isNative){
            //加载热更新界面

        }
    }

    start () {
        cc.vv = {};
        cc.vv.globe = {};
        cc.vv.globe.test = "aaaa";
        console.log(cc.vv.globe);
        console.log(GlobeData.AppName);

        MsgDispatcher.ins.addEvent(MsgEvents.TestEvent,(param)=>{
            console.log("111");
            console.log(param);
        });
        MsgDispatcher.ins.addEvent(MsgEvents.TestEvent,(param)=>{
            console.log("222");
            console.log(param);
        });


        let f = (param)=>{
            console.log("333");
            console.log(param);
        }
        AudioManager.ins.playBGM('sound/common/bg2');

    }

    // update (dt) {}
}
