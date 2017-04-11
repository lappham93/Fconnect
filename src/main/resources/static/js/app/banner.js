/**
 * lappv POST - create, GET - retrieve PUT - update DELETE - delete
 */
var URI = App.adminPrefix + "/banner";
Photo.type = App.photoType.BANNER;
Photo.url = URI;

$(function(){
	$('#addBannerFrmId').submit(function(e) {
		//init
		App.initAjaxRequest('#addBannerFrmId');
		
		var photoFile = $('#photoIptId')[0].files;
	    
	    App.ajaxUploadPhotoRequest(App.photoType.BANNER, photoFile, function(data){
	    	if (data.code >= 0) {
				var type = $('#typeAddSltId').val();
				var msg = $('#msgAddIptId').val();
				var info = $('#infoAddIptId').val();
				var	isActive = $('#activeAddIptId').prop("checked");
				var photoId = data.data.length > 0 ? data.data[0] : 0;
				console.log("photoId = " + photoId);
				var data = {'type': type, 'msg': msg, 'info': info, 'active': isActive, 'photoId': photoId}
				var url = URI + "";
				App.ajaxRequest('POST', url, data, function(resp){
					App.callbackAjaxRequest('#addBannerFrmId', resp);
				})
	    	} else {
	    		var errorMsg = $('#addBannerFrmId').find('.form-error');
	    		errorMsg.text(data.msg);
		    	$(errorMsg).show();
	    	}
	    }, function(){
	    	var errorMsg = $('#addBannerFrmId').find('.form-error');
	    	$(errorMsg).text("Server error");
	    	$(errorMsg).show();
	    })
		
		return false;
	});
	
	$('#editBannerFrmId').submit(function(e) {
		//init
		App.initAjaxRequest('#editBannerFrmId');
		
		var id = $('#idEditIptId').val();
		var type = $('#typeEditSltId').val();
		var msg = $('#msgEditIptId').val();
		var info = $('#infoEditIptId').val();
		var	isActive = $('#activeEditIptId').prop("checked");
		
		var data = {'type': type, 'msg': msg, 'info': info, 'active': isActive, 'updateType': App.updateType.INFO}
		var url = URI + "/" + id;
		App.ajaxRequest('PUT', url, data, function(resp){
			App.callbackAjaxRequest('#editBannerFrmId', resp);
		})
		
		return false;
	});
	
	$('#deleteBannerFrmId').submit(function(e) {
		//init
		App.initAjaxRequest('#deleteBannerFrmId');
		
		var id = $('#idDeleteIptId').val();
		var data = null;
		var url = URI + "/" + id;
		App.ajaxRequest('DELETE', url, data, function(resp){
			App.callbackAjaxRequest('#deleteBannerFrmId', resp);
		})
		
		return false;
	});
	
});

function openBannerEditModal(id) {
	var modal = $('#editBannerMdlId');
	var errorMsg = modal.find('.form-error');
	var successMsg = modal.find('.form-success');
	$(errorMsg).hide();
	$(successMsg).hide();
	
	var url = URI + "/" + id;
	App.ajaxRequest('GET', url, null, function(resp){
		if (resp.code >= 0) {
			$('#idEditIptId').val(id);
			$('#typeEditSltId').val(resp.data.typeValue);
			$('#msgEditIptId').val(resp.data.msg);
			$('#infoEditIptId').val(resp.data.info);
			$('#activeEditIptId').prop('checked', resp.data.active);
			//animate
			App.animateSelect('#typeEditSltId');
			App.animateSwitch('#activeEditIptId');
		} else {
			errorMsg.text(resp.msg);
			errorMsg.show();
		}
		modal.modal({backdrop: 'static', keyboard: false, show: true});
	})
}

function submitBannerEdit() {
	$('#editBannerBtnId').trigger('click');
}

function openBannerDeleteModal(id) {
	var modal = $('#deleteBannerMdlId');
	var errorMsg = modal.find('.form-error');
	var successMsg = modal.find('.form-success');
	var warningMsg = modal.find('.form-warning');
	$(errorMsg).hide();
	$(successMsg).hide();
	
	$(warningMsg).text('Warning! Delete banner will remove permanently banner out of system.');
	$(warningMsg).show();
	$('#idDeleteIptId').val(id);
	modal.modal({backdrop: 'static', keyboard: false, show: true});
}

function submitBannerDelete() {
	$('#deleteBannerBtnId').trigger('click');
}