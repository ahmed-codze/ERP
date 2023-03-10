// add active class to nav link 
	
$('a:contains("الوظائف")').addClass('active');

// add new designation 
$('.add-new-job-btn').click(function () {
    $JobTitlevar 	= $('.add-job-input').val();
    $Departmentvar = $('.departments-options option:selected').data('department');
    $managementVar = $('.departments-options option:selected').data('management');
    
    $.post('http://seifeldeen.pythonanywhere.com/hr/add-job/', {
        JobTitle : $JobTitlevar,
        Department : $Departmentvar,
        management : $managementVar
    })
        
    location.reload();
})



// delete designation 
function deleteDesignation() {
    $('.delete-job-btn').removeAttr('data-id');
$('.delete-designation').click(function () {
        $('.delete-job-btn').attr('data-id', $(this).data('id'));
})
}

// send delete request 

$('.delete-job-btn').click(function () {
    $.ajax({
        url: `http://seifeldeen.pythonanywhere.com/hr/delete-job/${$('.delete-job-btn').attr('data-id')}/`,
        type: 'DELETE',
    });
    $('.row-' + $('.delete-job-btn').attr('data-id')).hide('slow');
    $('.delete-job-btn').removeAttr('data-id');
    deleteDesignation();
    
})



// get designations data 

$.getJSON("http://seifeldeen.pythonanywhere.com/hr/available-jobs/", function (data) {

    for (var i = 0; i < data.length; i++) 
    {
        if (data[i].Department != null) {
        $('.designations-table').append(`
        <tr data-id=${data[i].id} class="row-${data[i].id}">
                            <td>${i + 1}</td>
                            <td class="job-td">${data[i].JobTitle}</td>
                            <td class="department-td" data-department_id=${data[i].Department.id} >${data[i].Department.Department}</td>
                            <td class="management-td" >${data[i].Department.management}</td>
                            <td class="action-td">
                                <div class="dropdown dropdown-action">
                                    <a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <a class="dropdown-item edit-designation" data-id=${data[i].id} href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i class="fa fa-pencil m-r-5"></i> تعديل</a>
                                    <a class="dropdown-item delete-designation" data-id=${data[i].id} href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i class="fa fa-trash-o m-r-5"></i> حذف</a>
                                </div>
                                </div>
                            </td>
                        </tr>
        `);
    } else {
        $('.designations-table').prepend(`
        <tr data-id=${data[i].id} class="row-${data[i].id}">
                            <td>${i + 1}</td>
                            <td class="job-td">${data[i].JobTitle}</td>
                            <td class="department-td" data-department_id= ></td>
                            <td class="management-td">${data[i].management}</td>
                            <td class="action-td">
                                <div class="dropdown dropdown-action">
                                    <a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <a class="dropdown-item edit-designation" data-id=${data[i].id} href="#" data-bs-toggle="modal" data-bs-target="#edit_designation"><i class="fa fa-pencil m-r-5"></i> تعديل</a>
                                    <a class="dropdown-item delete-designation" data-id=${data[i].id} href="#" data-bs-toggle="modal" data-bs-target="#delete_designation"><i class="fa fa-trash-o m-r-5"></i> حذف</a>
                                </div>
                                </div>
                            </td>
                        </tr>
        `);
    }
    }	
            
            editDesignation();
            deleteDesignation();
            
    });


            
// get departments to add new job 
$.getJSON("http://seifeldeen.pythonanywhere.com/hr/departments/", function (data) {
    
    for (var i = 0; i < data.length; i++) 
    {
        
        $('.departments-options').append(`
            <option value="${data[i].Department}" data-id=${data[i].id} data-department="${data[i].id}" data-management=""  >${data[i].Department}</option>
        `);
        $('.edit-department-select-list').append(`
        <option value="${data[i].Department}" data-id=${data[i].id} data-department="${data[i].id}" data-management=""  >${data[i].Department}</option>
        `);
    }
});

//get mangement to add department
$.getJSON("http://seifeldeen.pythonanywhere.com/hr/available-managments/",function(data)
{

    for(var i=0;i<data.length;i++)
    {

        $('.departments-options').append(`<option value="${data[i].management}" data-department="" data-management="${data[i].id}"  data-id=${data[i].id} >${data[i].management}</option>`);
        $('.edit-department-select-list').append(`<option value="${data[i].management}" data-department="" data-management="${data[i].id}" data-id=${data[i].id} >${data[i].management}</option>`);
    }	


}

);

// edit designation 
function editDesignation () {

    $(".edit-designation").click( function () {
        $('.edit-designation-input').attr('data-id' ,$(this).data("id")).val($(this).parentsUntil('tr').siblings('.job-td').text());
        
        if ($(this).parentsUntil('tr').siblings('.department-td').text() != '' ){
        $(".edit-department-select-list option[value='"+ $(this).parentsUntil('tr').siblings('.department-td').text() +"']").attr("selected", true);
        $('.select2-selection__rendered').text($(this).parentsUntil('tr').siblings('.department-td').text());
        } else {
            $(".edit-department-select-list option[value='"+ $(this).parentsUntil('tr').siblings('.management-td').text() +"']").attr("selected", true);
            $('.select2-selection__rendered').text($(this).parentsUntil('tr').siblings('.management-td').text());
        
        }
    })
    
}

// send edit designation data 

$('.send-edit-btn').click(function () {
    $id = $('.edit-designation-input').data('id');
    $.ajax({
        url: `http://seifeldeen.pythonanywhere.com/hr/edit-job/${$id}/`,
        type: 'PUT',
        data: {
            JobTitle : $('.edit-designation-input').val(),
            Department : $(".edit-department-select-list option:selected").data('department'),
            management : $(".edit-department-select-list option:selected").data('management')
        },
        success : function () {
            location.reload();
        }
        
    });
    $('.row-' + $('.edit-designation-input').data('id') + ' .job-td ').text($('.edit-designation-input').val());
    $('.row-' + $('.edit-designation-input').data('id') + ' .department-td ').text($(".edit-department-select-list option:selected").val())

})

$("form").submit(function(e){
e.preventDefault();
});	



