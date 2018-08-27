let Game = require('../../Game')
let TaskItemView = require('./TaskItemView')
cc.Class({
    extends: cc.Component,

    properties: {
        nameLabel: { default: null, type: cc.Label },
        idLabel: { default: null, type: cc.Label },
        invitationLabel: { default: null, type: cc.Label },
        taskItemViewPrefab: { default: null, type: cc.Prefab },
    },

    onLoad() {
        Game.NotificationController.On(Game.Define.EVENT_KEY.USERINFO_UPDATETASK, this, this.updateTaskInfo);
        Game.TaskModel.RequestTaskList();
    },

    onDestroy() {
        Game.NotificationController.Off(Game.Define.EVENT_KEY.USERINFO_UPDATETASK, this, this.updateTaskInfo);
    },

    onCopyInvitation() {
        Game.Platform.CopyToClipboard({ data: this.invitationLabel.string })
    },
    onCloseSelf(){
        this.node.destroy();
    },
    updateTaskInfo() {
        Game.ResController.DestoryAllChildren(this.taskItemViewParent)
        for (let key in Game.TaskModel.tasks) {
            let taskInfo = Game.TaskModel.tasks[key];
            let node = cc.instantiate(this.taskItemViewPrefab);
            let taskItemView = node.getComponent(TaskItemView)
            taskItemView.Init(taskInfo);
        }
    }
});
