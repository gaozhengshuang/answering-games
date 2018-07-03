// Generated by github.com/davyxu/tabtoy
// Version: 2.8.10

module table {
export var ProtoId : table.IProtoIdDefine[] = [
		{ Id : 1, Name : "msg.AccountInfo" 	},
		{ Id : 2, Name : "msg.AccountGateInfo" 	},
		{ Id : 3, Name : "msg.BattleUser" 	},
		{ Id : 4, Name : "msg.GridItem" 	},
		{ Id : 5, Name : "msg.BT_UploadGameUser" 	},
		{ Id : 6, Name : "msg.BT_ReqEnterRoom" 	},
		{ Id : 7, Name : "msg.BT_GameInit" 	},
		{ Id : 8, Name : "msg.BT_SendBattleUser" 	},
		{ Id : 9, Name : "msg.BT_GameStart" 	},
		{ Id : 10, Name : "msg.BT_GameEnd" 	},
		{ Id : 11, Name : "msg.BT_GameOver" 	},
		{ Id : 12, Name : "msg.BT_ReqQuitGameRoom" 	},
		{ Id : 13, Name : "msg.BT_PickItem" 	},
		{ Id : 14, Name : "msg.BT_UpdateMoney" 	},
		{ Id : 15, Name : "msg.C2GW_ReqLogin" 	},
		{ Id : 16, Name : "msg.GW2C_RetLogin" 	},
		{ Id : 17, Name : "msg.GW2C_SendUserInfo" 	},
		{ Id : 18, Name : "msg.GW2C_SendUserPlatformMoney" 	},
		{ Id : 19, Name : "msg.C2GW_HeartBeat" 	},
		{ Id : 20, Name : "msg.GW2C_HeartBeat" 	},
		{ Id : 21, Name : "msg.C2GW_ReqStartGame" 	},
		{ Id : 22, Name : "msg.GW2C_RetStartGame" 	},
		{ Id : 23, Name : "msg.GW2C_Ret7DayReward" 	},
		{ Id : 24, Name : "msg.C2GW_Get7DayReward" 	},
		{ Id : 25, Name : "msg.C2GW_SendWechatAuthCode" 	},
		{ Id : 26, Name : "msg.C2L_ReqLogin" 	},
		{ Id : 27, Name : "msg.L2C_RetLogin" 	},
		{ Id : 28, Name : "msg.C2L_ReqRegistAuthCode" 	},
		{ Id : 29, Name : "msg.C2L_ReqRegistAccount" 	},
		{ Id : 30, Name : "msg.L2C_RetRegistAccount" 	},
		{ Id : 31, Name : "msg.IpHost" 	},
		{ Id : 32, Name : "msg.PairNumItem" 	},
		{ Id : 33, Name : "msg.GW2L_ReqRegist" 	},
		{ Id : 34, Name : "msg.L2GW_RetRegist" 	},
		{ Id : 35, Name : "msg.GW2L_HeartBeat" 	},
		{ Id : 36, Name : "msg.L2GW_HeartBeat" 	},
		{ Id : 37, Name : "msg.L2GW_ReqRegistUser" 	},
		{ Id : 38, Name : "msg.GW2L_RegistUserRet" 	},
		{ Id : 39, Name : "msg.GW2MS_ReqRegist" 	},
		{ Id : 40, Name : "msg.MS2GW_RetRegist" 	},
		{ Id : 41, Name : "msg.GW2MS_HeartBeat" 	},
		{ Id : 42, Name : "msg.MS2GW_HeartBeat" 	},
		{ Id : 43, Name : "msg.GW2MS_ReqCreateRoom" 	},
		{ Id : 44, Name : "msg.MS2GW_RetCreateRoom" 	},
		{ Id : 45, Name : "msg.RS2GW_ReqRegist" 	},
		{ Id : 46, Name : "msg.GW2RS_RetRegist" 	},
		{ Id : 47, Name : "msg.GW2RS_UserDisconnect" 	},
		{ Id : 48, Name : "msg.RS2GW_RetUserDisconnect" 	},
		{ Id : 49, Name : "msg.C2GW_BuyItem" 	},
		{ Id : 50, Name : "msg.GW2C_AddPackageItem" 	},
		{ Id : 51, Name : "msg.GW2C_RemovePackageItem" 	},
		{ Id : 52, Name : "msg.GW2C_UpdateYuanbao" 	},
		{ Id : 53, Name : "msg.GW2C_UpdateCoupon" 	},
		{ Id : 54, Name : "msg.GW2C_UpdateFreeStep" 	},
		{ Id : 55, Name : "msg.DeliveryGoods" 	},
		{ Id : 56, Name : "msg.C2GW_ReqDeliveryGoods" 	},
		{ Id : 57, Name : "msg.C2GW_ReqDeliveryDiamond" 	},
		{ Id : 58, Name : "msg.GW2C_RetDeliveryDiamond" 	},
		{ Id : 59, Name : "msg.BigRewardItem" 	},
		{ Id : 60, Name : "msg.Sync_BigRewardPickNum" 	},
		{ Id : 61, Name : "msg.C2GW_UseBagItem" 	},
		{ Id : 62, Name : "msg.C2GW_SellBagItem" 	},
		{ Id : 63, Name : "msg.RS2MS_ReqRegist" 	},
		{ Id : 64, Name : "msg.MS2RS_RetRegist" 	},
		{ Id : 65, Name : "msg.RS2MS_HeartBeat" 	},
		{ Id : 66, Name : "msg.MS2RS_HeartBeat" 	},
		{ Id : 67, Name : "msg.GateSimpleInfo" 	},
		{ Id : 68, Name : "msg.MS2RS_GateInfo" 	},
		{ Id : 69, Name : "msg.MS2RS_CreateRoom" 	},
		{ Id : 70, Name : "msg.RS2MS_RetCreateRoom" 	},
		{ Id : 71, Name : "msg.RS2MS_DeleteRoom" 	},
		{ Id : 72, Name : "msg.RS2MS_UpdateRewardPool" 	},
		{ Id : 73, Name : "msg.GW2C_MsgNotify" 	},
		{ Id : 74, Name : "msg.GW2C_MsgNotice" 	},
		{ Id : 75, Name : "msg.GW2MS_MsgNotice" 	},
		{ Id : 76, Name : "msg.RS2MS_MsgNotice" 	},
		{ Id : 77, Name : "msg.MS2GW_MsgNotice" 	},
		{ Id : 78, Name : "msg.EntityBase" 	},
		{ Id : 79, Name : "msg.SimpleCounter" 	},
		{ Id : 80, Name : "msg.UserWechat" 	},
		{ Id : 81, Name : "msg.UserBase" 	},
		{ Id : 82, Name : "msg.UserAddress" 	},
		{ Id : 83, Name : "msg.ItemData" 	},
		{ Id : 84, Name : "msg.ItemBin" 	},
		{ Id : 85, Name : "msg.Serialize" 	},
		{ Id : 86, Name : "msg.MS2Server_BroadCast" 	},
		{ Id : 87, Name : "msg.C2GW_AddDeliveryAddress" 	},
		{ Id : 88, Name : "msg.C2GW_DelDeliveryAddress" 	},
		{ Id : 89, Name : "msg.C2GW_ChangeDeliveryAddress" 	},
		{ Id : 90, Name : "msg.GW2C_SendDeliveryAddressList" 	},
		{ Id : 91, Name : "msg.C2GW_ReqRechargeMoney" 	},
		{ Id : 92, Name : "msg.GW2C_RetRechargeMoney" 	},
		{ Id : 93, Name : "msg.C2GW_PlatformRechargeDone" 	},
		{ Id : 94, Name : "msg.GW2C_SendWechatInfo" 	}
	]


// Id
export var ProtoIdById : game.Dictionary<table.IProtoIdDefine> = {}
function readProtoIdById(){
  for(let rec of ProtoId) {
    ProtoIdById[rec.Id] = rec; 
  }
}
readProtoIdById();

// Name
export var ProtoIdByName : game.Dictionary<table.IProtoIdDefine> = {}
function readProtoIdByName(){
  for(let rec of ProtoId) {
    ProtoIdByName[rec.Name] = rec; 
  }
}
readProtoIdByName();
}

