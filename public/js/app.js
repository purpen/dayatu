var dayatoo = {
	visitor : {},
    url : {},
    redirect: function(url,delay) {
        setTimeout(function(){
            window.location = url;
        },delay);
    }
};

/**
 * 初始化
 */
dayatoo.initial = function() { 
	
};


$(document).ready(function () {	
	$('#stuff-body').wysihtml5({
		stylesheets: ["/css/wysiwyg-color.css"]
	});
	
	$('#tags').tagsInput({
	    'height':'27px',
	    'width':'530px'
	});
	
});