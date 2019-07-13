
const { ccclass, property, menu } = cc._decorator;

import {PanelPathConfig,BaseUIPanel} from "../Framework/BaseUIPanel";

@ccclass
@PanelPathConfig("common/CommonPanel")
export default class CommonPanel extends BaseUIPanel{
    mDelayDestroy = 2;
    onLoad(){
        console.log("CommonPanel onload");
        

    }
    
    
    start(){
        console.log("CommonPanel start");
    }


}

