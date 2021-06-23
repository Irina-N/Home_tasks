window.addEventListener('appinstalled', (e) => {
    fetch('http://localhost:8080/', {
        method: 'GET',
        credentials: 'include',
    });
    console.log('что-то произошло')
});