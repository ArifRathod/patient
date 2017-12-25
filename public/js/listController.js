angular.module('imageGallery').controller('listController', function($scope, $http) {
	angular.element(".progress-indicator").show();
	$('#example').dataTable().fnDestroy();
	
    $.ajax({
	    'url': "/student",
	    'method': "GET",
	    'contentType': 'application/json'
	}).done( function(data) {
	    $('#example').dataTable( {
	    	"bDestroy": true,
	        "aaData": data.data,
	        "columns": [
	            { "data": "Score" },
	            { "data": "Trend" },
				{ "data": "Activity" },
				{ "data": "Phone" },
	            { "data": "first_name"}
	        ]
		})
		angular.element(".progress-indicator").hide();
	}).error(function(err){4
		angular.element(".progress-indicator").hide();
	})
});

