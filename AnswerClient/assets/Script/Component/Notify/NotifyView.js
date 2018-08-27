
cc.Class({
    extends: cc.Component,

    properties: {
        infoLabel: { default: null, type: cc.RichText },
    },

    flap(info, alive, delay = 0) {
        this.infoLabel.string = info;
        this.node.runAction(cc.sequence([
            cc.hide(),
            cc.delayTime(delay == null ? 0.1 : delay),
            cc.show(),
            cc.spawn([
                cc.moveTo(alive, cc.p(this.node.x, this.node.y + 150)),
                cc.fadeTo(alive, 0),
            ]),
            cc.removeSelf()
        ]));
    },
    flyReward(info) {
        console.log(this.infoLabel.imageAtlas);
        this.infoLabel.string = info;
        this.node.scaleX = 0;
        this.node.scaleY = 0;
        this.node.runAction(cc.sequence([
            cc.spawn([
                cc.sequence([
                    cc.scaleTo(0.2, 1.2, 1.2),
                    cc.scaleTo(0.1, 0.9, 0.9),
                    cc.scaleTo(0.1, 1, 1),
                ]),
                cc.moveTo(0.4, cc.p(this.node.x, this.node.y + 50))
            ]),
            cc.spawn([
                cc.moveTo(0.6, cc.p(this.node.x, this.node.y + 150)).easing(cc.easeIn(2)),
                cc.fadeTo(0.6, 0),
            ]),
            cc.removeSelf()
        ]));
    }
});
