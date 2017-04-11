/**
 * lappv POST - create, GET - retrieve PUT - update DELETE - delete
 */
var URI = App.adminPrefix + "/service";
Photo.type = App.photoType.SERVICE;
Photo.url = URI;
$(function(){
	$('#addServiceCateFrmId').submit(function(e) {
		//init
		App.initAjaxRequest('#addServiceCateFrmId');
		
		var parent = $('#cateAddSltId').val();
		var name = $('#nameAddIptId').val();
		var displayOrder = $('#disOrderAddIptId').val();
		var	isActive = $('#activeAddIptId').prop("checked");
		
		var data = {'parentId': parent, 'name': name, 'displayOrder': displayOrder, 'active': isActive}
		var url = URI + "/category";
		App.ajaxRequest('POST', url, data, function(resp){
			App.callbackAjaxRequest('#addServiceCateFrmId', resp);
		})
		
		return false;
	});
	
	$('#editServiceCateFrmId').submit(function(e) {
		//init
		App.initAjaxRequest('#editServiceCateFrmId');
		
		var id = $('#idEditIptId').val();
		var parent = $('#cateEditSltId').val();
		var name = $('#nameEditIptId').val();
		var displayOrder = $('#disOrderEditIptId').val();
		var	isActive = $('#activeEditIptId').prop("checked");
		
		var data = {'parentId': parent, 'name': name, 'displayOrder': displayOrder, 'active': isActive}
		var url = URI + "/category/" + id;
		App.ajaxRequest('PUT', url, data, function(resp){
			App.callbackAjaxRequest('#editServiceCateFrmId', resp);
		})
		
		return false;
	});
	
	$('#deleteServiceCateFrmId').submit(function(e) {
		//init
		App.initAjaxRequest('#deleteServiceCateFrmId');
		
		var id = $('#idDeleteIptId').val();
		var data = null;
		var url = URI + "/category/" + id;
		App.ajaxRequest('DELETE', url, data, function(resp){
			App.callbackAjaxRequest('#deleteServiceCateFrmId', resp);
		})
		
		return false;
	});
	
	$('#addServiceFrmId').submit(function(e) {
		//init
		App.initAjaxRequest('#addServiceFrmId');
		
		var photoFile = $('#photoIptId')[0].files;
	    
	    App.ajaxUploadPhotoRequest(App.photoType.SERVICE, photoFile, function(data){
	    	if (data.code >= 0) {
				var cate = $('#cateAddSltId').val();
				var name = $('#nameAddIptId').val();
				var desc = $('#descAddIptId').val();
				var oldPrice = $('#oldPriceAddIptId').val();
				var price = $('#priceAddIptId').val();
				var displayOrder = $('#disOrderAddIptId').val();
				var	isActive = $('#activeAddIptId').prop("checked");
				var photoId = data.data.length > 0 ? data.data[0] : 0;
				console.log("photoId = " + photoId);
				var data = {'categoryId': cate, 'name': name, 'description': desc, 'baseOldPrice': oldPrice, 'basePrice': price, 
							'displayOrder': displayOrder, 'active': isActive, 'photoId': photoId}
				var url = URI + "";
				App.ajaxRequest('POST', url, data, function(resp){
					App.callbackAjaxRequest('#addServiceFrmId', resp);
				})
	    	} else {
	    		var errorMsg = $('#addServiceFrmId').find('.form-error');
	    		errorMsg.text(data.msg);
		    	$(errorMsg).show();
	    	}
	    }, function(){
	    	var errorMsg = $('#addServiceFrmId').find('.form-error');
	    	$(errorMsg).text("Server error");
	    	$(errorMsg).show();
	    })
		
		return false;
	});
	
	$('#editServiceFrmId').submit(function(e) {
		//init
		App.initAjaxRequest('#editServiceFrmId');
		
		var id = $('#idEditIptId').val();
		var cate = $('#cateEditSltId').val();
		var name = $('#nameEditIptId').val();
		var desc = $('#descEditIptId').val();
		var oldPrice = $('#oldPriceEditIptId').val();
		var price = $('#priceEditIptId').val();
		var displayOrder = $('#disOrderEditIptId').val();
		var	isActive = $('#activeEditIptId').prop("checked");
		
		var data = {'categoryId': cate, 'name': name, 'description': desc, 'baseOldPrice': oldPrice, 'basePrice': price, 
				'displayOrder': displayOrder, 'active': isActive, updateType: App.updateType.INFO}
		var url = URI + "/" + id;
		App.ajaxRequest('PUT', url, data, function(resp){
			App.callbackAjaxRequest('#editServiceFrmId', resp);
		})
		
		return false;
	});
	
	$('#deleteServiceFrmId').submit(function(e) {
		//init
		App.initAjaxRequest('#deleteServiceFrmId');
		
		var id = $('#idDeleteIptId').val();
		var data = null;
		var url = URI + "/" + id;
		App.ajaxRequest('DELETE', url, data, function(resp){
			App.callbackAjaxRequest('#deleteServiceFrmId', resp);
		})
		
		return false;
	});
});

function openServiceEditModal(id) {
	var modal = $('#editServiceMdlId');
	var errorMsg = modal.find('.form-error');
	var successMsg = modal.find('.form-success');
	$(errorMsg).hide();
	$(successMsg).hide();
	
	var url = URI + "/" + id;
	App.ajaxRequest('GET', url, null, function(resp){
		if (resp.code >= 0) {
			$('#idEditIptId').val(id);
			$('#cateEditSltId').val(resp.data.serviceCate.id);
			$('#nameEditIptId').val(resp.data.name);
			$('#descEditIptId').val(resp.data.description);
			$('#oldPriceEditIptId').val(resp.data.baseOldPrice);
			$('#priceEditIptId').val(resp.data.basePrice);
			$('#disOrderEditIptId').val(resp.data.displayOrder);
			$('#activeEditIptId').prop('checked', resp.data.active);
			//animate
			App.animateSelect('#cateEditSltId');
			App.animateSwitch('#activeEditIptId');
		} else {
			errorMsg.text(resp.msg);
			errorMsg.show();
		}
		modal.modal({backdrop: 'static', keyboard: false, show: true});
	})
}

function submitServiceEdit() {
	$('#editServiceBtnId').trigger('click');
}

function openServiceDeleteModal(id) {
	var modal = $('#deleteServiceMdlId');
	var errorMsg = modal.find('.form-error');
	var successMsg = modal.find('.form-success');
	var warningMsg = modal.find('.form-warning');
	$(errorMsg).hide();
	$(successMsg).hide();
	
	$(warningMsg).text('Warning! Delete service will remove permanently service out of system.');
	$(warningMsg).show();
	$('#idDeleteIptId').val(id);
	modal.modal({backdrop: 'static', keyboard: false, show: true});
}

function submitServiceDelete() {
	$('#deleteServiceBtnId').trigger('click');
}

function openServiceCateEditModal(id) {
	var modal = $('#editServiceCateMdlId');
	var errorMsg = modal.find('.form-error');
	var successMsg = modal.find('.form-success');
	$(errorMsg).hide();
	$(successMsg).hide();
	
	var url = URI + "/category/" + id;
	App.ajaxRequest('GET', url, null, function(resp){
		if (resp.code >= 0) {
			$('#idEditIptId').val(id);
			$('#cateEditSltId').val(resp.data.parent.id);
			$('#nameEditIptId').val(resp.data.name);
			$('#disOrderEditIptId').val(resp.data.displayOrder);
			$('#activeEditIptId').prop('checked', resp.data.active);
			//animate
			App.animateSelect('#cateEditSltId');
			App.animateSwitch('#activeEditIptId');
		} else {
			errorMsg.text(resp.msg);
			errorMsg.show();
		}
		modal.modal({backdrop: 'static', keyboard: false, show: true});
	})
}

function submitServiceCateEdit() {
	$('#editCateBtnId').trigger('click');
}

function openServiceCateDeleteModal(id) {
	var modal = $('#deleteServiceCateMdlId');
	var errorMsg = modal.find('.form-error');
	var successMsg = modal.find('.form-success');
	var warningMsg = modal.find('.form-warning');
	$(errorMsg).hide();
	$(successMsg).hide();
	
	$(warningMsg).text('Warning! Delete category causes deleting all child categories and their services.')
	$(warningMsg).show();
	$('#idDeleteIptId').val(id);
	modal.modal({backdrop: 'static', keyboard: false, show: true});
}

function submitServiceCateDelete() {
	$('#deleteCateBtnId').trigger('click');
}