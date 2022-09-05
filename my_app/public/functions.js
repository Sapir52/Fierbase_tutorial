/**
    * @description      : 
    * @author           : ספיר
    * @group            : 
    * @created          : 05/09/2022 - 13:30:23
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 05/09/2022
    * - Author          : ספיר
    * - Modification    : 
**/
const userId = document.getElementById('userId');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const removeBtn = document.getElementById('removeBtn');

addBtn.addEventListener('click', e => {
    e.preventDefault();
    axios({
        method: 'post',
        url: '/save',
        data: {
            user_id: userId.value,
            first_name: firstName.value,
            last_name: lastName.value,
            age: age.value
        }
    });
});

updateBtn.addEventListener('click', e => {
    e.preventDefault();
    axios({
        method: 'put',
        url: '/update',
        data: {
            user_id: userId.value,
            first_name: firstName.value,
            last_name: lastName.value,
            age: age.value
        }
    });
});

removeBtn.addEventListener('click', e => {
    e.preventDefault();
    axios({
        method: 'delete',
        url: '/remove',
        data: {
            user_id: userId.value
        }
    });
});

usersRef.on('child_added', snapshot => {
     console.log('New data has been added to the database !');
});

usersRef.on('child_changed', snapshot => {
     console.log('Data has been changed !');
});

usersRef.on('child_removed', snapshot => {
     console.log('Data has been removed !');
});

usersRef.on('value', snapshot => {
     console.log('An event occured on the database !');
});

usersRef.on('child_changed', snapshot => {
     console.log(snapshot.val());
});

usersRef.orderByKey().limitToLast(2).on('value', snapshot => {
     console.log(snapshot.val());
});

usersRef.orderByChild('last_name').startAt('J').on('value', snapshot => {
     console.log(snapshot.val());
});

usersRef.orderByValue().limitToLast(2).on('value', snapshot => {
    console.log(snapshot.val());
});