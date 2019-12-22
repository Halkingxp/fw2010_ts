const {ccclass, property} = cc._decorator;

import {BaseUIPanel,CanvasNodeName} from "./BaseUIPanel"
import Tools from "../Common/Tools"


/** panel-instance,panel实例 */
interface PanelInstance {
    layer?: keyof typeof CanvasNodeName;
    // 静态部分
    prefab?: cc.Prefab;         // prefab
    isCheck?: boolean;         // 是否通过check
    // 数据部分
    state?: "open" | "close";   // 当前的数据状态
    paramsOpen?: object;       // 打开参数
    paramsClose?: object;      // 关闭参数
    z_index?: number;           // open时设定的node-z-index
    // 实例部分
    node?: cc.Node;             // 实例节点
}

type BaseUIPanelType = typeof BaseUIPanel;

// @ccclass
export default class UIManager extends cc.Component{
    
    static ins:UIManager = null;
    /** panel-实例的map结构存储;包括prefab,node,cmd */
    private mPanelMap: Map<string, PanelInstance> = new Map()

    @property(cc.Canvas)
    mCanvas:cc.Canvas = null;

    @property(cc.Node)
    mNormalNode:cc.Node = null;

    @property(cc.Node)
    mFixedNode:cc.Node = null;
    
    @property(cc.Node)
    mPopupNode:cc.Node = null;
    
    @property(cc.Node)
    mTopNode:cc.Node = null;

    @property(cc.SpriteFrame)
    mSingleColor:cc.SpriteFrame = null;

    onSceneChanged(event){
        cc.log("onSceneChanged");
        this.mCanvas = cc.find("Canvas").getComponent(cc.Canvas);
        this.mNormalNode = this.mCanvas.node.getChildByName(CanvasNodeName.NodeNormal);
        this.mFixedNode = this.mCanvas.node.getChildByName(CanvasNodeName.NodeFixed);
        this.mPopupNode = this.mCanvas.node.getChildByName(CanvasNodeName.NodePopup);
        this.mTopNode = this.mCanvas.node.getChildByName(CanvasNodeName.NodeTop);
        this.clearCatch();
    }

    onLoad(){
        UIManager.ins = this;
        console.log("UImanager on load");
        //刷新节点信息
        cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH,this.onSceneChanged,this);
    }

    clearCatch(){
        this.mPanelMap.forEach((value,key)=>{
            value.node!.destroy();
        });
        this.mPanelMap.clear();
    }

    async openPanel<T extends BaseUIPanelType>(panel:T,param:any = {}){
        if(!this.mSingleColor){
             this.mSingleColor = await Tools.load_res("textures/singleTrans",cc.SpriteFrame);
        }

        let va = this.getPanel(panel);
        if(va && va.state === "open") {
            switch(panel.CONFIG.type){
                case "multi":
                    //此处有bug
                    break;
                case "cover":
                    if(va.node){
                        va.node.destroy();
                    }
                case "single":
                default:
                    cc.log("already opened the panel:",panel.CONFIG.path);
                    return;
            }
        }
        va.state = "open";
        va.paramsOpen = param;
        va.z_index = 0;
        va.prefab = va.prefab || await Tools.load_res(panel.CONFIG.path,cc.Prefab);
        if (!va.prefab) {
            cc.error(`@panel: panel-prefab不存在, name=${panel.name}, path=${panel.CONFIG.path}`)
            return
        }
        if (va.state != "open") {
            // 如果载入完prefab后state不为open,则跳过创建
            cc.warn(`@panel: panel-state已经为close, 表示还未打开即关闭, name=${panel.name}`)
            return
        }
        va.node = cc.instantiate(va.prefab);
        let com = va.node.getComponent(panel);
        if(!com){
            com = va.node.addComponent(panel);
        }
        console.log(com.mLayer);
        switch(com.mLayer){
            case "NodeFixed":
                va.node.setParent(this.mFixedNode);
            case "NodePopup":
                va.node.setParent(this.mPopupNode);
            case "NodeTop":
                va.node.setParent(this.mTopNode);
            case "NodeNormal":
            default:
                va.node.setParent(this.mNormalNode);
        }
        va.node.zIndex = va.z_index;
        va.node.active = true;

        com.onData(param);

        switch(panel.CONFIG.type){
            case "multi":
                await this.outUpMove(va.node);
                break;
            case "cover":
                break;
            default:
                await this.inScale(va.node);
        }
        
        if(com.mDelayDestroy > 0){
            this.scheduleOnce(()=>{
                this.closePanel(panel);
            },com.mDelayDestroy);
        }
    }

    /**
     * 关闭panel
     * @param panel 传入panel的类型
     * @param param
     */
    async closePanel<T extends BaseUIPanelType>(panel: T, param: any = {}) {
        let value = this.getPanel(panel)
        // 如果状态已经为close,则跳过本次删除
        if (value.state === "close") {
            cc.warn(`@panel: panel-state=close, 跳过本次关闭`)
            return
        }
        // 更改数据部分
        value.state = "close"
        value.paramsClose = param
        // 更改实例部分
        if (value.node) {
            let com = value.node.getComponent(panel);
            com && await value.node.getComponent(panel).onClose(value.paramsClose)
            value.node.destroy()
            value.node = null
        }
    }

    /**
     * 获取panel的instance,如果不存在,则初始化
     * @param panel 
     */
    getPanel(panel:BaseUIPanelType): PanelInstance {
        let key = panel.CONFIG.path
        let value = this.mPanelMap.get(key)
        if (!value) {
            value = {};
            // value.layer = panel.CONFIG.layer;
            this.mPanelMap.set(key, value)
        }
        if (!value.isCheck) {
            value.isCheck = this.checkPanel(panel)
        }
        return value
    }

    checkPanel(panel: typeof BaseUIPanel){
        // 判断是否配置了panel-config
        if (!panel.CONFIG) {
            cc.error(`@PanelPathConfig, panel-config不存在, name=${panel.name}`)
            return false
        }
        // 判断在编辑器模式下PATH是否包含name,仅在编辑器模式下;打包后会压缩代码,name会被丢弃
        if (CC_PREVIEW && !panel.CONFIG.path.includes(panel.name)) {
            cc.error(`@PanelPathConfig, panel-config-path错误, name=${panel.name}`)
        }
        return true
    }
    
    async inScale(node: cc.Node) {
        return new Promise(res => {
            node.scale = 0;
            // node.active = true
            node.runAction(cc.sequence(cc.scaleTo(0.2, 1).easing(cc.easeBackOut()),cc.callFunc(()=>{
                let size =cc.director.getWinSize();
                node.addComponent(cc.Sprite).spriteFrame = this.mSingleColor;
                node.setContentSize(size);
                // node.color = cc.color(40,40,40,50);
                res();
            })) );

        })
    }

    async outUpMove(node:cc.Node){

    }
}
