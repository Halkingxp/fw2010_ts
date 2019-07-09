const { ccclass, property, menu } = cc._decorator;

import UIManager from "./Framework/UImanager";
import CommonPanel from "./Lobby/CommonPanel";
import AudioManager from "./Framework/AudioManager"

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
        }
    }
}   