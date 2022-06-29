'use strict'
let updateButton = document.querySelector('update');
let updateForm = document.querySelector('.updateForm')
updateButton.addEventListener('onClick', (e)=>{
    e.preventDefault();
    updateForm.classList.remove('show');
})