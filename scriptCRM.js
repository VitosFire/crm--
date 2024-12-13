document.getElementById('search-button').addEventListener('click', search);
document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        search();
    }
});

function search() {
    const input = document.getElementById('search-input').value.toLowerCase();
    
    fetch('http://localhost:3001/users')
        .then(response => response.json())
        .then(users => {
            const results = users.filter(user => user.lastname.toLowerCase().includes(input));
            displayResults(results);
        })
        .catch(error => console.error('Ошибка:', error));
}

function displayResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // Очистка предыдущих результатов

    if (results.length > 0) {
        results.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.classList.add('user-info');
            userDiv.innerHTML = `
                <strong>Имя:</strong> ${user.name} <br>
                <strong>Фамилия:</strong> ${user.lastname} <br>
                <strong>Username:</strong> ${user.username} <br>
                <strong>Роль:</strong> ${user.role} <br>
                <strong>Активен:</strong> ${user.is_active ? 'Да' : 'Нет'} <br>
                <strong>Администратор:</strong> ${user.is_admin ? 'Да' : 'Нет'} <br>
                <strong>Лидер:</strong> ${user.is_leader ? 'Да' : 'Нет'} <br>
                <strong>Телефон:</strong> ${user.phone} <br>
                <strong>Telegram аккаунт:</strong> ${user.tg_account} <br>
                <strong>Email для работы:</strong> ${user.work_email} <br>
                <strong>Отчество:</strong> ${user.patronymic} <br>
            `;
            resultsContainer.appendChild(userDiv);
        });
    } else {
        resultsContainer.textContent = 'Пользователи не найдены.';
    }

    document.getElementById('result-popup').classList.remove('hidden');
}

// Закрытие всплывающего окна
document.getElementById('close-popup').addEventListener('click', function() {
    document.getElementById('result-popup').classList.add('hidden');
});