$("form").submit(function(e){
    e.preventDefault();
    });	
		
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
// *********************** edit employee *******************************
	function edit_employee()
	{
		$(".edit_employee").click(function(){
			let $id=$(this).attr('data-id');
			// $.ajax({
			// 	url:`http://seifeldeen.pythonanywhere.com/hr/emp-data/${$id}/`,
			// 	type:'get',
			// 	data: first_name=$('#frist_name_edit_input').val(),

				
			// });
			$.getJSON(`http://seifeldeen.pythonanywhere.com/hr/emp-data/${$id}/`,function(data){

				$('#frist_name_edit_input').val(data.first_name);
				$('#last_name_edit_input').val(data.last_name);
				$('#username_edit_input').val(data.username);
				$('#email_edit_input').val(data.email);
				$('#id_edit_input').val(data.emp_id);
				$('.date_edit_input').val(data.date_joined);
				$('#phone_edit_input').val(data.caontact_number);
				// $('#company_edit_input').val(data.emp_id.Department);
				
			});
			$('.send-edit-btn').click(function () {
			
				$.ajax({
					url: `http://seifeldeen.pythonanywhere.com/hr/update-emp/${$id}/`,
					type: 'PUT',
					data: 
					{
						first_name: $('#frist_name_edit_input').val(),
						last_name: $("#last_name_edit_input").val(),
						username: $("#username_edit_input").val(),
						email: $("#email_edit_input").val(),
						emp_id : $("#id_edit_input").val(),
						date_joined : $(".date_edit_input").val(),
						caontact_number : $("#phone_edit_input").val(),
						
					},
					
				});
				// $('.row-' + $('.edit-designation-input').data('id') + ' .job-td ').text($('.edit-designation-input').val());
				// $('.row-' + $('.edit-designation-input').data('id') + ' .department-td ').text($(".edit-department-select-list option:selected").val())
				console.log( 'hi',$id);
			})
			
		}
		);
		




		
		
	}
	

	// flatpickr for Date Input
	var example1 = flatpickr('#flatpickr1');
	var example2 = flatpickr('#flatpickr2');
	
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
			

		$('#AddSubmit').click(function () {

			$theempfirstname 	= $('#empfirstname').val();
			$theemplastname	 	= $('#emplastname').val();
			$theempusername 	= $('#empusername').val();
			$theempmail 		= $('#empmail').val();
			$thepass1			= $('#pass1').val();
			$theempgender		= $('#empgender option:selected').val();
			$theempcontracttype	= $('#empcontracttype option:selected').val();
			$theempaddress 		= $('#empaddress').val();
			$theempphone 		= $('#empphone').val();
			$theempdatebirth 	= $('#flatpickr1').val();
			$theempfamname 		= $('#empfamname').val();
			$theempfamrelation	= $('#empfamrelation').val();
			$theempfamphone 	= $('#empfamphone').val();
			$thecontacttime 	= $('#flatpickr2').val();
			$theempsallary  	= $('#empsallary').val();
			//payment method
			$ibanNumber			= $('#iban-input').val();
			$paypalNumber		= $('#pay-pal-input').val();
			$bankName			= $('#bank-name-input').val();
			$theempbankacc		= $('#bank-account-input').val();

			$theAvjobs			= $('#Avjobs option:selected').data('id');
			$theAvDirectEmp	 	= $('#AvDirectEmp option:selected').data('id');

			$thecvformFile 		= $('#cvformFile').prop('files')[0];
			$theidformFile 		= $('#idformFile').prop('files')[0];
			$theselfpicformFile = $('#selfpicformFile').prop('files')[0];
			$theconractformFile = $('#conractformFile').prop('files')[0];
			$theinsformFile 	= $('#insformFile').prop('files')[0];

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
				
				"bank_account_iban": $ibanNumber,
				"bank_name": $bankName,
				"paypal_email": $paypalNumber,
				"bank_account_name": $theempbankacc,
			
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

											
		});


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
				
				

				edit_employee();
					delete_employee();
			});
			$iban_Value=document.getElementById('iban').value;
			$paypal_Value=document.getElementById('paypal').value;
			console.log($iban_Value);
			$('input[type="checkbox"]').on('change', function() {
				$('input[type="checkbox"]').not(this).prop('checked', false);
			 });
		function paymentMethod()
		{
			// if(cheaked==true && $iban_Value=='bank' )
			// {
			// 	$('.iban-input').fadeIn();
			// }
			// if(cheaked==true && $paypal_Value=='paypal')
			// {
			// 	$('.paypal-input').fadeIn();

			// }
			// 
			$(document).ready(function(){
				$('.select_payment').on('change',function(){
					$('.payment_option').hide();
					$("#"+$(this).val()).fadeIn('fast');

				}).change();



			});

		}
		paymentMethod();
		
		