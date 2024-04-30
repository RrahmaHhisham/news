let contain = document.getElementById('contain');
let registerBtn = document.getElementById('register');
let loginBtn = document.getElementById('login');

const buttons = [registerBtn, loginBtn];

buttons.forEach(button => {
    button.onclick = function() {
        const action = this.id === 'register' ? 'add' : 'remove';
        contain.classList[action]('active');
    };
});