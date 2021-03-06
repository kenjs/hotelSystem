Ext.namespace("Neo");
Ext.namespace("Neo.frontdesk");

Neo.frontdesk.ReservCenter = Ext.extend(Ext.Panel,{
	layout:'border'
	,initComponent: function(){
		Ext.apply (this,{
			items:[
				{
					region:'center'
					//,xtype:'panel'
					//,collapsible:false
					,margins:'5 0 0 0'
					,layout:'fit'
					,items:[
						{
							xtype:'tabpanel'
							,border:false
							,activeTab:0
							,tabPosition:'top'
							//,autoHeight:true
							,layoutOnTabChange:true
							,defaults:{autoScroll: true}
							,items:[
								{
									xtype:'reservsummary'
									,id:'reservSummary'
								}
								,{
									xtype:'reservmanage'
									,id:'reservManage'
								}
							]
						}
					]
				},
				{
					xtype:'reservinfo'
					,id:'reservInfo'
					,region:'north'
					,height:260
					,title:'预定信息'
					,collapsible:true
					,collapseFirst: false
					,minSize: 50
		       		,maxSize: 260
		       		,split:true
				}
			]
		});
		Neo.frontdesk.ReservCenter.superclass.initComponent.apply(this,arguments);
		this.reservSummary=Ext.getCmp('reservSummary');
		this.reservSummary.on({'dbclickavailroom':this.onSelectRoom
			,scope:this});
		this.reservInfo=Ext.getCmp('reservInfo');
		this.reservInfo.on({'updateItem':this.onUpdateItem
			,scope:this});
		this.reservInfo.on({'reservIn':this.onReservIn
			,scope:this});
		this.reservManage=Ext.getCmp('reservManage');
		this.reservManage.on({'loadReservInfo':this.onLoadReservInfo
			,scope:this});
		this.reservManage.on({'alertReservInfo':this.onAlertReservInfo
			,scope:this});
		this.reservManage.on({'deleteReservInfo':this.onDeleteReservInfo
			,scope:this});
		this.addEvents({'reservIn':true});
	}
	,onRender:function(){
			Neo.frontdesk.ReservCenter.superclass.onRender.apply(this,arguments);
	}
	,onAlertReservInfo:function(){
		this.reservInfo.onAlertReservBtnClick();
	}
	,onDeleteReservInfo:function(){
		//重置
		this.reservInfo.onResetBtnClick();
	}
	,onLoadReservInfo:function(selOrderRecord){
		this.reservInfo.infoState='loadReserv';
		this.reservInfo.setFormItemsDisable(true);
		this.reservInfo.saveReservBtn.disable();
		this.reservInfo.alertReservBtn.enable();
		this.reservInfo.resetBtn.enable();
		this.reservInfo.reservInBtn.enable();
		this.reservInfo.loadReservInfo(selOrderRecord);
	}
	,onReservIn:function(reservOrderId){
		this.fireEvent('reservIn',reservOrderId);
	}
	,onSelectRoom:function(selRoomRecord){
		if(this.reservInfo.reservItemGrid.disabled==false)
			this.reservInfo.addReservItem(selRoomRecord);
	}
	,onUpdateItem:function(){
		this.reservSummary.updateAvailRooms();
		this.reservManage.updateAvailItem();
	}
});
Ext.reg('reservcenter',Neo.frontdesk.ReservCenter);
