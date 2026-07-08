// Funkce pro nákup
function buyArtwork(name, price, id) {
    // Vytvoříme FormData pro PayPal
    const formData = new FormData();
    formData.append('cmd', '_xclick');
    formData.append('business', 'Tom.Boruvka@seznam.cz');
    formData.append('item_name', `Tvá Přítomnost - ${name}`);
    formData.append('amount', price.toFixed(2));
    formData.append('currency_code', 'EUR');
    formData.append('return', window.location.href);
    formData.append('cancel_return', window.location.href);
    formData.append('notify_url', window.location.href);
    formData.append('no_shipping', '2');
    
    // Otevřeme PayPal formulář
    const paypalUrl = 'https://www.paypal.com/cgi-bin/webscr';
    
    // Vytvoříme a submitneme hidden formulář
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = paypalUrl;
    form.style.display = 'none';
    
    const params = {
        'cmd': '_xclick',
        'business': 'Tom.Boruvka@seznam.cz',
        'item_name': `Tvá Přítomnost - ${name}`,
        'amount': price.toFixed(2),
        'currency_code': 'EUR',
        'return': window.location.href,
        'cancel_return': window.location.href,
        'notify_url': window.location.href,
        'no_shipping': '2'
    };
    
    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = params[key];
            form.appendChild(input);
        }
    }
    
    document.body.appendChild(form);
    form.submit();
    
    // Upozornění uživateli
    console.log(`Nákup díla "${name}" za ${price}€ byl iniciován.`);
}

// Přidáme event listenery na všechna tlačítka
document.addEventListener('DOMContentLoaded', function() {
    const buyButtons = document.querySelectorAll('.buy-btn');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Tlačítko již má onclick, tak jen logujeme
            console.log('Klikl jsi na tlačítko Koupit');
        });
    });
    
    // Smooth scroll pro odkazů (pokud by měly být)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Callback po úspěšné platbě (když se vrátí z PayPalu)
function handlePayPalReturn() {
    // Můžeš zde přidat poděkování
    alert('Děkujeme za nákup! Tvůj obrázek je tvůj.');
}

// Export pro použití
window.buyArtwork = buyArtwork;
window.handlePayPalReturn = handlePayPalReturn;
