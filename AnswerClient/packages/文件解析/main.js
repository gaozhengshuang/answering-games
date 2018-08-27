'use strict';
var fs = require('fs');
var path = require('path');
var process = require('child_process');
var async = require('async');

module.exports = {
    load() {
        // execute when package loaded
    },

    unload() {
        // execute when package unloaded
    },

    // register your ipc messages here
    messages: {
        'genJson'() {
            // open entry panel registered in package.json
            Editor.log('开始生成JSON');
            async.waterfall([
                function (anext) {
                    let sourcePath1 = path.join(__dirname, '/../../../docs/tbl/proto_index.json');
                    let targetFile = path.join(__dirname, '/../../assets/resources/Json/');
                    let cmd = 'copy ' + sourcePath1 + ' ' + targetFile;
                    process.exec(cmd, function (err) {
                        anext(err)
                    });
                },
                function (anext) {
                    let sourcePath1 = path.join(__dirname, '/../../../docs/tbl/taskbase.json');
                    let targetFile = path.join(__dirname, '/../../assets/resources/Json/');
                    let cmd = 'copy ' + sourcePath1 + ' ' + targetFile;
                    process.exec(cmd, function (err) {
                        anext(err)
                    });
                }
            ], function (err) {
                if (err) {
                    Editor.log('++++++ Json 错误 ++++++' + err);
                } else {
                    Editor.log('生成成功');
                }
            })
        },
        'genProto'() {
            Editor.log('开始生成ProtoMsg');
            let sourcePath = __dirname + '\\..\\..\\..\\protocol\\*.proto';
            let targetFile = __dirname + '\\..\\..\\assets\\Script\\Util\\ProtoMsg.js';
            let cmd = 'pbjs -t static-module -w commonjs -o ' + targetFile + '  ' + sourcePath;
            process.exec(cmd, function (err, stdout, stderr) {
                if (err) {
                    Editor.log('++++++ 生成ProtoMsg 错误 ++++++' + err);
                } else {
                    Editor.log('生成成功');
                }
            });
        }
    },
};