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

/**
 * Validate user form 
 */
dayatoo.hook_auth_validate = function() {
	$('#user-signup-frm').validate({
	    rules: {
	        email: {
	            required: true,
	            email: true
	        },
	        password: {
	            required: true,
	            //汉字算1个
	            minlength: 6
	        },
			'password-repeat': {
                equalTo: "#password",
                required: true
            }
	    },
	    messages: {
	        email: 'Please enter the email as your account name',
	        password: {
				required: 'Please enter the correct login password (6 characters)',
				minlength: 'Password length greater than 6 characters'
			},
			'password-repeat': {
                required: 'Confirm that the password has not filled out',
                equalTo: "Enter the password twice inconsistent"
            }
	    }
	});
};


/**
 * imgAreaSelect settings
 */
$.extend($.imgAreaSelect.prototype, {
    animateSelection: function (x1, y1, x2, y2, duration) {
        var fx = $.extend($('<div/>')[0], {
            ias: this,
            start: this.getSelection(),
            end: { x1: x1, y1: y1, x2: x2, y2: y2 }
        });

        $(fx).animate({
            cur: 1
        },
        {
            duration: duration,
            step: function (now, fx) {
                var start = fx.elem.start, end = fx.elem.end,
                    curX1 = Math.round(start.x1 + (end.x1 - start.x1) * now),
                    curY1 = Math.round(start.y1 + (end.y1 - start.y1) * now),
                    curX2 = Math.round(start.x2 + (end.x2 - start.x2) * now),
                    curY2 = Math.round(start.y2 + (end.y2 - start.y2) * now);
                fx.elem.ias.setSelection(curX1, curY1, curX2, curY2);
                fx.elem.ias.update();
            }
        });
    }
});

$(document).ready(function () {	
	dayatoo.initial();
	
	$('#stuff-body').wysihtml5({
		stylesheets: ["/css/wysiwyg-color.css"]
	});
	
	$('#tags').tagsInput({
	    'height':'27px',
	    'width':'530px'
	});
	
});