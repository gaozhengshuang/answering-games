let Game = require('../../Game')
let TaskItemView = require('./TaskItemView')
cc.Class({
    extends: cc.Component,

    properties: {
        taskItemViewPrefab: { default: null, type: cc.Prefab },
        taskItemViewParent: { default: null, type: cc.Node },
        startGameFunc: { default: null }
    },

    onLoad() {
        Game.NotificationController.On(Game.Define.EVENT_KEY.USERINFO_UPDATETASK, this, this.updateTaskInfo);
        Game.TaskModel.RequestTaskList();
    },

    onDestroy() {
        Game.NotificationController.Off(Game.Define.EVENT_KEY.USERINFO_UPDATETASK, this, this.updateTaskInfo);
    },

    onCloseSelf() {
        this.node.destroy();
    },
    Init(startGameFunc) {
        this.startGameFunc = startGameFunc;
    },
    updateTaskInfo() {
        Game.ResController.DestoryAllChildren(this.taskItemViewParent)
        for (let i = 0; i < Game.TaskModel.tasks.length; i++) {
            let taskInfo = Game.TaskModel.tasks[i];
            let node = cc.instantiate(this.taskItemViewPrefab);
            let taskItemView = node.getComponent(TaskItemView)
            taskItemView.Init(taskInfo, this.startGameFunc);
            this.taskItemViewParent.addChild(node);
        }
    }
});
