cc.Class({
    extends: cc.Component,

    properties: {
        infoLabel: { default: null, type: cc.Label },
    },
    init(info) {
        this.infoLabel.string = info;
    },
    onOkClick() {
        this.node.destroy();
    }
});
