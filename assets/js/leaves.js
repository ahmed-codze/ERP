$('a:contains("عرض الاجازات")').addClass('active');

//  console.log($('.dropdown-menu  .dropdown-item:selected').val());


$.getJSON('https://seifeldeen.pythonanywhere.com/hr/list-leave-request-managment/', function (data) {

    
    
    for ( i in data) {
       
					$('.holiday-list-table').append(`
                    <tr class="row=${data[i].id}">
                    <td>
                        <h2 class="table-avatar">
                            <a href="profile.html" class="avatar"><img alt="" src="http://seifeldeen.pythonanywhere.com/${data[i].the_leave.user.ProfileImg}"></a>
                            <a href="#">${data[i].the_leave.user.first_name  } ${data[i].the_leave.user.last_name  } | <span style="color:red">${data[i].the_leave.user.JobTitle  }</span> </a>
                            
                           
                        </h2>
                    </td>
                    <td>${data[i].the_leave.leave_name}</td>
                    
                    
                    <td>${data[i].number_of_days_requested} ايام</td>
                   
                    
                    <td class="text-center">
                        <div class="dropdown action-label">
                            <a class="btn btn-white btn-sm btn-rounded dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            
                            <i class="fa fa-dot-circle-o "id="currant_state-${data[i].id}"></i> 
                            </a>
                             <div class="dropdown-menu dropdown-menu-right " id="cahnge-state-${data[i].id}">
                            
                                <li>
                                <a  value="1" class="dropdown-item holiday_status" href="#"    data-id="${data[i].id}" data-bs-toggle="modal"data-bs-target="#approve_leave"><i class="fa fa-dot-circle-o text-success"></i> موافقة</a>
                                </li> 
                                <li>
                                <a value="0"  class="dropdown-item holiday_status approve-btn"  href="#"  data-id="${data[i].id}" data-bs-toggle="modal"data-bs-target="#delete_approve" ><i class="fa fa-dot-circle-o text-danger"></i> رفض</a>
                                </li> 
                            
                            
                            </div>
                            
                                </td>
                                </tr>
                                `)
                                if(data[i].accepted== true)
                                {
                                    document.getElementById("currant_state-"+ data[i].id).innerHTML = " موافقه"; 
                                    document.getElementById("currant_state-"+ data[i].id).classList.add("text-success");
                                    document.getElementById("cahnge-state-"+ data[i].id).remove();
                                }
                                else if(data[i].accepted==false)
                                {
                                    document.getElementById("currant_state-"+ data[i].id).innerHTML = "رفض"; 
                                    document.getElementById("currant_state-"+ data[i].id).classList.add("text-danger");
                                    document.getElementById("cahnge-state-"+ data[i].id).remove();
                                    
                                }
                                else
                                {
                                    document.getElementById("currant_state-"+ data[i].id).innerHTML = " معلقة "; 
                                    document.getElementById("currant_state-"+ data[i].id).classList.add("text-purple");
                                }

                            }
                            add_status();
			})


        function add_status()
        {
             
            $('.holiday_status').click(function(){
                $id=$(this).attr('data-id');    
                $status_value=$(this).attr('value');

                console.log( $id);
                console.log( $status_value);


                
            
                $('.continue-btn').click(function () 
                 {
			
                    $.ajax({
                        url: `https://seifeldeen.pythonanywhere.com/hr/response-to-leave-request-managment/${$id}/`,
                        type: 'PUT',
                        data: 
                        {
                            accepted:$status_value,
                        },
                        success: function(){  
                            location.reload()
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) { 
                            obj = XMLHttpRequest.responseJSON;
                            console.log(obj)
    
                        }    
                    });
                    
                }); 
            })
        }
       
