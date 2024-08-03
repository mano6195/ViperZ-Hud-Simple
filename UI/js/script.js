window.addEventListener('message', function(event) {
    var informacionHud = event.data.informacionHud;
    if (informacionHud) {
        ['salud', 'hambre', 'sed', 'resistencia'].forEach(function(stat) {
            var contenedor = document.getElementById(stat + '-container');
            var nivel = document.getElementById(stat + '-level');
            if (informacionHud.barras[stat] < 50) {
                contenedor.style.display = 'flex';
                nivel.style.width = informacionHud.barras[stat] + '%';
                contenedor.classList.remove('container-disappearing');
                contenedor.classList.add('container-appearing');
            } else {
                contenedor.classList.remove('container-appearing');
                contenedor.classList.add('container-disappearing');
                setTimeout(function() {
                    contenedor.style.display = 'none';
                }, 500); 
            }

            if (stat === 'resistencia' && informacionHud.barras[stat] < 50) {
                contenedor.classList.add('running');
            } else {
                contenedor.classList.remove('running');
            }
        });

        var contenedorArmadura = document.getElementById('armadura-container');
        var nivelArmadura = document.getElementById('armadura-level');
        if (informacionHud.barras.armadura > 0) {
            contenedorArmadura.style.display = 'flex';
            nivelArmadura.style.width = informacionHud.barras.armadura + '%'; 
            contenedorArmadura.classList.remove('container-disappearing');
            contenedorArmadura.classList.add('container-appearing');
        } else {
            contenedorArmadura.classList.remove('container-appearing');
            contenedorArmadura.classList.add('container-disappearing');
            setTimeout(function() {
                contenedorArmadura.style.display = 'none';
            }, 500);
        }
    }
});

window.addEventListener('message', function(event) {
    var data = event.data;
    if (data.showHud !== undefined) {
        var hud = document.getElementById('hud-container');
        if (data.showHud) {
            hud.style.display = 'flex';  
        } else {
            hud.style.display = 'none';
        }
    }
});