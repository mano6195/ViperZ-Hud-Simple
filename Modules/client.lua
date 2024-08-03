ESX = exports['es_extended']:getSharedObject()

local informacionHud = {
    enCoche = false,
    barras = {
        salud = 0,
        armadura = 0,
        hambre = 0,
        sed = 0, 
        resistencia = 0
    }
}

CreateThread(function()
    while true do
        Wait(2000)
        local jugadorPed = PlayerPedId()
        TriggerEvent('esx_status:getStatus', 'thirst', function(status) 
            informacionHud.barras.sed = status.getPercent() 
        end)
        TriggerEvent('esx_status:getStatus', 'hunger', function(status)
            informacionHud.barras.hambre = status.getPercent()
        end)
        informacionHud.barras.armadura = GetPedArmour(jugadorPed)
        informacionHud.barras.salud = (GetEntityHealth(jugadorPed) - 100)
        informacionHud.barras.resistencia = 100 - GetPlayerSprintStaminaRemaining(PlayerId())
        informacionHud.enCoche = IsPedInAnyVehicle(jugadorPed, false)
        DisplayRadar(informacionHud.enCoche)
        SendNUIMessage({informacionHud = informacionHud})
    end
end)

local mostrarHud = true

RegisterCommand("hud", function()
    mostrarHud = not mostrarHud
    SendNUIMessage({
        showHud = mostrarHud
    })
end)