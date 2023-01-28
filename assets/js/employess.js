
		
		// add active class to nav link 

		$('a:contains("عرض الموظفين")').addClass('active');

		// flapticker for Date Input
		var example = flatpickr('#flatpickr');
        
		// delete employee
function delete_employee(){
    
    $('.delete_employee').click(function(){
        $id=$(this).attr('data-id');    
        
    })
    
    
}        $('.delete_employee_btn').click(function(){
                    
	$.ajax({
		url: `http://seifeldeen.pythonanywhere.com/hr/delete-emp/${$id}/`,
		type: 'DELETE',
	});
	
	$('.row-' + $id).fadeOut('slow');


	
})


					// get depatments data 

				$.getJSON("http://seifeldeen.pythonanywhere.com/hr/somedata/", function (data) {

				for (var i in data) {
						
						$('.staff-grid-row').append(`
						<div class="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3 row-${data[i].id}" data-employee-id=${data[i].id} >
							<div class="profile-widget">
								<div class="profile-img">
									<a href="profile.html?id=${data[i].id}" class="avatar"><img src="https://seifeldeen.pythonanywhere.com${data[i].ProfileImg}" alt=""></a>
								</div>
								<div class="dropdown profile-action">
									<a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>
									<div class="dropdown-menu dropdown-menu-right">
										<a class="dropdown-item edit_employee"   href="#"    data-id="${data[i].id}" data-bs-toggle="modal" data-bs-target="#edit_employee"><i class="fa fa-pencil m-r-5"></i> تعديل</a>
										<a class="dropdown-item delete_employee" href="#"    data-id="${data[i].id}" data-bs-toggle="modal" data-bs-target="#delete_employee"><i class="fa fa-trash-o m-r-5"></i> حذف</a>
									</div>
								</div>
								<h4 class="user-name m-t-10 mb-0 text-ellipsis"><a href="profile.html?id=${data[i].id}">${data[i].first_name} ${data[i].last_name}</a></h4>
								<div class="small text-muted">${data[i].JobTitle}</div>
							</div>
						</div>
						`);
							}		
				
                             delete_employee();
                        });
				

		