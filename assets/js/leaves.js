

//  console.log($('.dropdown-menu  .dropdown-item:selected').val());


$.getJSON('https://seifeldeen.pythonanywhere.com/hr/list-leave-request-managment/', function (data) {

    
    
    for ( i in data) {
       
					$('.holiday-list-table').append(`
                    <tr class="row=${data[i].id}">
                    <td>
                        <h2 class="table-avatar">
                            <a href="profile.html" class="avatar"><img alt="" src="http://seifeldeen.pythonanywhere.com/${data[i].the_leave.user.ProfileImg}"></a>
                            <a href="#">${data[i].the_leave.user.first_name  } ${data[i].the_leave.user.last_name  }  <span>${data[i].the_leave.user.JobTitle  }</span> </a>
                            
                           
                        </h2>
                    </td>
                    <td>${data[i].the_leave.leave_name}</td>
                    
                    
                    <td>${data[i].number_of_days_requested} ايام</td>
                   
                    
                    <td class="text-center">
                        <div class="dropdown action-label">
                            <a class="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            
                            <i class="fa fa-dot-circle-o "id="currant_state"></i> 
                            </a>
                             <div class="dropdown-menu dropdown-menu-right ">
                            
                                <li>
                                <a  value="1" class="dropdown-item holiday_status" href="#"    data-id="${data[i].id}" data-bs-toggle="modal"data-bs-target="#approve_leave"><i class="fa fa-dot-circle-o text-success"></i> موافقة</a>
                                </li> 
                                <li>
                                <a value="0"  class="dropdown-item holiday_status approve-btn"  href="#"  data-id="${data[i].id}"><i class="fa fa-dot-circle-o text-danger"></i> رفض</a>
                                </li> 
                            
                            
                            </div>
                            
                                </td>
                                <td class="text-center">
                                <div class="dropdown dropdown-action">
                                <a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <div class="dropdown-item">
                                        <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_approve"><i class="fa fa-trash-o m-r-5"></i> حذف</a>
                                     </div>  
                                    <div class="dropdown-item">
                                        <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_leave"><i class="fa fa-pencil m-r-5"></i> تعديل</a>
                                    </div>  
                                </div>
                            </div>
                                </td>
                                </tr>
                                `)
                                if(data[i].accepted== true)
                                {
                                    document.getElementById("currant_state").innerHTML = " موافقه"; 
                                    document.getElementById("currant_state").classList.add("text-success");
                                }
                                else if(data[i].accepted==false)
                                {
                                    document.getElementById("currant_state").innerHTML = "رفض"; 
                                    document.getElementById("currant_state").classList.add("text-danger");
                                    document.getElementById("currant_state").classList.remove("text-success");
                                    document.getElementById("currant_state").classList.remove("text-purple");
                                    
                                }
                                else
                                {
                                    document.getElementById("currant_state").innerHTML = "معلقة"; 
                                    document.getElementById("currant_state").classList.add("text-purple");
                                    document.getElementById("currant_state").classList.remove("text-danger");
                                    document.getElementById("currant_state").classList.remove("text-sucsess");
                                }

                            }
                            add_status();
			})
        function add_status()
        {
             
            $('.holiday_status').click(function(){
                $id=$(this).attr('data-id');    
                $status_value=$(this).attr('value');
                
            
                 $('.approve-btn').click(function () 
                 {
			
                    $.ajax({
                        url: `https://seifeldeen.pythonanywhere.com/hr/response-to-leave-request-managment/${$id}/`,
                        type: 'PUT',
                        data: 
                        {
                            accepted:$status_value,
                        },
                        success: function(){  
                            // location.reload()
                            console.log( 'done');
                        },
                    });
                    // $('.row-' + $('.edit-designation-input').data('id') + ' .job-td ').text($('.edit-designation-input').val());
                    // $('.row-' + $('.edit-designation-input').data('id') + ' .department-td ').text($(".edit-department-select-list option:selected").val())
                }); 
                    
                console.log( $status_value);
            })
        }
       
