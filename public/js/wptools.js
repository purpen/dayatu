/**
 * 全局变量声明
 */
var wps_width=0, wps_height=0, wps_ratio=1;
var scale_width=580, scale_height=0;
var crop_width=0, crop_height=0;

/**
 * hook image area select
 */
dayatoo.hook_imgarea_select = function(){
	wps_width  = $('img#wallpaper').attr('width');
	wps_height = $('img#wallpaper').attr('height');
	scale_height = parseInt(wps_height*scale_width/wps_width);

	ias = $('img#wallpaper').imgAreaSelect({
		handles: true,
		fadeSpeed: 200,
		instance: true,
		onSelectChange: dayatoo.preview,
		onSelectEnd: dayatoo.updateAreaSelect
	});
};

dayatoo.preview = function(img, selection) {
	if (!selection.width || !selection.height){
		return;
	}
	$('#x1').val(selection.x1);
	$('#y1').val(selection.y1);
	$('#x2').val(selection.x2);
	$('#y2').val(selection.y2);
	$('#w').val(selection.width);
	$('#h').val(selection.height);
};

dayatoo.updateAreaSelect = function() {
	
};

/**
 * hook a size
 */
dayatoo.hook_ztools_selection = function(){
	$('a.wsize').click(function() {
		var wsz = $(this).attr('title');
		if(!wsz){
			alert('无法获取尺寸！');
			return false;
		}
		var size_wh = wsz.split('x'), x1=0, y1=0;
		crop_width = parseInt(size_wh[0]);
		crop_height = parseInt(size_wh[1]);
		wps_ratio = crop_width+':'+crop_height;
		// 裁切壁纸的宽度、高度
		$('#wp_width').val(crop_width);
		$('#wp_height').val(crop_height);
		
		var x2 = 0;
		var y2 = 0;
		if ((crop_width < scale_width) && (crop_height < scale_height)) {
			x2 = crop_width;
			y2 = crop_height;
		}else if ((crop_width < scale_width) && (crop_height > scale_height)) {
			x2 = parseInt(scale_height*crop_width/crop_height);
			y2 = scale_height;
		}else if ((crop_width > scale_width) && (crop_height < scale_height)){
			x2 = scale_width;
			y2 = parseInt(scale_width*crop_height/crop_width);
		}else if ((crop_width > scale_width) && (crop_height > scale_height)){
			if ((crop_width/scale_width) > (crop_height/scale_height)){
				x2 = scale_width;
				y2 = parseInt(scale_width*crop_height/crop_width);
			}else{
				x2 = parseInt(scale_height*crop_width/crop_height);
				y2 = scale_height;
			}
		}
		
		// If nothing's selected, start with a tiny area in the center
        if (!ias.getSelection().width)
            ias.setOptions({ show: true, x1: 0, y1: 0, x2: 320, y2: 480 });
		ias.setOptions({ aspectRatio: wps_ratio});
        ias.animateSelection(x1, y1, x2, y2, 'slow');
		
		return false;
	});
};

/**
 * 创建上传按钮
 */
dayatoo.createUploader = function() {
	var uploader = new qq.FineUploader({
		element: document.getElementById('bootstrapped-fine-uploader'),
		request: {
			endpoint: '/wptools/uploads'
		},
		multiple: false,
		validation: {
			allowedExtensions: ['jpeg', 'jpg'],
			sizeLimit: 5242880 // 5M = 5 * 1024 kB = 5 * 1024 * 1024 bytes
		},
		text: {
            uploadButton: '<a class="btn btn-inverse btn-large"><i class="icon-upload icon-white"></i> &nbsp;Upload the Picture</a>'
		},
		template: '<div class="qq-uploader">' +
					'<pre class="qq-upload-drop-area"><span>{dragZoneText}</span></pre>' +
					'<div class="qq-upload-button">{uploadButtonText}</div>' +
					'<span class="qq-drop-processing"><span>{dropProcessingText}</span><span class="qq-drop-processing-spinner"></span></span>' +
					'<ul class="qq-upload-list span4" style="margin-top: 5px; text-align: center;"></ul>' +
					'</div>',
		classes: {
			success: 'alert alert-success',
            fail: 'alert alert-error'
		},
		callbacks: {
			onComplete: function(id, fileName, result) {
				if (result.success) {
					$('#select-area').html('<img id="wallpaper" src="/srcfile/'+result.id+'" style="width: 580px;" width="'+result.width+'" height="'+result.height+'">');
					dayatoo.hook_imgarea_select();
					
					dayatoo.hook_ztools_selection();
					
					// 更新附件Id
					$('#wp_id').val(result.id);
				}
			}
		}
	});

};

$(document).ready(function () {	
	dayatoo.createUploader();
	
	$('#generate-submit').click(function() {
		if (wps_width == 0 || wps_height == 0) {
			alert('Error: Upload the picture.');
			return false;
		}
		// 提交表单
		$('#wp-form').ajaxSubmit({
			dataType: 'json',
			type: 'POST',
			success: function(json) {
				if(!json.is_error){
					dayatoo.redirect('/wptools/wpshow/'+ json.wp_file, 1000);
				}else{
					alert(json.error_msg);
				}
			}
		});
		
		return false;
	});
});
