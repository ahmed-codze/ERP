$("form").submit(function(e){
    e.preventDefault();
    });	
// add active class to nav link 
$('a:contains("الأجازات")').addClass('active');

// fix bug of table rows
// var rowCount = document.getElementsByClassName('custom-table').rows.length;
$className=document.querySelector('.row-length');
let tableCount=$('.custom-table').length;

var rowCount=[];
for(var i=1;i<=tableCount;i++)
{
     rowCount[i]  = $('.custom-table').find('tr').length;
    if(rowCount[i]>2)
    {
        $className.classList.remove('.row-length');
        
    }
    console.log('hi',rowCount[1]); 
}
// show weekly holiday

$.getJSON("http://seifeldeen.pythonanywhere.com/hr/list-weakly-leave/", function (data) {
    
    for (var i = 0; i < data.length; i++) 
    {
        
        $('.weekly-holiday-table').append(`
        <tr data-id=${data[i].id} class="row-${data[i].id} ">
                            <td>${i + 1}</td>
                            <td class=" week_holiday_name_td" >${data[i].day}</td>
                            <td class="action-td">
                                <div class="dropdown dropdown-action">
                                    <a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <a class="dropdown-item delete_week_holiday " data-id=${data[i].id} href="#" data-bs-toggle="modal" data-bs-target="#delete_holiday"><i class="fa fa-trash-o m-r-5"></i> حذف</a>
                                </div>
                                </div>
                            </td>
        </tr>
        `);
    }	
    
    delete_week_holiday();
})
// Add week holidays

$('#add-week-holiday-btn').click(function () {
    
    //  $week-holiday=$('#week-holiday-name').val();
    // $holiday_name=$('#week-holiday-name').val();
    
    $.ajax({
        url: `http://seifeldeen.pythonanywhere.com/hr/add-weakly-leave/`,
        type: 'post',
        data:{
            day:$('#week-holiday-name option:selected').val(),
            
        },
        success : function () {
            location.reload();
        }
    });
   
    
})


// delete week holiday


function delete_week_holiday(){
    
    $('.delete_week_holiday').click(function(){
        $id=$(this).attr('data-id');
    
        console.log($(this).attr('data-id'));
    
        $('.delete_holiday_btn').click(function(){
                    
            $.ajax({
                url: `http://seifeldeen.pythonanywhere.com/hr/delete-weakly-leave/${$id}/`,
                type: 'DELETE',
            });
            
            $('.row-' + $id).hide('slow');
        
        
            
        })
        
    })
    
    
}





// get yaerly hoiday 

$.getJSON("http://seifeldeen.pythonanywhere.com/hr/list-yearly-leave/", function (data) {
    
    for (var i = 0; i < data.length; i++) 
    {
        
        $('.yearly-holiday').append(`
        <tr class="yearly-holiday-row-${data[i].id} holiday-upcoming">
        <td>${i + 1}</td>
        <td>${data[i].name}</td>
        <td>${data[i].date}</td>
        <td class="">
            <div class="dropdown dropdown-action">
                <a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>
                <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item delete-yearly-holiday" href="#" data-id=${data[i].id} data-bs-toggle="modal" data-bs-target="#delete_holiday"><i class="fa fa-trash-o m-r-5"></i> حذف</a>
                </div>
            </div>
        </td>
    </tr>
        `);
    }	

    delete_yaerly_holiday();
    
})

// add yearly hoiday 


$('#add_yearly_holiday').click(function () {
    
    $holiday_name   = $('#yearly_holiday_name').val();
    $holiday_date   = $('#yearly_holiday_Date').val();
    
    $.ajax({
        url: `http://seifeldeen.pythonanywhere.com/hr/add-yearly-leave/`,
        type: 'post',
        data:{
            name  : $holiday_name,
            date  : $holiday_date
        },
        success : function () {
            location.reload();
        },

    });

    
})

// delete yaerly holiday 

function delete_yaerly_holiday(){
    
    $('.delete-yearly-holiday').click(function(){
        $id= $(this).attr('data-id');
    

        $('.delete_holiday_btn').click(function(){
                    
            $.ajax({
                url: `http://seifeldeen.pythonanywhere.com/hr/delete-yearly-leave/${$id}/`,
                type: 'DELETE'
            });
            
            $('.yearly-holiday-row-' + $id).hide('slow');
            
        })
        
    })
    
    
}









// Add other holidays

$('#add_other_holiday_btn').click(function () {
    
    $holiday_name_AR=$('#holiday_name_AR').val();
    $holiday_number=$('#holiday_number').val();
    
    $.ajax({
        url: `http://seifeldeen.pythonanywhere.com/hr/add-leave/`,
        type: 'post',
        data:{
            leave_ar:$holiday_name_AR,
            num:$holiday_number
        },
        success : function () {
            location.reload();
        }
    });

    
})


// delete holiday
function delete_holiday(){
    
    $('.delete_holiday').click(function(){
        $id=$(this).attr('data-id');
    
        console.log($(this).attr('data-id'));
    
        $('.delete_holiday_btn').click(function(){
                    
            $.ajax({
                url: `http://seifeldeen.pythonanywhere.com/hr/delete-leave/${$id}/`,
                type: 'DELETE',
            });
            
            $('.row-' + $id).hide('slow');
        
        
            
        })
        
    })
    
    
}

delete_holiday();





// show other holiday

$.getJSON("http://seifeldeen.pythonanywhere.com/hr/available-leaves/", function (data) {

    for (var i = 0; i < data.length; i++) 
    {
        
        $('.other-holiday-table').append(`
        <tr data-id=${data[i].id} class="row-${data[i].id} ">
                            <td>${i + 1}</td>
                            <td class="holiday_ar_td" >${data[i].leave_ar}</td>
                            <td class="holiday_num_td" >${data[i].num}</td>
                            <td class="action-td">
                                <div class="dropdown dropdown-action">
                                    <a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <a class="dropdown-item edit_holiday" data-id=${data[i].id} href="#" data-bs-toggle="modal" data-bs-target="#edit_holiday"><i class="fa fa-pencil m-r-5"></i> تعديل</a>
                                    <a class="dropdown-item delete_holiday " data-id=${data[i].id} href="#" data-bs-toggle="modal" data-bs-target="#delete_holiday"><i class="fa fa-trash-o m-r-5"></i> حذف</a>
                                </div>
                                </div>
                            </td>
                        </tr>
        `);
    }	
    delete_holiday();
    editHoliday ();
})


   
    // edit holiday
    function editHoliday () {

        $(".edit_holiday").click( function () {
            $('.edit_holiday_ar_input').attr('data-id' ,$(this).data("id")).val($(this).parentsUntil('tr').siblings('.holiday_ar_td').text());
            $('.edit_holiday_number_input').attr('data-id' ,$(this).data("id")).val($(this).parentsUntil('tr').siblings('.holiday_num_td').text());
        })


        
    }

    $('.send-edit-btn').click(function () {
        console.log($('.edit_holiday_ar_input').data('id'));
        $.ajax({
            url: `http://seifeldeen.pythonanywhere.com/hr/edit-leave/${$('.edit_holiday_ar_input').data('id')}/`,
            type: 'PUT',
            data: {
                leave_ar : $('.edit_holiday_ar_input').val(),
                num      : $('.edit_holiday_number_input').val(),
            },
            cache : false
            
        });
        $('.row-' + $('.edit_holiday_ar_input').data('id') + ' .holiday_ar_td ').text($('.edit_holiday_ar_input').val());
        $('.row-' + $('.edit_holiday_number_input').data('id') + ' .holiday_num_td ').text($(".edit_holiday_number_input").val());
        location.reload();
    })
    