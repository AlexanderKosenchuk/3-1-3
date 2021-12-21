const url = 'http://localhost:8080/admin/all'



const addUserForm = document.querySelector('.new-user-form');
const deleteUserForm = document.querySelector('.delete-form-group')

const userList = document.querySelector('.thead');
const tableFoUsers = document.querySelector('tbody')

const nameAddValue = document.getElementById('nameAdd')
const surnameAddValue = document.getElementById('surnameAdd')
const ageAddValue = document.getElementById('ageAdd')
const emailAddValue = document.getElementById('emailAdd')
const passwordAddValue = document.getElementById('passwordAdd')
const roleAddValue = document.getElementById('RoleAdd')
let result = ''

const idDelValue = document.getElementById('idD')
const nameDelValue = document.getElementById('nameD')
const surnameDelValue = document.getElementById('surnameD')
const ageDelValue = document.getElementById('ageD')
const emailDelValue = document.getElementById('emailD')
const roleDelValue = document.getElementById('RoleD')


const formModalEdit = document.querySelector('form')
const idEdit = document.getElementById('id')
const nameEdit = document.getElementById('name')
const lastnameEdit = document.getElementById('surname')
const ageEdit = document.getElementById('age')
const emailEdit = document.getElementById('email')
const passwordEdit = document.getElementById('password')
const roleEdit = document.getElementById('Role')

let opcion = ''


// $(async function () {
//     await getTableWithUsers();
//     // getNewUserForm();
//    // await getDefaultModal();
//     // addNewUser();
// })
//
//
// const userFetchService = {
//     head: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Referer': null
//     },
//
//     showAllUsers: async () => await fetch(url),
//
// }
//
// async function getTableWithUsers() {
//     let table = $('#UsersTable tbody');
//     table.empty();
//
//     await userFetchService.showAllUsers()
//         .then(res => res.json())
//         .then(users => {
//             users.forEach(user => {
//                 let tableFilling = `$(
//                         <tr>
//                             <td>${user.id}</td>
//                             <td>${user.name}</td>
//                             <td>${user.surname}</td>
//                             <td>${user.age}</td>
//                             <td>${user.email}</td>
//                             <td id="roles${user.id}">${user.roles.map(r => r.role).join(', ')}</td>
//                             <td>
//                                 <button type="button" id="editButton" data-userid="${user.id}" data-action="edit" class="btn btn-info"
//                                 data-toggle="modal" data-target="#EditModal">Edit</button>
//                             </td>
//                             <td>
//                                 <button type="button" data-userid="${user.id}" data-action="delete" class="btn btn-danger"
//                                 data-toggle="modal" data-target="#MyModal">Delete</button>
//                             </td>
//                         </tr>
//                 )`;
//                 table.append(tableFilling);
//             })
//         })
//
//
// }


//function table
const Mytable = (admin) => {
    admin.forEach(user => {
        result += `<tr id="tr-table">
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.surname}</td>
                        <td>${user.age}</td>
                        <td>${user.email}</td>     
                        <td id="roles${user.id}">${user.roles.map(r => r.role).join(', ')}</td>
                        <td>
                            <button type="button" id="editButton" data-userid="${user.id}" data-action="edit" class="btn btn-info" 
                            data-toggle="modal" data-target="#EditModal">Edit</button>
                        </td>
                        <td>
                            <button type="button" id="deleteButton" data-userid="${user.id}" data-action="delete" class="btn btn-danger" 
                            data-toggle="modal" data-target="#DeleteModal">Delete</button>
                        </td>  
                   </tr>    
                `
    });
    tableFoUsers.innerHTML = result

}
//заполняем табличку данными юзеров
fetch(url)
    .then(response => response.json())
    .then(data => Mytable(data))
    .catch(error => console.log(error))


tableFoUsers.addEventListener('click', (e) => {
    e.preventDefault();
    let delButtonIsPressed = e.target.id == 'deleteButton';
})





//отработка Add
addUserForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/admin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameAddValue.value,
            surname: surnameAddValue.value,
            age: ageAddValue.value,
            email: emailAddValue.value,
            password: passwordAddValue.value,
            roles: Array.from(roleAddValue.options)
                .filter(option => option.selected)
                .map(option => option.value)
        })
    })
        .then(res => res.json())
        .then(data => {
            const array = []
            array.push(data)
            Mytable(array)
            $('#user-table-all-tab').tab('show')
            $('#nameAdd').empty().val('')
            $('#surnameAdd').empty().val('')
            $('#ageAdd').empty().val('')
            $('#emailAdd').empty().val('')
            $('#passwordAdd').empty().val('')

        })
})

const on = (element, event, selector, handler) => {
    console.log(element)
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

//Заполняем и вызваем модальное окно Delete
on(document, 'click', '.btn-danger', e => {
    const DeleteModal = $('#DeleteModal').modal()
    const fill = e.target.parentNode.parentNode
    const id = fill.firstElementChild.innerHTML
    const firstNameDel = fill.children[1].innerHTML
    const lastNameDel = fill.children[2].innerHTML
    const ageDel = fill.children[3].innerHTML
    const emailDel = fill.children[4].innerHTML
    const rolesDel = fill.children[5].innerHTML
    idDelValue.value = id
    nameDelValue.value = firstNameDel
    surnameDelValue.value = lastNameDel
    ageDelValue.value = ageDel
    emailDelValue.value = emailDel
    roleDelValue.value = rolesDel
    DeleteModal.show()
})


$('#deleteButtonToDb').on('click', (e) => {
    e.preventDefault();
    let url = 'http://localhost:8080/admin'
    let userId = $('#idD').val();
    console.log(userId)
    fetch(`${url}/${userId}`, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(data => {
            const array = []
            array.push(data)
            Mytable(array)
            $('#tr-table' + userId).remove();
            $('#DeleteModal').modal('hide');
            $('#user-table-all-tab').tab('show');
        })

});



//Заполняем и вызваем модальное окно Edit
let idForm = 0
on(document, 'click', '.btn-info', e => {
    const EditModal = $('#EditModal').modal()
    const fill = e.target.parentNode.parentNode
    idForm = fill.children[0].innerHTML
    const firstNameForm = fill.children[1].innerHTML
    const lastNameForm = fill.children[2].innerHTML
    const ageForm = fill.children[3].innerHTML
    const emailForm = fill.children[4].innerHTML
    const passForm = fill.children[5].innerHTML
    const rolesForm = fill.children[6].innerHTML
    idEdit.value = idForm
    nameEdit.value = firstNameForm
    lastnameEdit.value = lastNameForm
    ageEdit.value = ageForm
    emailEdit.value = emailForm
    passwordEdit.value = passForm
    roleEdit.value = rolesForm
    opcion = 'edit'
    EditModal.show()
})

//
// fetch('http://localhost:8080/admin/' + idForm, {
//     method: 'PATCH',
//     headers: {
//         'Content-Type':'application/json'
//     },
//     body: JSON.stringify({
//         name: nameEdit.value,
//         surname: lastnameEdit.value,
//         age: ageEdit.value,
//         email: emailEdit.value,
//         password: passwordEdit.value,
//         Role: roleEdit.value
//     })
// })
// .then( res => res.json() )
// .then( res => location.reload())
//
// EditModal.hide()