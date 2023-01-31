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