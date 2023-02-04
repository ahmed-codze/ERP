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
$.getJSON(`http://seifeldeen.pythonanywhere.com/hr/emp-data/${localStorage.getItem("id")}/`, function (data) 
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
				the_leave: $('#hodidays_option  option:selected').val(),
				number_of_days_requested: $("#num_of_holiday").val(),
				started_at: $("#start_date_of_holiday").val(),
				available_for_this_user:data.id,		
				success : function () 
				{
					// location.reload();
					 console.log($('#hodidays_option  option:selected').val())
					 console.log($("#num_of_holiday").val());
					 console.log($("#start_date_of_holiday").val());
					 console.log(data.id);
					 location.reload();
				},
				error :function(xhr,state,err){
					console.log(xhr);
					console.log(err);
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
							
							<i class="fa fa-dot-circle-o "id="currant_state-${data2[i].id}"></i> 
							</a>
							
							
					</td>
				</tr>
							
			
		
		
		
					`)
		}
		
		
			console.log(data2[i].the_leave.id);
			for(i in data2)
			{
				if(data2[i].accepted== true)
					{
						document.getElementById("currant_state-"+ data2[i].id).innerHTML = " موافقه"; 
						document.getElementById("currant_state-"+ data2[i].id).classList.add("text-success");
						
					}
					else if(data2[i].accepted==false)
					{
						document.getElementById("currant_state-"+ data2[i].id).innerHTML = " رفض "; 
						document.getElementById("currant_state-"+ data2[i].id).classList.add("text-danger");
						
						
					}
					else
					{
						document.getElementById("currant_state-"+ data2[i].id).innerHTML = " معلقة "; 
						document.getElementById("currant_state-"+ data2[i].id).classList.add("text-purple");
					}
					console.log(data2[i].accepted);
			}
					
	
				
	})
	
		
	



	
});
