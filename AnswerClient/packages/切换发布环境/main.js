'use strict';
var process = require('child_process');

module.exports = {
    load() {
        // execute when package loaded
    },

    unload() {
        // execute when package unloaded
    },

    // register your ipc messages here
    messages: {
        'checkWechatTest'() {
            let sourcePath = __dirname + '\\WechatInner\\PlatformDefine.js';
            let targetFile = __dirname + '\\..\\..\\assets\\Script\\Util\\';
            let cmd = 'copy ' + sourcePath + ' ' + targetFile;
            process.exec(cmd, function (err, stdout, stderr) {
                if (err) {
                    Editor.log('++++++ Json 错误 ++++++' + stderr);
                } else {
                    Editor.log('++++++ 切换成功 ++++++');
                }
            });
        },
    },
};