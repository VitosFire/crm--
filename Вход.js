document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    // Сбрасываем сообщение об ошибке перед новой попыткой
    messageDiv.innerText = '';

    try {
        const response = await fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            messageDiv.innerText = data.message; // Успешное сообщение
            // Переход в рабочую зону сайта
            window.location.href = 'searchCRM.html'; // Переход на страницу searchCRM.html
        } else if (response.status === 401) {
            messageDiv.innerText = 'Неверный логин или пароль'; // Сообщение для неверных данных
        } else if (response.status === 404) {
            messageDiv.innerText = 'Ошибка 404: Страница не найдена'; // Сообщение об ошибке 404
        } else {
            const errorData = await response.json();
            messageDiv.innerText = errorData.message || 'Произошла ошибка'; // Сообщение об ошибке
        }
    } catch (error) {
        console.error('Ошибка:', error);
        messageDiv.innerText = 'Произошла ошибка при отправке запроса.';
    }
});
