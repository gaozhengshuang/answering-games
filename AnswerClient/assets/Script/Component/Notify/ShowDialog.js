let Game = require('../../Game');

cc.Class({
    extends: cc.Component,

    properties: {
        tipParentNode: { default: null, type: cc.Node },
        notifyPrefab: { default: null, type: cc.Prefab },
        commonNotifyPrefab: { default: null, type: cc.Prefab }
    },

    onLoad() {
        cc.game.addPersistRootNode(this.node);
    },

    start() {
        Game.NotificationController.On(Game.Define.EVENT_KEY.TIP_TIPS, this, this.onShowTips);
        Game.NotificationController.On(Game.Define.EVENT_KEY.TIP_NOTIFY, this, this.onShowNotify);
        Game.NotificationController.On(Game.Define.EVENT_KEY.TIP_REWARD, this, this.onShowReward);
    },

    update(dt) {
    },

    //漂浮提示代码--------------------------------------start-----------------------------------
    onShowTips(data) {
        if (this.notifyPrefab) {
            let toast = cc.instantiate(this.notifyPrefab);
            toast.x = 0;
            toast.y = 190;
            toast.parent = this.tipParentNode;
            let toastView = toast.getComponent('NotifyView');
            toastView.flap(data.text, data.alive || 3, data.delay || 0.1);
        }
    },
    //漂浮提示代码--------------------------------------end-------------------------------------

    onShowNotify(info) {
        if (this.commonNotifyPrefab) {
            let node = cc.instantiate(this.commonNotifyPrefab);
            cc.director.getScene().getChildByName('Canvas').addChild(node);
            let commonNotifyView = node.getComponent('CommonNotifyView');
            commonNotifyView.init(info);
        }
    },

    onShowReward(info) {
        if (this.notifyPrefab) {
            let toast = cc.instantiate(this.notifyPrefab);
            toast.x = 0;
            toast.y = 90;
            toast.parent = this.tipParentNode;
            let toastView = toast.getComponent('NotifyView');
            toastView.flyReward(info);
        }
    }
});
