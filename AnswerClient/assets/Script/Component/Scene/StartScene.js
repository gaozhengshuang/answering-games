let Game = require('../../Game');
cc.Class({
    extends: cc.Component,

    properties: {
        goldLabel: { default: null, type: cc.Label },
        playButtonSprite: { default: null, type: cc.Sprite },
        buttonSpriteFrames: { default: [], type: [cc.SpriteFrame] },
        rewardTipNodes: { default: [], type: [cc.Node] },
        playButton: { default: null, type: cc.Button },
        targetCanvas: { default: null, type: cc.Canvas },
        startButtonAnimation: { default: null, type: cc.Animation },
        bets: { default: 1 },
        timeout: { default: null }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Game.Tools.AutoFit(this.targetCanvas);
        Game.NetWorkController.AddListener('msg.GW2C_JoinOk', this, this.onGW2C_JoinOk);
        Game.NotificationController.On(Game.Define.EVENT_KEY.USERINFO_UPDATEYUANBAO, this, this.onUpdateCostCurrency);
        Game.NotificationController.On(Game.Define.EVENT_KEY.USERINFO_UPDATECOINS, this, this.onUpdateCostCurrency);
    },

    start() {
        Game.AudioController.StopAllEffect();
        Game.AudioController.SetMusicVolume(1);
        Game.AudioController.PlayMusic('Audio/hall');
        this.onUpdateCostCurrency();
    },

    update(dt) {

    },

    onDestroy() {
        Game.NetWorkController.RemoveListener('msg.GW2C_JoinOk', this, this.onGW2C_JoinOk);
        Game.NotificationController.Off(Game.Define.EVENT_KEY.USERINFO_UPDATEYUANBAO, this, this.onUpdateCostCurrency);
        Game.NotificationController.Off(Game.Define.EVENT_KEY.USERINFO_UPDATECOINS, this, this.onUpdateCostCurrency);
        if (this.timeout != null) {
            clearTimeout(this.timeout);
        }
    },
    onUpdateCostCurrency() {
        this.goldLabel.string = Game.UserModel.GetCostCurrency();
        if (Game.UserModel.GetCostCurrency() >= 1000) {
            this.startButtonAnimation.play('PlayButtonRed');
            this.bets = 1;
        } else {
            this.startButtonAnimation.play('PlayButtonYellow');
            this.bets = 0;
        }
        this._updatePlayButton();
    },
    onStartGame(event) {
        Game.RoomModel.RestartGame();
        Game.GameController.RestartGame();
        switch (this.bets) {
            case 0: {
                Game.GameController.bets = 100;
                break;
            }
            case 1: {
                Game.GameController.bets = 1000;
                break;
            }
            case 2: {
                Game.GameController.bets = 3000;
                break;
            }
            default:
                break;
        }
        if (Game.UserModel.GetCostCurrency() < Game.GameController.bets) {
            //货币不足咯
            Game.NotificationController.Emit(Game.Define.EVENT_KEY.TIP_TIPS, { text: '您的货币不足，请先去充值' });
        } else {
            Game.UserModel.GetTvToken(function (token) {
                Game.NetWorkController.Send('msg.C2GW_JoinGame', { type: this.bets, token: token });
            }.bind(this))
            this.playButton.interactable = false;
            this.timeout = setTimeout(function () {
                this.playButton.interactable = true;
                this.timeout = null;
            }.bind(this), 1000);
        }
    },
    onRecharge(event) {
        Game.Tools.InvokeCallback(window.OpenSystemRecharge);
    },
    onGW2C_JoinOk() {
        //收到自己的消息了 进入游戏吧
        cc.director.loadScene("GameScene");
    },
    _updatePlayButton() {
        this.playButtonSprite.spriteFrame = this.buttonSpriteFrames[this.bets];
        for (let i = 0; i < this.rewardTipNodes.length; i++) {
            this.rewardTipNodes[i].active = (i == this.bets);
        }
    }
});
