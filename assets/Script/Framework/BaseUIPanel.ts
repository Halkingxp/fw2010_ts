
const {ccclass, property} = cc._decorator;


export const CanvasNodeName = {
    NodeNormal:"NodeNormal",
    NodeFixed:"NodeFixed",
    NodePopup:"NodePopup",
    NodeTop:"NodeTop",
}

/** 打开方式类型;single-不允许再次打开;cover-再次打开时覆盖; */
type TypeOpen = "single" | "cover";

type LayerType= keyof typeof  CanvasNodeName;

/** panel-config,panel配置 */
interface PanelConfig {
    path: string;       // 资源路径;同时也作为唯一key使用
    type: TypeOpen;     // 打开方式
    layer:LayerType;
}

/** 装饰器函数,panel配置参数;装饰器的设置会覆盖内部设置 */
export const PanelPathConfig = (path: string,layer?:LayerType,type?: TypeOpen) => {
    return (constructor: typeof BaseUIPanel) => {
        // 特别注意,由于js中原型继承的bug,这里的config必须创建新的object而不是修改
        constructor.CONFIG = {
            path: path || "",
            type: type || "single",
            layer:layer || "NodeNormal",
        }
        // 注意,冻结之后在严格模式下会报错,在非严格模式下会跳过;cocos脚本运行方式为严格模式
        Object.freeze(constructor.CONFIG)
    }
}

@ccclass
export class BaseUIPanel extends cc.Component{
    mData:any;



    /** panel的配置参数 */
    static CONFIG: PanelConfig;
    /** panel-open-process */
    async onOpen(param?: object) { };
    /** panel-close-process */
    async onClose(param?: object) { };

    onData(data):void{
        this.mData = data;
    };

    freezePanel(){
        this.node.active = false;
    }

    displayPanel(){
        this.node.active = true;
    }


    addButtonClickedEvent(){

    }

}



