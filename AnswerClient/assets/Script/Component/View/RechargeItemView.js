let Game = require('../../Game')
cc.Class({
    extends: cc.Component,

    properties: {
        rechargeButton: { default: null, type: cc.Button },
        rechargeLabel: { default: null, type: cc.Label },
        goldLabel: { default: null, type: cc.Label },

        rechargeIndex: { default: 0, type: cc.Integer },
        rechargeInfo: { default: null },
        clickFunc: { default: null }
    },

    onLoad() {
    },

    onDestroy() {
    },

    onRechargeItemClick() {
        Game.Tools.InvokeCallback(this.clickFunc, this.rechargeIndex);
    },

    EnableButton() {
        this.rechargeButton.interactable = true;
    },
    DisableButton() {
        this.rechargeButton.interactable = false;
    },

    Init(index, rechargeInfo, clickFunc) {
        this.rechargeIndex = index;
        this.rechargeInfo = rechargeInfo;
        this.clickFunc = clickFunc;

        this.rechargeLabel.string = rechargeInfo.recharge + '元';
        this.goldLabel.string = rechargeInfo.gold + '金币';
    }
});
