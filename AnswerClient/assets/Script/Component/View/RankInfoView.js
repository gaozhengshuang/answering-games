let Game = require('../../Game')
let RankItemView = require('./RankItemView');
let TableView = require('../tableView/tableView')
cc.Class({
    extends: cc.Component,

    properties: {
        myRankItemView: { default: null, type: RankItemView },
        tableView: { default: null, type: TableView },

        rankInfos: { default: null },
        startRank: { default: 0, type: cc.Integer },
        myRank: { default: 0, type: cc.Integer },
        myScore: { default: 0, type: cc.Integer },
        loadComplete: { default: false }
    },

    onLoad() {
        this.rankInfos = {};
        Game.NetWorkController.AddListener('msg.GW2C_RetSort', this, this.onGW2C_RetSort);
        Game.NetWorkController.Send('msg.C2GW_ReqSort', { type: 0, start: this.startRank, end: this.startRank + 20 })
    },

    onDestroy() {
        Game.NetWorkController.RemoveListener('msg.GW2C_RetSort', this, this.onGW2C_RetSort);
    },

    onCloseSelf() {
        this.node.destroy();
    },
    onGW2C_RetSort(msgid, data) {
        this.myRank = data.myrank;
        this.myScore = data.myscore;

        this.myRankItemView.init(0, {
            1: {
                name: Game.UserModel.GetUserName(),
                face: Game.UserModel.GetFaceUrl(),
                score: this.myScore,
                rank: this.myRank + 1
            }
        });
        console.log(data);
        if (data.list != null) {
            if (data.list < 20) {
                this.loadComplete = true;
            }
            for (let i = 0; i < data.list.length; i++) {
                let rankInfo = data.list[i];
                this.rankInfos[rankInfo.rank] = rankInfo;
            }
            this.startRank = Game._.keys(this.rankInfos).length;
            if (this.startRank >= 100) {
                this.loadComplete = true;
            }
            this.tableView.initTableView(Game._.keys(this.rankInfos).length, this.rankInfos)
        } else {
            this.loadComplete = true;
        }
    }
});
