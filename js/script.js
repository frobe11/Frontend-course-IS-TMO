document.addEventListener('DOMContentLoaded', function() {
    console.log(`Страница загружена за ${performance.now().toFixed(2)} миллисекунд.`);
    const dropdown = document.querySelector('.dropdown');
    const dropdownButton = document.querySelector('.dropdown__button');
    const currentLocation = document.location.pathname;
    const dropdownLinks = document.querySelectorAll('.dropdown__link');


    dropdownButton.addEventListener('click', function() {
        dropdown.classList.toggle('dropdown_active');
    });

    window.addEventListener('click', function(event) {
        if (!event.target.matches('.dropdown__button')) {
            if (dropdown.classList.contains('dropdown_active')) {
                dropdown.classList.remove('dropdown_active');
            }
        }
    });
    dropdownLinks.forEach(item => {
        if (item.getAttribute('href') === currentLocation) {
            item.classList.add('dropdown__link_current');
        }
    });
    console.log(`Страница загружена и скрипт отработал за ${performance.now().toFixed(2)} миллисекунд.`);
});

