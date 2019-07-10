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


@ccclass
@PanelPathConfig("DebugPanel")
export default class DebugPanel extends BaseUIPanel {


    @property(cc.RichText)
    mRichText = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    onBtn1Clicked(){
        Test.do1(this.mRichText);
    }

    // update (dt) {}
}
