//tab start
var index = 0;
var onlyOpenTitle = "主页";

function addPanel(subtitle,url,icon){
	index++;
	if(!$('#tt').tabs('exists',subtitle)){
		$('#tt').tabs('add',{
			title: 'Tab'+index,
			content: createFrame('http://www.cnblogs.com'),
			closable: true,
			icon:''
		});	
	}else{
		$('#tt').tabs('select',subtitle);
		$('#mm-tabupdate').click();
	}
}
function removePanel(){
	var tab = $('#tt').tabs('getSelected');
	if (tab){
		var index = $('#tt').tabs('getTabIndex', tab);
		if(index!=0){
			$('#tt').tabs('close', index);
		}else{
			alert('主页不能关闭');
		}
	}
}


$(function(){
	tabClose();
	tabCloseEvent();
	$('#dlg').dialog('close');
})


function tabClose(){
	
    //双击关闭TAB选项卡
	$(document).on('dblclick','.tabs-inner',function(e){
        var subtitle = $(this).children(".tabs-closable").text();
        $('#tt').tabs('close', subtitle);
	})
	
    //为选项卡绑定事件 menu start
	$(document).on('contextmenu','.tabs-inner',function(e){
		e.preventDefault();
		$('#mm').menu('show', {
			left: e.pageX,
			top: e.pageY
		});
	})
}

//绑定右键菜单事件
function tabCloseEvent(){
	$("#mm").menu({
		onClick:function(item){
			closeTab(item.id);
		}
	});
}

function createFrame(url){
	var s = '<iframe scrolling="auto" frameborder="0" src="'+url+'" style="width:100%;height:775px;"></iframe>';
	return s;
}

function closeTab(action){
	var allTab=$('#tt').tabs('tabs');
	var lenTab=allTab.length;
	var currentTab=$('#tt').tabs('getSelected');
	var indexTab = $('#tt').tabs('getTabIndex', currentTab);
	var currentTitle=currentTab.panel('options').title;
	
	var allTabtitle=[];
	$.each(allTab,function(i,n){
		allTabtitle.push($(n).panel('options').title);
	})
	
	switch(action){
		case 'refresh':
			var iframe = $(currentTab.panel('options').content);
			var src = iframe.attr('src');
			$("#tt").tabs('update',{
				tab:currentTab,
				options:{
					content:createFrame(src)
				}
			});
			break;
		case 'closecurrent':
			$('#tt').tabs('close', indexTab);
			break;
		case 'closeall':
			$.each(allTabtitle,function(i,n){
				if(n!=onlyOpenTitle){					
					$("#tt").tabs('close',n);	
				}
			})
			break;
		case 'closeothers':
			$.each(allTabtitle,function(i,n){
				if(n!=onlyOpenTitle && n!=currentTitle){
					$("#tt").tabs('close',n);
				}
			})
			break;
		case 'closeleft':
			if(indexTab==1){
				alert('主页不能关闭');
				return false;
			}
			$.each(allTabtitle,function(i,n){
				if(i<indexTab && n!=onlyOpenTitle){
					$("#tt").tabs('close',n);
				}
			})
			break;
		case 'closeright':	
			if(indexTab==lenTab-1){
				alert('右侧无内容');
				return false;
			}
			$.each(allTabtitle,function(i,n){
				if(i>indexTab){
					$("#tt").tabs('close',n);
				}
			})
			break;
		case 'exit':
			break;
		default:
			break;
	
	}
}

//form 
function submitForm(){
	$('#ff').form('submit');
}
function clearForm(){
	$('#ff').form('clear');
}

//dialog






