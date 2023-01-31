$("form").submit(function(e){
    e.preventDefault();
    });	
// add active class to nav link 
$('a:contains("الأجازات")').addClass('active');


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
    
    });
    // console.log($holiday_name);
    location.reload();
    
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
    
    });
    location.reload();
    
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
delete_holiday();


   
    // edit hpliday
function editHoliday () {

    $(".edit_holiday").click( function () {
        $('.edit_holiday_ar_input').attr('data-id' ,$(this).data("id")).val($(this).parentsUntil('tr').siblings('.holiday_ar_td').text());
        $('.edit_holiday_number_input').attr('data-id' ,$(this).data("id")).val($(this).parentsUntil('tr').siblings('.holiday_num_td').text());
    })
    
}
$('.send-edit-btn').click(function () {
    $id = $('.edit_holiday_ar_input').data('id');
    $.ajax({
        url: `http://seifeldeen.pythonanywhere.com/hr/edit-leave/${$id}/`,
        type: 'PUT',
        data: {
            leave_ar : $('.edit_holiday_ar_input').val(),
            num      : $('.edit_holiday_number_input').val(),
        },
        
    });
    $('.row-' + $('.edit_holiday_ar_input').data('id') + ' .holiday_ar_td ').text($('.edit_holiday_ar_input').val());
    $('.row-' + $('.edit_holiday_number_input').data('id') + ' .holiday_num_td ').text($(".edit_holiday_number_input").val());
})




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