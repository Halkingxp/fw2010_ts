// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { BaseUIPanel } from "../Framework/BaseUIPanel";
import UIManager from "../Framework/UImanager";
import CommonPanel from "./CommonPanel";
import HotUpdatePanel from "../HotUpdatePanel";

const {ccclass, property} = cc._decorator;


@ccclass
export default class Lobby extends BaseUIPanel {

    @property(cc.Button)
    mBtn: cc.Button = null;

    @property(cc.Label)
    mLabel: cc.Label = null;
    
    index = 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        let index = 0;
        this.schedule(()=>{
            ++index ;
            this.mLabel.string = ''  + index;
        },1)
    }
    
    onBtnClicked(){
        ++this.index;
        if(this.index % 2 == 1){
            UIManager.ins.openPanel(CommonPanel);
        }else{
            cc.director.loadScene('lobby',()=>{
                cc.director.emit(cc.Director.EVENT_AFTER_SCENE_LAUNCH);
            });
        }
        
    }

    onBtnDownloadClicked(){
        
        UIManager.ins.openPanel(HotUpdatePanel,"game_ddz");
        
    }

    // update (dt) {}
}
