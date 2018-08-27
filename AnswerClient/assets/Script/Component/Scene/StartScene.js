let Game = require('../../Game');
cc.Class({
    extends: cc.Component,

    properties: {
        goldLabel: { default: null, type: cc.Label },
        playButton: { default: null, type: cc.Button },
        targetCanvas: { default: null, type: cc.Canvas },
        taskInfoViewPrefab: { default: null, type: cc.Prefab },
        playerInfoViewPrefab: { default: null, type: cc.Prefab },
        rankInfoViewPrefab: { default: null, type: cc.Prefab },
        rechargePrefab: { default: null, type: cc.Prefab },
        faceSprite: { default: null, type: cc.Sprite },
        nameLabel: { default: null, type: cc.Label },
        shareButton: { default: null, type: cc.Button },
        shareColdDownLabel: { default: null, type: cc.Label },

        timeout: { default: null }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Game.Tools.AutoFit(this.targetCanvas);
        Game.NetWorkController.AddListener('msg.GW2C_JoinOk', this, this.onGW2C_JoinOk);
        Game.NotificationController.On(Game.Define.EVENT_KEY.USERINFO_UPDATEYUANBAO, this, this.onUpdateCostCurrency);
        Game.NotificationController.On(Game.Define.EVENT_KEY.USERINFO_UPDATECOINS, this, this.onUpdateCostCurrency);
        Game.NotificationController.On(Game.Define.EVENT_KEY.USERINFO_UPDATEUSER, this, this.onUpdateUserInfo);
        this.onUpdateUserInfo();
    },

    start() {
        Game.AudioController.StopAllEffect();
        Game.AudioController.SetMusicVolume(1);
        Game.AudioController.PlayMusic('Audio/hall');
        this.onUpdateCostCurrency();
    },

    update(dt) {
        this._updateShareButton();
    },

    onDestroy() {
        Game.NetWorkController.RemoveListener('msg.GW2C_JoinOk', this, this.onGW2C_JoinOk);
        Game.NotificationController.Off(Game.Define.EVENT_KEY.USERINFO_UPDATEYUANBAO, this, this.onUpdateCostCurrency);
        Game.NotificationController.Off(Game.Define.EVENT_KEY.USERINFO_UPDATECOINS, this, this.onUpdateCostCurrency);
        Game.NotificationController.Off(Game.Define.EVENT_KEY.USERINFO_UPDATEUSER, this, this.onUpdateUserInfo);
        if (this.timeout != null) {
            clearTimeout(this.timeout);
        }
    },
    onUpdateCostCurrency() {
        this.goldLabel.string = Game.UserModel.GetCostCurrency();
    },
    onStartGame(event) {
        Game.RoomModel.RestartGame();
        Game.GameController.RestartGame();
        if (Game.UserModel.GetCostCurrency() < 1000) {
            //货币不足咯
            Game.NotificationController.Emit(Game.Define.EVENT_KEY.TIP_TIPS, { text: '<color=#ffffff>您的货币不足，请先去充值</color>' });
        } else {
            Game.UserModel.GetTvToken(function (token) {
                Game.NetWorkController.Send('msg.C2GW_JoinGame', { type: 1, token: token });
            }.bind(this))
            this.playButton.interactable = false;
            this.timeout = setTimeout(function () {
                this.playButton.interactable = true;
                this.timeout = null;
            }.bind(this), 1000);
        }
    },
    onRecharge(event) {
        // if (cc.sys.os == cc.sys.OS_IOS) {
        //     Game.NotificationController.Emit(Game.Define.EVENT_KEY.TIP_NOTIFY, 'iOS暂未开放充值');
        // } else if (cc.sys.os == cc.sys.OS_ANDROID) {
        //     //调起支付
        //     // Game.Platform.RequestPay();
        //     // Game.NetWorkController.Send('msg.C2GW_PlatformRechargeDone', {});
        //     let node = cc.instantiate(this.rechargePrefab);
        //     this.node.addChild(node);
        // } else {
        Game.NotificationController.Emit(Game.Define.EVENT_KEY.TIP_NOTIFY, '暂未开放充值');
        // }
    },
    onOpenTaskInfoView() {
        let node = cc.instantiate(this.taskInfoViewPrefab);
        this.node.addChild(node);
        let taskInfoView = node.getComponent('TaskInfoView');
        taskInfoView.Init(this.onStartGame.bind(this));
    },
    onOpenRankInfoView() {
        let node = cc.instantiate(this.rankInfoViewPrefab);
        this.node.addChild(node);
    },
    onOpenPlayerInfoView() {
        let node = cc.instantiate(this.playerInfoViewPrefab);
        this.node.addChild(node);
    },
    onOpenDrawInfoView() {
        Game.NotificationController.Emit(Game.Define.EVENT_KEY.TIP_TIPS, { text: '<color=#ffffff>暂未开放</color>' });
    },
    onShare() {
        Game.Platform.ShareMessage();
    },
    onGW2C_JoinOk() {
        //收到自己的消息了 进入游戏吧
        cc.director.loadScene("GameScene");
    },
    onUpdateUserInfo() {
        let faceurl = Game.UserModel.GetFaceUrl();
        console.log('StartScene onUpdateUserInfo');
        console.log(faceurl);
        let urlReg = new RegExp(Game.Define.Regex.url);
        if (urlReg.exec(faceurl)) {
            cc.loader.load({ url: faceurl, type: 'png' }, function (err, tex) {
                if (err) {
                    console.log('[严重错误] 加载资源失败 ' + err);
                } else {
                    this.faceSprite.spriteFrame = new cc.SpriteFrame(tex);
                }
            }.bind(this));
        };
        this.nameLabel.string = Game.UserModel.GetUserName();
    },

    _updateShareButton() {
        let lastTime = Math.max(0, Game.TaskModel.nextShareTime - Game.TimeController.GetCurTime());
        if (lastTime > 0) {
            //倒计时
            this.shareButton.interactable = false;
            this.shareColdDownLabel.string = Game.moment.unix(lastTime).format('mm:ss');
        } else {
            this.shareButton.interactable = true;
            this.shareColdDownLabel.string = '';
        }
    }
});
