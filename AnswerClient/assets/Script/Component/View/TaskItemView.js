let Game = require('../../Game')
cc.Class({
    extends: cc.Component,

    properties: {
        taskDescLabel: { default: null, type: cc.Label },
        rewardLabel: { default: null, type: cc.Label },
        stepLabel: { default: null, type: cc.Label },
        actionBgSpriteNode: { default: null, type: cc.Node },
        disableBgSpriteNode: { default: null, type: cc.Node },
        actionButtonNodes: { default: [], type: [cc.Node] },
        goButton: { default: null, type: cc.Button },
        rewardAnimaNode: { default: null, type: cc.Node },
        taskInfo: { default: null },
        startGameFunc: { default: null },
    },

    onLoad() {
    },

    onDestroy() {
    },

    onGetRewardClick() {
        if (this.taskInfo.state == 1) {
            //可以领取
            Game.NetWorkController.Send('msg.C2GW_GetTaskReward', { taskid: this.taskInfo.id });
        }
    },

    onGoClick() {
        if (this.taskInfo.config.MainTask == 1000) {
            //分享
            Game.Platform.ShareMessage();
        } else {
            //开始游戏
            Game.Tools.InvokeCallback(this.startGameFunc);
        }
    },

    Init(taskInfo, startGameFunc) {
        this.taskInfo = taskInfo
        this.startGameFunc = startGameFunc;
        this.taskDescLabel.string = taskInfo.config.Desc;
        let rewardInfoStrs = taskInfo.config.Reward.split('-');
        this.rewardLabel.string = (rewardInfoStrs[1] || '0');
        this.stepLabel.string = taskInfo.progress + '/' + taskInfo.config.Count;
        if (taskInfo.state == 2) {
            this.actionBgSpriteNode.active = false;
            this.disableBgSpriteNode.active = true;
        } else {
            this.actionBgSpriteNode.active = true;
            this.disableBgSpriteNode.active = false;
        }

        if (taskInfo.state == 1) {
            this.rewardAnimaNode.active = true;
        } else {
            this.rewardAnimaNode.active = false;
        }

        if (taskInfo.state == 0 && this.taskInfo.config.MainTask == 1000) {
            this.goButton.interactable = !(Game.TaskModel.nextShareTime > Game.TimeController.GetCurTime());
        } else {
            this.goButton.interactable = true;
        }

        for (let i = 0; i < this.actionButtonNodes.length; i++) {
            let actionNode = this.actionButtonNodes[i];
            if (actionNode) {
                actionNode.active = (i == taskInfo.state);
            }
        }
    }
});
