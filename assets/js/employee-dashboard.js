// add active class to nav link 
$('a:contains("لوحة التحكم للموظفين")').addClass('active');
var example1 = flatpickr('.holiday-date');

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
$.getJSON(`http://seifeldeen.pythonanywhere.com/hr/emp-data/30/`, function (data) 
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
	
	
				
	// console.log(d)2
	// add holiday_request
	$('#add_request_holiday').click(function () 
	{
		
			
		$.ajax
		({
			url: `https://seifeldeen.pythonanywhere.com/hr/add-leave-request/`,
			type: 'POST',
			data: 
			{
				leave_name: $('#hodidays_option  option:selected').val(),
				number_of_days_requested: $("#num_of_holiday").val(),
				started_at: $("#start_date_of_holiday").val(),
				available_for_this_user:data.id,		
				success : function () 
				{
					location.reload();
					// console.log('done')
				}
				
				
			},
			
		});


	});
	// get holiday result
	$.getJSON("https://seifeldeen.pythonanywhere.com/hr/list-leave-request-user/", function (data2) 
	{
	
		for(i in data2)
		{
			$('.holiday_request_result').append(`
		
			
			
				<tr class="row-${data2[i].the_leave.id}">
					<td>${data2[i].the_leave.leave_name}</td> 
					<td>${data2[i].number_of_days_requested} ايام</td>
					
					
					<td class="text-center">
						<div class="dropdown action-label">
							<a class="btn btn-white btn-sm btn-rounded " href="#" data-bs-toggle="dropdown" aria-expanded="false">
							
							<i class="fa fa-dot-circle-o "id="currant_state-${data2.id}"></i> 
							</a>
							
							
					</td>
				</tr>
							
			
		
		
		
					`)
		}
		
		
			console.log(data2[i].the_leave.id);
					if(data2.accepted== true)
					{
						document.getElementById("currant_state-"+ data2.id).innerHTML = " موافقه"; 
						document.getElementById("currant_state-"+ data2.id).classList.add("text-success");
						document.getElementById("cahnge-state-"+ data2.id).remove();
					}
					else if(data.accepted==false)
					{
						document.getElementById("currant_state-"+ data2.id).innerHTML = "رفض"; 
						document.getElementById("currant_state-"+ data2.id).classList.add("text-danger");
						document.getElementById("cahnge-state-"+ data2.id).remove();
						
					}
					else
					{
						document.getElementById("currant_state-"+ data2.id).innerHTML = " معلقة "; 
						document.getElementById("currant_state-"+ data2.id).classList.add("text-purple");
					}
	
				
	})
	
		
	



	
});
