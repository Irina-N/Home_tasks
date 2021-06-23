/* if ('serviceWorker' in navigator) {
            // Весь код регистрации у нас асинхронный.
            navigator.serviceWorker.register('./sw.js')
            .then(() => navigator.serviceWorker.ready.then((worker) => {
                worker.sync.register('syncdata');
            }))
            .catch((err) => console.log(err));
        } */

if ('serviceWorker' in navigator) {
    window.addEventListener('load',
        function () {
            navigator.serviceWorker.register('/service-worker.js')
                .then(function (registration) {
                    // Registration was successful
                    console.log('ServiceWorker успешно зарегистрирован со сферой действия: ', registration.scope);
                },
                    function (err) {
                        // registration failed :(
                        console.log('ServiceWorker не удалось зарегистрировать: ', err);
                    })
                .catch(function (err) {
                    console.log(err)
                });
        });
} else {
    console.log('ServiceWorker не поддерживается');
}