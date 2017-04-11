/**
 * lappv
 */

var Photo = {
	type: 0,
	url: ''
};

$(function(){
	$('#editPhotoFrmId').submit(function(e) {
		//init
		App.initAjaxRequest('#editPhotoFrmId');
		
		var photoFile = App.files;
	    
	    App.ajaxUploadPhotoRequest(Photo.type, photoFile, function(data){
	    	if (data.code >= 0) {
				var	id = $('#idEditPhotoIptId').val();
				var photoId = data.data.length > 0 ? data.data[0] : 0;
				console.log("photoId = " + photoId);
				var data = {'photoId': photoId, updateType:  App.updateType.PHOTO};
				var uri = Photo.url + "/" + id;
				App.ajaxRequest('PUT', uri, data, function(resp){
					App.callbackAjaxRequest('#editPhotoFrmId', resp);
				})
	    	} else {
	    		var errorMsg = $('#editPhotoFrmId').find('.form-error');
	    		errorMsg.text(data.msg);
		    	$(errorMsg).show();
	    	}
	    }, function(){
	    	var errorMsg = $('#editPhotoFrmId').find('.form-error');
	    	$(errorMsg).text("Server error");
	    	$(errorMsg).show();
	    })
		
		return false;
	});
});

function openPhotoEditModal(id) {
	var modal = $('#editPhotoMdlId');
	var errorMsg = modal.find('.form-error');
	var successMsg = modal.find('.form-success');
	$(errorMsg).hide();
	$(successMsg).hide();
	App.files = [];
	
	$('#idEditPhotoIptId').val(id);
	modal.modal({backdrop: 'static', keyboard: false, show: true});
}

function submitPhotoEdit() {
	$('#editPhotoBtnId').trigger('click');
}