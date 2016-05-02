$(document).ready(function(){
	$('.hidden').show(2000, function(){
		$('.alias').focus();
	});
});

$('button').on('click',function(){
	$('.ajax').animate({
			width: "70%",
    		opacity: 0.4,
    		fontSize: "1.5em",
    		borderWidth: "10px"

	},1500);
});
