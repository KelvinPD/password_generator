function getChartTypes() {
    const uppercase = document.querySelector('#include_uppercase').checked
    const lowercase = document.querySelector('#include_lowercase').checked
    const number = document.querySelector('#include_number').checked
    const specialCharacter = document.querySelector('#include_special_character').checked

    const charTypes = [];

    if (uppercase) {
        charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    }
    
    if (lowercase) {
        charTypes.push('abcdefghijklmnopqrstuvwxyz')
    }

    if (number) {
        charTypes.push('123456789')
    }
    
    if (specialCharacter) {
        charTypes.push('!?.,:@#$%&*-+=_~|\\(){}[]^:;/\'')
    }

    return charTypes;
}

function getPasswordSize() {
    const size = document.querySelector('#size').value;
    if (isNaN(size) || size < 4 || size > 128) {
          message('Tamanho invalido, digite um número entre 4 e 128!', 'danger');
    }
    return size;
}
function randomCharType(charTypes) {
    const randomIndex = Math.floor(Math.random() * charTypes.length);
    
    return charTypes[randomIndex][Math.floor(Math.random() * charTypes[randomIndex].length)];
}

function generatorPassword (size, charType) {
    let passwordGenerate = '';

    while (passwordGenerate.length < size) {
        passwordGenerate += randomCharType(charType)
    }

    return passwordGenerate;
}

function message (text, status = 'success') {
    Toastify({
        text: text,
        duration: 3000,
        style: {
          background: status === 'success' ? '#52b929' : '#dc2626',
          boxShadow: 'none'
        }
      }).showToast();
}

document.querySelector('#generate').addEventListener('click', function () {
    const size = getPasswordSize();
    const charTypes = getChartTypes();

    if(!size) {
        return;
    }
    if(!charTypes.length) {
        message('Selecione pelo menos uma opção', 'danger');
        return;
    }

    const passwordGenerate = generatorPassword(size, charTypes);

    document.querySelector('#password_container').classList.add('show');
    document.querySelector('#password').textContent= passwordGenerate;
})

document.querySelector('#copy').addEventListener('click', function () {
    navigator.clipboard.writeText(document.querySelector('#password').textContent);
    message('Copiado', 'success')
})