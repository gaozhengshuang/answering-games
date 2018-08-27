let Game = require('../../Game');
let RechargeItemView = require('./RechargeItemView');

const RechargeInfos = [
    { recharge: 1, gold: 1000 },
    { recharge: 6, gold: 6000 },
    { recharge: 30, gold: 30000 },
    { recharge: 98, gold: 98000 },
    { recharge: 128, gold: 128000 },
    { recharge: 328, gold: 328000 },
]

cc.Class({
    extends: cc.Component,

    properties: {
        goldLabel: { default: null, type: cc.Label },
        rechargeItemViewPrefab: { default: null, type: cc.Prefab },
        rechargeItemViewParent: { default: null, type: cc.Node },

        rechargeIndex: { default: 0, type: cc.Integer },
        rechargeItemViews: { default: [], type: [RechargeItemView] },
    },

    onLoad() {
        Game.NotificationController.On(Game.Define.EVENT_KEY.USERINFO_UPDATEYUANBAO, this, this.onUpdateCostCurrency);
        Game.NotificationController.On(Game.Define.EVENT_KEY.USERINFO_UPDATECOINS, this, this.onUpdateCostCurrency);
    },

    start() {
        for (let i = 0; i < RechargeInfos.length; i++) {
            let info = RechargeInfos[i];
            let node = cc.instantiate(this.rechargeItemViewPrefab);
            let rechargeItemView = node.getComponent(RechargeItemView);
            rechargeItemView.Init(i, info, this.onRechargeItemClick.bind(this));
            this.rechargeItemViews.push(rechargeItemView);
            this.rechargeItemViewParent.addChild(node);
        }
        this.onRechargeItemClick(0);
        this.onUpdateCostCurrency();
    },

    update(dt) {
    },

    onDestroy() {
        Game.NotificationController.Off(Game.Define.EVENT_KEY.USERINFO_UPDATEYUANBAO, this, this.onUpdateCostCurrency);
        Game.NotificationController.Off(Game.Define.EVENT_KEY.USERINFO_UPDATECOINS, this, this.onUpdateCostCurrency);
    },
    onUpdateCostCurrency() {
        this.goldLabel.string = Game.UserModel.GetCostCurrency();
    },
    onCloseSelf() {
        this.node.destroy();
    },
    onRechargeClick() {
        let info = RechargeInfos[this.rechargeIndex];
        Game.Platform.RequestPay(info.recharge * 100);
        this.onCloseSelf();
    },

    onRechargeItemClick(index) {
        this.rechargeIndex = index;
        for (let i = 0; i < this.rechargeItemViews.length; i++) {
            let view = this.rechargeItemViews[i];
            if (i == index) {
                view.DisableButton();
            } else {
                view.EnableButton();
            }
        }
    }
});
