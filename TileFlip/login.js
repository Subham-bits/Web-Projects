const names = document.querySelector('#names')
const username = document.querySelector('#username')
const submitbtn = document.querySelector('#submit')

submitbtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (names.value != null && username.value) {

        const usrname = document.getElementById('username').value;
        const fullName = document.getElementById('names').value;
        localStorage.setItem('username', usrname);
        localStorage.setItem('fullName', fullName);


        console.log(usrname,fullName)
        setTimeout(() => {
            window.location.href = 'memory.html'
        }, 500)
    }
})
