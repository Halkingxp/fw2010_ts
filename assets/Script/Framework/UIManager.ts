const {ccclass, property} = cc._decorator;



@ccclass
export default class UIManager extends cc.Component{
    
    static ins:UIManager;

    onLoad(){
        UIManager.ins = this;
        console.log("UImanager on load");
        
    }
    
    
}