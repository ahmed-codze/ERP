
    // flatpickr for Date Input
var example1 = flatpickr('#flatpickr1');
var example2 = flatpickr('#flatpickr2');
// add active class
$('a:contains("عرض الموظفين")').addClass('active');


function delete_employee(){

    $('.delete_employee_list').click(function()
    {
        $id= $(this).attr('data-id');

        console.log($(this).attr('data-id'));

    })

  
}
function edit_employeeList()
  {
    $(".edit_employee_list").click(function(){
        let $id=$(this).attr('data-id');
       
        $.getJSON(`http://seifeldeen.pythonanywhere.com/hr/emp-data/${$id}/`,function(data){

            $('#frist_name_editList_input').val(data.first_name);
            $('#last_name_editList_input').val(data.last_name);
            $('#username_editList_input').val(data.username);
            $('#email_editList_input').val(data.email);
             $('#id_editList_input').val(data.emp_id);
            $('.date_editList_input').val(data.date_joined);
            $('#phone_editList_input').val(data.caontact_number);
            // $('#company_editList_input').val(data.emp_id.Department);
            console.log(data.id.Department);
        });
        
    }
    );

  }
	$('.delete_employee_list_btn').click(function(){
						
		$.ajax({
		url: `http://seifeldeen.pythonanywhere.com/hr/delete-emp/${$id}/`,
		type: 'DELETE',
	});
	
	$('.row-' + $id).fadeOut('slow');
	
		})

			// get employees data for main table 

			$.getJSON('http://seifeldeen.pythonanywhere.com/hr/somedata/', function (data) {
				for ( i in data) {
					$('.employees-table').append(`
					<tr class="row-${data[i].id}">
											<td>
												<h2 class="table-avatar">
													<a href="profile.html?id=${data[i].id}" class="avatar"><img alt="" src="http://seifeldeen.pythonanywhere.com${data[i].ProfileImg}"></a>
													<a href="profile.html?id=${data[i].id}">${data[i].first_name} ${data[i].last_name} </a>
												</h2>
											</td>
											<td>${data[i].emp_id}</td>
											<td>${data[i].email}</td>
											<td>${data[i].caontact_number}</td>
											<td>${data[i].date_joined}</td>
											<td>${data[i].JobTitle}</td>
											<td class="text-end">
												<div class="dropdown dropdown-action">
													<a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>
													<div class="dropdown-menu dropdown-menu-right">
														<a class="dropdown-item edit_employee_list " data-id="${data[i].id}" href="#" data-bs-toggle="modal" data-bs-target="#edit_employee"><i class="fa fa-pencil m-r-5"></i> Edit</a>
														<a class="dropdown-item delete_employee_list " data-id="${data[i].id}" href="#" data-bs-toggle="modal" data-bs-target="#delete_employee"><i class="fa fa-trash-o m-r-5"></i> Delete</a>
													</div>
												</div>
											</td>
										</tr>
					`)
				}
                edit_employeeList();
				delete_employee();
			})
			

			$.getJSON("http://seifeldeen.pythonanywhere.com/hr/available-jobs/",function(data)
					//get mangement to add department
					{

						for(var i=0;i<data.length;i++)
						{

							$('#Avjobs').append(`<option value="${data[i].JobTitle}"  data-id=${data[i].id} >${data[i].JobTitle}</option>`);
						}	
					
					
					}
				
				);

			$.getJSON("http://seifeldeen.pythonanywhere.com/hr/somedata/",function(data)
					//get mangement to add department
					{

						for(var i=0;i<data.length;i++)
						{

							$('#AvDirectEmp').append(`<option value="${data[i].username}"  data-id=${data[i].id} >${data[i].username}</option>`);
						}	
					
					
					}
				
				);



			$('#AddSubmit').on('click', function () {

			if ($('#pass1').val() == $('#confirm_pass').val()) {

				$('.loading-overlay').show();

				$theempfirstname 		= $('#empfirstname').val();
				$theemplastname	 	= $('#emplastname').val();
				$theempusername 		= $('#empusername').val();
				$theempmail 			= $('#empmail').val();
				$thepass1				= $('#pass1').val();
				$theempgender			= $('#empgender option:selected').val();
				$theempcontracttype	= $('#empcontracttype option:selected').val();
				$theempaddress 		= $('#empaddress').val();
				$theempphone 			= $('#empphone').val();
				$theempdatebirth 		= $('#flatpickr1').val();
				$theempfamname 		= $('#empfamname').val();
				$theempfamrelation		= $('#empfamrelation').val();
				$theempfamphone 		= $('#empfamphone').val();
				$thecontacttime 		= $('#flatpickr2').val();
				$theempsallary  		= $('#empsallary').val();
				$theempbankacc			= $('#empbankacc').val();
				$theAvjobs			 	= $('#Avjobs option:selected').data('id');
				$theAvDirectEmp	 	= $('#AvDirectEmp option:selected').data('id');

				$thecvformFile = $('#cvformFile').prop('files')[0];
				$theidformFile = $('#idformFile').prop('files')[0];
				$theselfpicformFile = $('#selfpicformFile').prop('files')[0];
				$theconractformFile = $('#conractformFile').prop('files')[0];
				$theinsformFile = $('#insformFile').prop('files')[0];

				thedata={
					"family_relation": $theempfamrelation,
					"address": $theempaddress,
					"username": $theempusername,
					"password" : $thepass1 ,
					"first_name": $theempfirstname,
					"last_name": $theemplastname,
					"email": $theempmail,
					"birthday": $theempdatebirth,
					"gender": $theempgender,
					"caontact_number": $theempphone,
					"family_name": $theempfamname,
					"emergancy_contact": $theempfamphone,
					"bank_account": $theempbankacc,
					"JobTitle": $theAvjobs,
					"emp_type": $theempcontracttype,
					"salary": $theempsallary,
					"the_contract_time": $thecontacttime,
					"direct_manager": $theAvDirectEmp ,

					"ProfileImg": $theselfpicformFile,
					"CV": $thecvformFile,
					"national_id": $theidformFile,
					"insurance": $theinsformFile,
					"contract_copy": $theconractformFile,

				}
				var fd = new FormData();
				for ( var key in thedata ) {
					fd.append(key, thedata[key]);
				}

				$.ajax({
					// Your server script to process the upload
					url: 'http://seifeldeen.pythonanywhere.com/hr/add-emp/',
					type: 'POST',
					dataType : "json",
					// Form data
					data: fd,

					// Tell jQuery not to process data or worry about content-type
					// You *must* include these options!
					cache: false,
					contentType: false,
					processData: false,


					success: function(){  
						location.reload()
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) { 
						console.log(XMLHttpRequest.responseJSON)
					}

			});

			} else {
			alert('كلمات المرور غير متطابقة');
			}

												
			});

			


