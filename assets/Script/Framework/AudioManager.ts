
const {ccclass, property} = cc._decorator;
import Tools from "../Common/Tools"


const bgmValume = "bgmVolume";
const sfxVolume = "sfxVolume";


@ccclass
export default class AudioManager extends cc.Component{
    static ins:AudioManager;
    bgmVolume:number = 0.5;
    sfxVolume:number = 0.5;
    bgmAudioID = 0;

    onLoad(){
        AudioManager.ins = this;
    }

    start(){
        let t = cc.sys.localStorage.getItem(bgmValume);
        if(t != null){
            this.bgmVolume = parseFloat(t);
        }
        t = cc.sys.localStorage.getItem(sfxVolume);
        if(t != null){
            this.sfxVolume = parseFloat(t);
        }
        cc.audioEngine.setMusicVolume(this.bgmVolume);
        cc.audioEngine.setEffectsVolume(this.sfxVolume);

        cc.game.on(cc.game.EVENT_HIDE, function () {
            cc.log("cc.audioEngine.pauseAll");
            cc.audioEngine.pauseAll();
        });
        cc.game.on(cc.game.EVENT_SHOW, function () {
            cc.log("cc.audioEngine.resumeAll");
            cc.audioEngine.resumeAll();
        });
    }

    async playBGM(url:string){
        
        if(this.bgmAudioID >= 0){
            cc.audioEngine.stop(this.bgmAudioID);
        }
        let audioClip = await Tools.load_res(url,cc.AudioClip);
        this.bgmAudioID = cc.audioEngine.play(audioClip,true,this.bgmVolume);
    }
    
    async playSFX(url:string){
        let audioClip = await Tools.load_res(url,cc.AudioClip);
        if(this.sfxVolume > 0){
            var audioId = cc.audioEngine.play(audioClip,false,this.sfxVolume);    
        }
    }
    
    setSFXVolume(v:number){
        if(this.sfxVolume != v){
            cc.sys.localStorage.setItem(sfxVolume,v);
            this.sfxVolume = v;
        }
    }
    
    getSFXVolume(){
        return this.sfxVolume;
    }

    getBGMVolume(){
        return this.bgmVolume;
    }

    setBGMVolume(v,force){
        if(this.bgmAudioID >= 0){
            if(v > 0){
                cc.audioEngine.resume(this.bgmAudioID);
            }
            else{
                cc.audioEngine.pause(this.bgmAudioID);
            }
            //cc.audioEngine.setVolume(this.bgmAudioID,this.bgmVolume);
        }
        if(this.bgmVolume != v || force){
            cc.sys.localStorage.setItem(bgmValume,v);
            this.bgmVolume = v;
            cc.audioEngine.setVolume(this.bgmAudioID,v);
        }
    }
    
    pauseAll(){
        cc.audioEngine.pauseAll();
    }
    
    resumeAll(){
        cc.audioEngine.resumeAll();
    }
}
