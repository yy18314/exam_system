/**
 * Created by yuyou on 14/10/29.
 */
var loader = function(baseUrl){
    this.baseUrl = baseUrl || "";
    this.imageArr = [];
}
loader.prototype = {
    loadScript:function(src,callback) {
        var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
            script,options;
        var url = this.baseUrl + "js/" + src;
        script = document.createElement("script");
        script.async = false;
        script.type = "text/javascript";
        script.charset = "utf-8";
        url = url+( /\?/.test( url ) ? "&" : "?" )+ "_=" +(new Date()).getTime();
        script.src = url;
        head.insertBefore(script, head.firstChild);
        if(callback){
            document.addEventListener ? script.addEventListener("load", callback, false) : script.onreadystatechange = function() {
                if (/loaded|complete/.test(script.readyState)) {
                    script.onreadystatechange = null
                    callback()
                }
            }
        }
    },
    loadCSS:function(src,callback){

    },
    loadImage:function(src,callback){
        var image = new Image();
        var that = this;
        image.src = this.baseUrl + "js/" + src;
        image.addEventListener('load',function(e){
            callback.apply(this,arguments);
            that.imageArr.push({src:this.src,loaded:true});
        });
        image.addEventListener('error',function(e){
            //alert("图片资源不存在");
            callback.apply(this,arguments);
            that.imageArr.push({src:this.src,loaded:false});
        });
    },
    load:function(type,src,callback){
        switch(type){
            case "script":
                this.loadScript(src,callback);
                break;
            case "css":
                this.loadCSS(src,callback);
                break;
            case "image":
                this.loadImage(src,callback);
                break;
            default :break;
        }
    },
    loadSync:function(configs,percentage,next,index){
        index = index || 0;
        var config = configs[index];
        var that = this;
        this.load(config[0],config[1],function(){
            if(index < configs.length - 1){
                percentage(configs.length,index);
                that.loadSync(configs,percentage,next,index + 1);
            }else{
                next.apply(this,arguments);
            }
        });
    },
    loadAsync:function(configs,percentage,callback){
        var index = 0;
        for(var i = 0 ; i < configs.length ; i ++){
            var config = configs[i];
            this.load(config[0],config[1],function(){
                index ++;
                percentage(configs.length,index);
                if(index == configs.length){
                    callback.apply(this,arguments);
                }
            })
        }
    }
}