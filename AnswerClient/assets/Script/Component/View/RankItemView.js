let Game = require('../../Game')
let viewCell = require('../tableView/viewCell')

const rankColor = [
    '#FF5657',
    '#FED058',
    '#92ACF7'
];
const commonRankColor = '#B286FF';

cc.Class({
    extends: viewCell,

    properties: {
        bgSpriteNode: { default: null, type: cc.Node },
        rankLabel: { default: null, type: cc.Label },
        headSprite: { default: null, type: cc.Sprite },
        nameLabel: { default: null, type: cc.Label },
        goldLabel: { default: null, type: cc.Label }
    },

    onLoad() {

    },
    start() {

    },
    init(index, data, reload, group) {
        let rankInfo = data[index + 1];
        this.bgSpriteNode.active = (index % 2 == 1);
        this.rankLabel.string = (rankInfo.rank) + '.';
        if (rankInfo.rank > rankColor.length) {
            this.rankLabel.node.color = cc.hexToColor(commonRankColor);
        } else {
            this.rankLabel.node.color = cc.hexToColor(rankColor[rankInfo.rank - 1]);
        }
        let urlReg = new RegExp(Game.Define.Regex.url);
        if (urlReg.exec(rankInfo.face)) {
            cc.loader.load({url: rankInfo.face, type: 'png'}, function (err, tex) {
                if (err) {
                    console.log('[严重错误] 加载资源失败 ' + err);
                } else {
                    this.headSprite.spriteFrame = new cc.SpriteFrame(tex);
                }
            }.bind(this));
        }
        this.nameLabel.string = rankInfo.name;
        this.goldLabel.string = rankInfo.score;
    }
});
