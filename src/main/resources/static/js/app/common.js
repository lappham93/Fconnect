var App = {
		
	adminPrefix: '',
	
	PHOTO_UPLOAD_URI: '/upload/photo',
	
	photoType: {SERVICE: 1, FEED: 2, BANNER: 8},
	
	updateType: {INFO: 1, PHOTO: 2},
		
	ajaxRequest: function(method, url, data, callback) {
		data = JSON.stringify(data);
		$.ajax({
	    	  headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
	    	  url: url,
	    	  method: method,
	    	  dataType: 'json',
	    	  data: data,
	    	  success: callback
		});
	},
	
	ajaxUploadPhotoRequest: function(type, files, successCallback, errorCallback) {
		var data = new FormData();
        data.append("type", type);
        $.each(files, function(key, value) {
        	data.append("photos", value);
        })
		$.ajax({
	        url: App.adminPrefix + App.PHOTO_UPLOAD_URI,
	        type: 'POST',
	        data: data,
	        cache: false,
	        dataType: 'json',
	        processData: false, // Don't process the files
	        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
	        success: successCallback,
	        error: errorCallback
		})
	},
	
	initAjaxRequest: function(formEle) {
		var errorMsg = $(formEle).find('.form-error');
		var successMsg = $(formEle).find('.form-success');
		var warningMsg = $(formEle).find('.form-warning');
		$(errorMsg).hide();
		$(successMsg).hide();
		$(warningMsg).hide();
	},
	
	callbackAjaxRequest: function(formEle, dataResp) {
		var errorMsg = $(formEle).find('.form-error');
		var successMsg = $(formEle).find('.form-success');
		if (dataResp.code >= 0) {
			$(successMsg).text(dataResp.msg);
			$(successMsg).show();
			setTimeout(function() {
				App.reload();
            }, 2000);
		} else {
			$(errorMsg).text(dataResp.msg);
			$(errorMsg).show();
		}
	},

	redirect: function(uri) {
		window.location.replace(this.adminPrefix + uri);
	},
	
	reload: function() {
		window.location.reload();
	},
	
	animateSelect: function(ele) {
		$(ele).select2();
	}, 
	
	animateSwitch: function(ele) {
		var parent = $(ele).parent();
		var grand = $(parent).parent();
		if ($(grand).hasClass("bootstrap-switch")) {
			var active = $(ele).prop("checked");
			if (active && $(grand).hasClass("bootstrap-switch-off")) {
				$(grand).removeClass("bootstrap-switch-off");
				$(grand).addClass("bootstrap-switch-on");
				$(parent).css("margin-left", "0px");
			} else if (!active && $(grand).hasClass("bootstrap-switch-on")) {
				$(grand).removeClass("bootstrap-switch-on");
				$(grand).addClass("bootstrap-switch-off");
				$(parent).css("margin-left", "-50px");
			}
		}
		$(ele).bootstrapSwitch();
	},
	
	files: []
	
};

$(function(){
	// Switchery
    if (Array.prototype.forEach) {
        var elems = Array.prototype.slice.call(document.querySelectorAll('.switchery'));
        elems.forEach(function(html) {
            var switchery = new Switchery(html);
        });
    }
    else {
        var elems = document.querySelectorAll('.switchery');
        for (var i = 0; i < elems.length; i++) {
            var switchery = new Switchery(elems[i]);
        }
    }


    // Styled checkboxes/radios
    $(".styled, .multiselect-container input").uniform({
        radioClass: 'choice'
    });

    // Update uniform when select between styled and unstyled
    $('.input-group-addon input[type=radio]').on('click', function() {
        $.uniform.update("[name=addon-radio]");
    });



    // Touchspin spinners
    // ------------------------------

    // Basic example
    $(".touchspin-basic").TouchSpin({
        postfix: '<i class="icon-paragraph-justify2"></i>'
    });


    // Postfix
    $(".touchspin-postfix").TouchSpin({
        min: 0,
        max: 100,
        step: 0.1,
        decimals: 2,
        postfix: '%'
    });


    // Prefix
    $(".touchspin-prefix").TouchSpin({
        min: 0,
        max: 100,
        step: 0.1,
        decimals: 2,
        prefix: '$'
    });


    // Init with empty values
    $(".touchspin-empty").TouchSpin();


    // Disable mousewheel
    $(".touchspin-no-mousewheel").TouchSpin({
        mousewheel: false
    });


    // Incremental/decremental steps
    $(".touchspin-step").TouchSpin({
        step: 10
    });


    // Set value
    $(".touchspin-set-value").TouchSpin({
        initval: 40
    });


    // Inside button group
    $(".touchspin-button-group").TouchSpin({
        prefix: "pre",
        postfix: "post"
    });


    // Vertical spinners
    $(".touchspin-vertical").TouchSpin({
        verticalbuttons: true,
        verticalupclass: 'icon-arrow-up22',
        verticaldownclass: 'icon-arrow-down22'
    });

    // Vertical spinners
    $(".touchspin-display-order").TouchSpin({
    	min: 1,
    	max: 1000,
        verticalbuttons: true,
        verticalupclass: 'icon-arrow-up22',
        verticaldownclass: 'icon-arrow-down22'
    });

    // Touchspin colors
    // ------------------------------

    //
    // Addons
    //

    // Default
    $(".touchspin-addon-default").TouchSpin({
        prefix: '<i class="icon-accessibility"></i>',
        postfix: '<i class="icon-paragraph-justify2"></i>'
    });

    // Primary
    $(".touchspin-addon-primary").TouchSpin({
        prefix_extraclass: 'input-group-addon-primary',
        postfix_extraclass: 'input-group-addon-primary',
        prefix: '<i class="icon-accessibility"></i>',
        postfix: '<i class="icon-paragraph-justify2"></i>'
    });

    // Danger
    $(".touchspin-addon-danger").TouchSpin({
        prefix_extraclass: 'input-group-addon-danger',
        postfix_extraclass: 'input-group-addon-danger',
        prefix: '<i class="icon-accessibility"></i>',
        postfix: '<i class="icon-paragraph-justify2"></i>'
    });

    // Success
    $(".touchspin-addon-success").TouchSpin({
        prefix_extraclass: 'input-group-addon-success',
        postfix_extraclass: 'input-group-addon-success',
        prefix: '<i class="icon-accessibility"></i>',
        postfix: '<i class="icon-paragraph-justify2"></i>'
    });

    // Warning
    $(".touchspin-addon-warning").TouchSpin({
        prefix_extraclass: 'input-group-addon-warning',
        postfix_extraclass: 'input-group-addon-warning',
        prefix: '<i class="icon-accessibility"></i>',
        postfix: '<i class="icon-paragraph-justify2"></i>'
    });

    // Info
    $(".touchspin-addon-info").TouchSpin({
        prefix_extraclass: 'input-group-addon-info',
        postfix_extraclass: 'input-group-addon-info',
        prefix: '<i class="icon-accessibility"></i>',
        postfix: '<i class="icon-paragraph-justify2"></i>'
    });


    //
    // Buttons
    //

    // Default
    $(".touchspin-button-default").TouchSpin({
        prefix: '<i class="icon-accessibility"></i>',
        postfix: '<i class="icon-paragraph-justify2"></i>',
        buttondown_class: "btn btn-default",
        buttonup_class: "btn btn-default"
    });

    // Primary
    $(".touchspin-button-primary").TouchSpin({
        prefix: '<i class="icon-accessibility"></i>',
        postfix: '<i class="icon-paragraph-justify2"></i>',
        buttondown_class: "btn btn-primary",
        buttonup_class: "btn btn-primary"
    });

    // Danger
    $(".touchspin-button-danger").TouchSpin({
        prefix: '<i class="icon-accessibility"></i>',
        postfix: '<i class="icon-paragraph-justify2"></i>',
        buttondown_class: "btn btn-danger",
        buttonup_class: "btn btn-danger"
    });

    // Success
    $(".touchspin-button-success").TouchSpin({
        prefix: '<i class="icon-accessibility"></i>',
        postfix: '<i class="icon-paragraph-justify2"></i>',
        buttondown_class: "btn btn-success",
        buttonup_class: "btn btn-success"
    });

    // Warning
    $(".touchspin-button-warning").TouchSpin({
        prefix: '<i class="icon-accessibility"></i>',
        postfix: '<i class="icon-paragraph-justify2"></i>',
        buttondown_class: "btn btn-warning",
        buttonup_class: "btn btn-warning"
    });

    // Info
    $(".touchspin-button-info").TouchSpin({
        prefix: '<i class="icon-accessibility"></i>',
        postfix: '<i class="icon-paragraph-justify2"></i>',
        buttondown_class: "btn btn-info",
        buttonup_class: "btn btn-info"
    });

    // Bootstrap switch
    $(".switch").bootstrapSwitch();
    
    // Image lightbox
    $('[data-popup="lightbox"]').fancybox({
	    padding: 3
    });
    
    // Defaults
    Dropzone.autoDiscover = false;
    
    // Dropzone single file
    $(".dropzone_single").dropzone({
        paramName: "photos", // The name that will be used to transfer the file
        maxFilesize: 10, // MB
        maxFiles: 1,
        dictDefaultMessage: 'Drop file to upload <span>or CLICK</span>',
        acceptedFiles: 'image/*',
        addRemoveLinks: false,
        autoProcessQueue: false,
        init: function() {
            this.on('addedfile', function(file){
            	App.files = [];
            	App.files.push(file);
                if (this.fileTracker) {
                this.removeFile(this.fileTracker);
            }
                this.fileTracker = file;
            });
        }
    });
    
	// Dropzone multiple files
    $(".dropzone_multiple").dropzone({
        paramName: "photos", // The name that will be used to transfer the file
        maxFilesize: 10, // MB
        dictDefaultMessage: 'Drop file to upload <span>or CLICK</span>',
        acceptedFiles: 'image/*',
        addRemoveLinks: true,
        autoProcessQueue: false,
        init: function() {
            this.on('addedfile', function(file){
            	App.files.push(file);
            });
        }
    });
    
});