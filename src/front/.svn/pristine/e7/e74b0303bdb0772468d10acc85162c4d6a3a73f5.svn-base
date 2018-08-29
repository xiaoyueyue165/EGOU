(function (window){  //传入window，提高变量的查找效率
    function mobileEvent(selector){  //这个函数就是对外提供的接口。
        //调用这个函数的原型对象上的_init方法，并返回
        return mobileEvent.prototype._init(selector);
    }
    mobileEvent.prototype = {
        /*初始化方法，获取当前query对象的方法*/
        _init: function (selector){
            if (typeof selector == "string"){
                //把查找到的元素存入到这个原型对象上。
                this.ele = window.document.querySelector(selector);
                //返回值其实就是原型对象。
                return this;
            }
        },
        /*单击事件：
         * 为了规避click的300ms的延迟，自定义一个单击事件
         * 触发时间：
         *   当抬起手指的时候触发
         *   需要判断手指落下和手指抬起的事件间隔，如果小于500ms表示单击时间。
         *
         *   如果是大于等于500ms，算是长按时间
         * */
        tap: function (handler){
            this.ele.addEventListener("touchstart", touchFn);
            this.ele.addEventListener("touchend", touchFn);

            var startTime,
                endTime;

            function touchFn(e){
                e.preventDefault()
                switch (e.type){
                    case "touchstart":
                        startTime = new Date().getTime();
                        break;
                    case "touchend":
                        endTime = new Date().getTime();
                        if (endTime - startTime < 500){
                            handler.call(this, e);
                        }
                        break;
                }
            }
        }

       

     
    }
    window.$ = window.mobileEvent = mobileEvent;
})(window);