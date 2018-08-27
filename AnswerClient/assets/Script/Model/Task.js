let _ = require('lodash');
let Tools = require('../Util/Tools');
let Define = require('../Util/Define');
let NetWorkController = require('../Controller/NetWorkController');
let ConfigController = require('../Controller/ConfigController');
let NotificationController = require('../Controller/NotificationController');

var TaskModel = function () {
    this.taskConfig = {};
    this.tasks = [];
    this.nextShareTime = 0;
}

TaskModel.prototype.Init = function (cb) {
    let tasks = ConfigController.GetConfig('TTask');
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i]
        this.taskConfig[task.Id] = _.cloneDeep(task);
    }
    NetWorkController.AddListener('msg.GW2C_SendTaskList', this, this.onGW2C_SendTaskList);
    NetWorkController.AddListener('msg.GW2C_ShareTime', this, this.onGW2C_ShareTime);
    NetWorkController.AddListener('msg.GW2C_CmnRewardInfo', this, this.onGW2C_CmnRewardInfo);
    Tools.InvokeCallback(cb);
}

/**
 * 对外接口
 */
TaskModel.prototype.GetConfigById = function (id) {
    return this.taskConfig[id];
}

TaskModel.prototype.RequestTaskList = function () {
    NetWorkController.Send('msg.C2GW_ReqTaskList', {});
}
/**
 * 消息处理接口
 */
TaskModel.prototype.onGW2C_SendTaskList = function (msgid, data) {
    this.tasks = [];
    for (let i = 0; i < data.tasks.length; i++) {
        let taskInfo = _.cloneDeep(data.tasks[i]);
        taskInfo.config = this.GetConfigById(taskInfo.id)
        this.tasks.push(taskInfo)
    }
    this.tasks = _.sortBy(this.tasks, function (o) {
        let ret = o.state * 2;
        return ret == 0 ? 3 : ret;
    });
    NotificationController.Emit(Define.EVENT_KEY.USERINFO_UPDATETASK);
}
TaskModel.prototype.onGW2C_ShareTime = function (msgid, data) {
    this.nextShareTime = data.nexttime;
}
TaskModel.prototype.onGW2C_CmnRewardInfo = function (msgid, data) {
    for (let i = 0; i < data.list.length; i++) {
        let info = data.list[i];
        setTimeout(function () {
            NotificationController.Emit(Define.EVENT_KEY.TIP_REWARD, '<img src="gold" click="bar"/><color=#ffffff> * ' + info.num + '</color>')
        }, 0.3 * i);
    }
}
module.exports = new TaskModel();