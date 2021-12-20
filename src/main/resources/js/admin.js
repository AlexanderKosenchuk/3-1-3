const url = 'http://localhost:8080/admin/all'

// $(async function () {
//     await getTableWithUsers();
//     // getNewUserForm();
//     await getDefaultModal();
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

const addUserForm = document.querySelector('.new-user-form');

const userList = document.querySelector('.thead');
const tableFoUsers = document.querySelector('tbody')
let result = ''

const EditModal = $('#MyModal').modal()
const formModalEdit = document.querySelector('form')
const idEdit = document.getElementById('id')
const nameEdit = document.getElementById('name')
const lastnameEdit = document.getElementById('surname')
const ageEdit = document.getElementById('age')
const emailEdit = document.getElementById('email')
const passwordEdit = document.getElementById('password')
const roleEdit = document.getElementById('Role')

let opcion = ''

newUserBtn.addEventListener('click', ()=> {
    nameEdit.value = ''
    lastnameEdit.value = ''
    ageEdit.value = ''
    emailEdit.value = ''
    passwordEdit.value = ''
    roleEdit.value = ''
    opcion = 'Add new user'
})

//function table
const Mytable = (admin) => {
    admin.forEach(user => {
        result += `<tr>
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
    .then( response => response.json() )
    .then( data => Mytable(data) )
    .catch( error => console.log(error))


const on = (element, event, selector, handler) => {
    console.log(element)
    element.addEventListener(event, e => {
        if(e.target.closest(selector)) {
            handler(e)
        }
    })
}

//отработка кнопки delete
on(document, 'click', '.btn-danger', e => {
    const fill = e.target.parentNode.parentNode
    const id = fill.firstElementChild.innerHTML
    alertify.confirm(
    function(){
        fetch('http://localhost:8080/admin/' + id, {
            method: 'DELETE'
        })
        .then( res => res.json() )
        .then( () => location.reload())
    })
})

//заполняем модальное окно для Edit
let idForm = 0
on(document, 'click', '.btn-info', e => {
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


//отработка Add или Edit(на сохранение на сервер)
addUserForm.addEventListener('submit', (e) =>{
    e.preventDefault()
        fetch('http://localhost:8080/admin/', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name: nameEdit.value,
                lastname: lastnameEdit.value,
                age: ageEdit.value,
                email: emailEdit.value,
                password: passwordEdit.value,
                role: roleEdit.value
            })
        })
            .then( res => res.json() )
            .then( data => {
                const nw = []
                nw.push(data)
                Mytable(nw)
            })

    // if(opcion=='edit'){
    //     fetch('http://localhost:8080/admin/' + idForm, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type':'application/json'
    //         },
    //         body: JSON.stringify({
    //             nameEdit: nameEdit.value,
    //             lastnameEdit: lastnameEdit.value,
    //             ageEdit: ageEdit.value,
    //             emailEdit: emailEdit.value,
    //             passwordEdit: passwordEdit.value,
    //             roleEdit: roleEdit.value
    //         })
    //     })
    //     .then( res => res.json() )
    //     .then( res => location.reload())
    // }
    EditModal.hide()
})



// fetch(url)
//     .then(res =>res.json())
//     .then(data => console.log(data))
//
// async function getAllUsers() {
//     let response = await fetch('http://localhost:8080/admin/all').then(res => res.json())
//     let content = await response.json()
//     console.log(content)
// }


// $(document).on('click', '.edit', function () {
//     const user_id = $(this).attr('data-id');
//     console.log("editUserId: " + JSON.stringify(user_id));
//     $.ajax({
//         url: '/admin/' + user_id,
//         method: 'GET',
//         dataType: 'json',
//         success: function (user) {
//             $('#id').val(user.id);
//             $('#name').val(user.username);
//             $('#surname').val(user.lastName);
//             $('#email').val(user.email);
//             $('#password').val(user.password);
//             $('#Role').empty();
//             roleList.map(role => {
//                 let flag = user.authorities.find(item => item.id === role.id) ? 'selected' : '';
//                 $('#Role').append('<option id="' + role.id + '" ' + flag + ' name="' + role.name + '" >' + '</option>')
//             })
//         }
//     });
// });



// async function getDefaultModal() {
//     $('#MyModal').modal({
//         keyboard: true,
//         backdrop: "static",
//         show: false
//     }).on("show.bs.modal", (event) => {
//         let thisModal = $(event.target);
//         let userid = thisModal.attr('data-userid');
//         let action = thisModal.attr('data-action');
//         switch (action) {
//             case 'edit':
//                 editUser(thisModal, userid);
//                 break;
//             case 'delete':
//                 deleteUser(thisModal, userid);
//                 break;
//         }
//     }).on("hidden.bs.modal", (e) => {
//         let thisModal = $(e.target);
//         thisModal.find('.modal-title').html('');
//         thisModal.find('.modal-body').html('');
//         thisModal.find('.modal-footer').html('');
//     })
// }
//
// async function editUser(modal, id) {
//     let userBeforeUpdate = await userFetchService.findOneUserById(id);
//     let user = userBeforeUpdate.json();
//
//     modal.find('.modal-title').html('Edit user');
//
//     let editButton = `<button  class="btn btn-success" id="editButton">Edit</button>`;
//     let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
//     modal.find('.modal-footer').append(editButton);
//     modal.find('.modal-footer').append(closeButton);
//
//     user.then(user => {
//         let bodyForm = `
//             <form class="form-group" id="editUser">
//                 <input class="form-control" type="text" id="id" name="id" value="${user.id}" readonly><br>
//                 <input class="form-control" type="text" id="name" value="${user.name}"><br>
//                 <input class="form-control" type="text" id="surname" value="${user.surname}"><br>
//                 <input class="form-control" type="number" id="age" value="${user.age}"><br>
//                 <input class="form-control" type="email" id="email" value="${user.email}"><br>
//                 <input class="form-control" type="password" id="password"><br>
//                 <input class="form-control" id="Role" value="${user.roles}">
//             </form>
//         `;
//         modal.find('.modal-body').append(bodyForm);
//     })
//
//     $("#editButton").on('click', async () => {
//         let id = modal.find("#id").val().trim();
//         let name = modal.find("#name").val().trim();
//         let lastname = modal.find("#surname").val().trim();
//         let age = modal.find("#age").val().trim();
//         let email = modal.find("#email").val().trim();
//         let password = modal.find("#password").val().trim();
//         let userRoles = modal.find("#Role").val().trim();
//
//         let data = {
//             id: id,
//             name: name,
//             surname: lastname,
//             age: age,
//             email: email,
//             password: password,
//             roles: userRoles
//
//         }
//         const response = await userFetchService.editUser(data, id);
//
//         if (response.ok) {
//             await getTableWithUsers();
//             modal.modal('hide');
//         } else {
//             let body = await response.json();
//             let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="sharaBaraMessageError">
//                             ${body.info}
//                             <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//                                 <span aria-hidden="true">&times;</span>
//                             </button>
//                         </div>`;
//             modal.find('.modal-body').prepend(alert);
//         }
//     })
// }
//
//
// // удаляем юзера из модалки удаления
// async function deleteUser(modal, id) {
//     await userFetchService.deleteUser(id);
//     await getTableWithUsers();
//     modal.find('.modal-title').html('');
//     modal.find('.modal-body').html('User was deleted');
//     let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
//     modal.find('.modal-footer').append(closeButton);
// }







