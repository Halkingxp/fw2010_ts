import Tools from "../Common/Tools";

const {ccclass, property} = cc._decorator;

export class MyPool{
    mPrefab:cc.Prefab = null;
    mPool:cc.NodePool = null;
    constructor(public path:string,public maxNum:number){

    }

    async createPool(){
        await this.loadPrefab();
        this.mPool = new cc.NodePool();
        for(let i = 0;i<this.maxNum;++i){
            let pre = cc.instantiate(this.mPrefab);
            this.mPool.put(pre);
        }
    }

    async loadPrefab(){
        this.mPrefab = await Tools.load_res(this.path,cc.Prefab);
    }

    getObject(){
        if(this.mPool.size() > 0){
            return this.mPool.get();
        }
        else{
            return cc.instantiate(this.mPrefab);
        }
    }

    pushObject(obj:cc.Node){
        this.mPool.put(obj)
    }

    clear(){
        this.mPool.clear();
    }

}

export default class PoolsManager extends cc.Component{
    static ins:PoolsManager = null;
    mPools:Map<string,MyPool> = new Map();

    onLoad(){
        PoolsManager.ins  = this;
    }

    async addPool(path:string,maxNum:number){
        if(this.mPools.has(path)){
            throw new Error("already has the pool:" + path);
        }
        let p = new MyPool(path,maxNum);
        await p.createPool();
        this.mPools.set(path,p);

    }

    getPool(path:string):MyPool{
        return this.mPools.get(path);
    }

    getObjectFromPool(path:string):cc.Node{
        return this.mPools.get(path).getObject();
    }

    pushObjectToPool(path:string,obj:cc.Node):void{
        this.mPools.get(path).pushObject(obj);
    }

    clearPool(path:string){
        this.mPools.get(path).clear();
    }

    clearAllPools(){
        this.mPools.forEach((va,ke)=>{
            va.clear();
        })
        this.mPools.clear();
    }
}
