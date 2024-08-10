const names = document.querySelector('#names')
const username = document.querySelector('#username')
const submitbtn = document.querySelector('#submit')

export let name1 = "";
export let name2 = "";

submitbtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (names.value != null && username.value) {
        name1 = names.value;
        name2 = username.value;

        console.log(name1,name2)
        setTimeout(() => {
            window.location.href = 'memory.html'
        }, 500)
    }
})
