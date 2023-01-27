$("form").submit(function(e){
    e.preventDefault();
    });	
// add active class to nav link 
$('a:contains("الأجازات")').addClass('active');

// Add holidays

$('#add_other_holiday').click(function () {
    
    $holiday_name_AR=$('#holiday_name_AR').val();
    $holiday_name_EN=$('#holiday_name_EN').val();
    $holiday_number=$('#holiday_number').val();
    
    $.ajax({
        url: `http://seifeldeen.pythonanywhere.com/hr/add-leave/`,
        type: 'post',
        data:{
            leave_ar:$holiday_name_AR,
            leave_en:$holiday_name_EN,
            num:$holiday_number,
        },
    
    });
    
})