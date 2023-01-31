// get holidays options
$.getJSON("http://seifeldeen.pythonanywhere.com/hr/available-leaves/",function(data)
			//get mangement to add department
			{

				for(var i=0;i<data.length;i++)
				{

					$('#hodidays_option').append(`<option value="${data[i].leave_ar}"  data-id=${data[i].id} >${data[i].leave_ar}</option>`);
				}	
				
			}
			
			);
			
			


// get welocme card
$.getJSON(`http://seifeldeen.pythonanywhere.com/hr/emp-data/2/`, function (data) {

			
			$('.welcome-box').append(`
			                    <div class="welcome-img">
									<img alt="" src="${data.ProfileImg}">
								</div>
								<div class="welcome-det">
									<h3>Welcome, ${data.first_name}</h3>
									<p>Monday, 20 May 2019</p>
								</div>
			`);
				}	
				
				

);