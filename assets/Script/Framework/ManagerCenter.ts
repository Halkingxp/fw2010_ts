
const {ccclass, property} = cc._decorator;

import UIManager from "./UImanager"
import AudioManager from "./AudioManager"
import PoolsManager from "./PoolsManager";

type Com  = typeof cc.Component;

@ccclass
export default class ManagerCenter extends cc.Component{
    
    onLoad(){
        // cc.game.addPersistRootNode(this.node);
        // this.node.addComponent(UIManager);
        this.addManager(UIManager);
        // this.node.addComponent(AudioManager);
        this.addManager(AudioManager);
        this.addManager(PoolsManager);

    }

    start(){
        
    }
    
    addManager<T extends Com>(m:T){
        let com = this.node.getComponent(m);
        if(!com){
            this.node.addComponent(m);
        }
    }

    getManager<T extends Com>(m:T){
        let com = this.node.getComponent(m);
        return com;
    }
}
