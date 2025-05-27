document.addEventListener('DOMContentLoaded', function() {
    // Обработване на поръчки
    const orderForm = document.querySelector('.purchase-form form');
    if (orderForm) {
        orderForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const address = document.getElementById('address').value;

            // Вземи productId от URL-то
            const productId = window.location.pathname.split('/').pop();

            try {
                const response = await fetch(`/order/${productId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ name, address })
                });

                if (response.redirected) {
                    window.location.href = response.url;
                } else {
                    alert('Грешка при поръчката');
                }
            } catch (err) {
                alert('Грешка при изпращане на поръчката');
                console.error(err);
            }
        });
    }

    // Обработване на ревюта
    const reviewForm = document.querySelector('.reviews form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const authorInput = document.getElementById('author');
            const author = authorInput ? authorInput.value : 'Анонимен';
            const comment = document.getElementById('comment').value;

            const productId = window.location.pathname.split('/').pop();

            try {
                const response = await fetch(`/review/${productId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ author, comment })
                });

                if (response.redirected) {
                    window.location.href = response.url;
                } else {
                    alert('Грешка при добавяне на ревю');
                }
            } catch (err) {
                alert('Грешка при изпращане на ревюто');
                console.error(err);
            }
        });
    }

    // Търсачка за продукти
    const searchInput = document.getElementById('searchInput');
    const productCards = document.querySelectorAll('.product-card');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchValue = searchInput.value.toLowerCase();
            productCards.forEach(card => {
                const name = card.querySelector('h2').textContent.toLowerCase();
                if (name.includes(searchValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});
