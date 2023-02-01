// add active class to nav link 
$('a:contains("لوحة التحكم للموظفين")').addClass('active');


// get holidays options
$.getJSON("https://seifeldeen.pythonanywhere.com/hr/list-avuser-leave/",function(data)
			//get mangement to add department
			{

				for(var i=0;i<data.length;i++)
				{

					$('#hodidays_option').append(`<option value="${data[i].id}"  data-id=${data[i].id} >${data[i].leave_name}</option>`);
				}	
				
			}
			
			);
			
			


// get welocme card
$.getJSON(`http://seifeldeen.pythonanywhere.com/hr/emp-data/2/`, function (data) 
	{

			
			$('.welcome-box').append
			(`
			                    <div class="welcome-img">
									<img alt="" src="${data.ProfileImg}">
								</div>
								<div class="welcome-det">
									<h3>Welcome, ${data.first_name}</h3>
									<p>Monday, 20 May 2019</p>
								</div>
			`);
	
	
				
	// console.log(d)
	// add holiday_request
	$('#add_request_holiday').click(function () 
	{
		
			
		$.ajax
		({
			url: `https://seifeldeen.pythonanywhere.com/hr/add-leave-request/`,
			type: 'POST',
			data: 
			{
				the_leave: $('#hodidays_option  option:selected').val(),
				number_of_days_requested: $("#num_of_holiday").val(),
				available_for_this_user:data.id,		
				success : function () 
				{
					location.reload();
					
				}
				
				
			},
			
		});


	});
	
	
});





