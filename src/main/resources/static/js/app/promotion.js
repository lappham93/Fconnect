/**
 * lappv POST - create, GET - retrieve PUT - update DELETE - delete
 */
var URI = App.adminPrefix + "/promotion";
$(function() {
	$('#addPromotionFrmId').submit(function(e) {
		//init
		App.initAjaxRequest('#addPromotionFrmId');

		var code = $('#codeAddIptId').val().toUpperCase();
		var useFor = $('#useForAddSltId').val();
		var isActive = $('#activeAddIptId').prop("checked");
		var values = [];
		var i = 1;
		while (true) {
			var type = $('#valueTypeAddSltId' + i);
			var value = $('#valueAddIptId' + i)
			if (type.length > 0 && value.length > 0) {
				if (value.val() > 0) {
					values.push({
						'valueType' : type.val(),
						'value' : value.val()
					});
				}
			} else {
				break;
			}
			i++;
		}
		var data = {
			'code' : code,
			'values' : values,
			'objectType' : useFor,
			'active' : isActive
		}
		var url = URI;
		App.ajaxRequest('POST', url, data, function(resp) {
			App.callbackAjaxRequest('#addPromotionFrmId', resp);
		})

		return false;
	});

	$('#editPromotionFrmId').submit(function(e) {
		//init
		App.initAjaxRequest('#editPromotionFrmId');

		var code = $('#codeEditIptId').val().toUpperCase();
		var useFor = $('#useForEditSltId').val();
		var isActive = $('#activeEditIptId').prop("checked");
		var values = [];
		var i = 1;
		while (true) {
			var type = $('#valueTypeEditSltId' + i);
			var value = $('#valueEditIptId' + i)
			if (type.length > 0 && value.length > 0) {
				if (value.val() > 0) {
					values.push({
						'valueType' : type.val(),
						'value' : value.val()
					});
				}
			} else {
				break;
			}
			i++;
		}
		var data = {
			'code' : code,
			'values' : values,
			'objectType' : useFor,
			'active' : isActive
		}
		var id = $('#idEditIptId').val()
		var url = URI + "/" + id;
		App.ajaxRequest('PUT', url, data, function(resp) {
			App.callbackAjaxRequest('#editPromotionFrmId', resp);
		})

		return false;
	});

	$('#deletePromotionFrmId').submit(function(e) {
		//init
		App.initAjaxRequest('#deletePromotionFrmId');

		var id = $('#idDeleteIptId').val();
		var data = null;
		var url = URI + "/" + id;
		App.ajaxRequest('DELETE', url, data, function(resp) {
			App.callbackAjaxRequest('#deletePromotionFrmId', resp);
		})

		return false;
	});

	$('#addServiceFrmId').submit(function(e) {
		//init
		App.initAjaxRequest('#addServiceFrmId');

		var photoFile = $('#photoIptId')[0].files;

		App.ajaxUploadPhotoRequest(App.photoType.SERVICE, photoFile, function(data) {
			if (data.code >= 0) {
				var cate = $('#cateAddSltId').val();
				var name = $('#nameAddIptId').val();
				var oldPrice = $('#oldPriceAddIptId').val();
				var price = $('#priceAddIptId').val();
				var displayOrder = $('#disOrderAddIptId').val();
				var isActive = $('#activeAddIptId').prop("checked");
				var photoId = data.data.length > 0 ? data.data[0] : 0;
				console.log("photoId = " + photoId);
				var data = {
					'categoryId' : cate,
					'name' : name,
					'baseOldPrice' : oldPrice,
					'basePrice' : price,
					'displayOrder' : displayOrder,
					'active' : isActive,
					'photoId' : photoId
				}
				var url = URI + "";
				App.ajaxRequest('POST', url, data, function(resp) {
					App.callbackAjaxRequest('#addServiceFrmId', resp);
				})
			} else {
				var errorMsg = $('#addServiceFrmId').find('.form-error');
				errorMsg.text(data.msg);
				$(errorMsg).show();
			}
		}, function() {
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
		var oldPrice = $('#oldPriceEditIptId').val();
		var price = $('#priceEditIptId').val();
		var displayOrder = $('#disOrderEditIptId').val();
		var isActive = $('#activeEditIptId').prop("checked");

		var data = {
			'categoryId' : cate,
			'name' : name,
			'baseOldPrice' : oldPrice,
			'basePrice' : price,
			'displayOrder' : displayOrder,
			'active' : isActive,
			updateType : App.updateType.INFO
		}
		var url = URI + "/" + id;
		App.ajaxRequest('PUT', url, data, function(resp) {
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
		App.ajaxRequest('DELETE', url, data, function(resp) {
			App.callbackAjaxRequest('#deleteServiceFrmId', resp);
		})

		return false;
	});
});

function openPromotionEditModal(id) {
	var modal = $('#editPromotionMdlId');
	var errorMsg = modal.find('.form-error');
	var successMsg = modal.find('.form-success');
	$(errorMsg).hide();
	$(successMsg).hide();

	var url = URI + "/" + id;
	App.ajaxRequest('GET', url, null, function(resp) {
		if (resp.code >= 0) {
			$('#idEditIptId').val(id);
			$('#codeEditIptId').val(resp.data.code);
			//"value":12,"valueType":1
			var values = resp.data.values;
			var i = 1;
			while (true) {
				var type = $('#valueTypeEditSltId' + i);
				var value = $('#valueEditIptId' + i)
				if (type.length > 0 && value.length > 0) {
					value.val("");
					for (var j = 0; j < values.length; j++) {
						if (values[j].valueType == type.val()) {
							value.val(values[j].value);
							break;
						}
					}
				} else {
					break;
				}
				i++;
			}
			$('#useForEditSltId').val(resp.data.useFor.value);
			$('#activeEditIptId').prop('checked', resp.data.active);
			//animate
			App.animateSelect('#useForEditSltId');
			App.animateSwitch('#activeEditIptId');
		} else {
			errorMsg.text(resp.msg);
			errorMsg.show();
		}
		modal.modal({
			backdrop : 'static',
			keyboard : false,
			show : true
		});
	})
}

function submitPromotionEdit() {
	$('#editPromotionBtnId').trigger('click');
}

function openPromotionDeleteModal(id) {
	var modal = $('#deletePromotionMdlId');
	var errorMsg = modal.find('.form-error');
	var successMsg = modal.find('.form-success');
	var warningMsg = modal.find('.form-warning');
	$(errorMsg).hide();
	$(successMsg).hide();

	$(warningMsg).text('Warning! Delete promotion will remove permanently promotion out of system.');
	$(warningMsg).show();
	$('#idDeleteIptId').val(id);
	modal.modal({
		backdrop : 'static',
		keyboard : false,
		show : true
	});
}

function submitPromotionDelete() {
	$('#deletePromotionBtnId').trigger('click');
}