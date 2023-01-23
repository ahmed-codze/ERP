
// departmnetPage
let addSubmit=document.getElementById('AddSubmit');
let addDepart=document.getElementById('DepartName');
let manegeName=document.getElementById('selectDepart');
let departData;
if(localStorage.department!=null)
{
    departData=JSON.parse(localStorage.department);
}
else
     departData=[];

addSubmit.onclick=function()
{
    let DepartObj=
    {
        manegeName:manegeName.value,
        DepartName:addDepart.value,
    }
	departData.push(DepartObj);
    localStorage.setItem('department', JSON.stringify(departData));
    console.log(departData);
    
    clearDepart();
    showData();
   
}
function clearDepart()
{
    addDepart.value='';
    manegeName.value='';

}
// read data
function showData()
{
    let table='';
    for(let i=0;i<departData.length;i++)
    {
        table+=`
        <tr >
            <td>${i + 1}</td>
            <td>${departData[i].DepartName}</td>
            <td>${departData[i].manegeName}</td>
            <td class="">
            <div class="dropdown dropdown-action">
                    <a href="#" class="action-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="material-icons">more_vert</i></a>
                <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#edit_department"><i class="fa fa-pencil m-r-5"></i> تعديل</a>
                    <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete_department"><i class="fa fa-trash-o m-r-5"></i> حذف</a>
                </div>
                </div>
            </td>
        </tr>
        
        `
        console.log(departData[i]);
    }
    document.getElementById("tbody").innerHTML=table;

}
