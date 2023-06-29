import $ from 'jquery'
import { onLoadHtmlSucess } from '../core/includes'

const duration = 300

function filterByCity(city) {
    $('[city]').each(function(index, element) {
        const isTarget = $(this).attr('city') === city || city === null
        if(isTarget) {
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none')
            })
        }
    })
}

$.fn.cityButtons = function() {
    const cities = new Set
    $('[city]').each(function(index, element) {
        cities.add($(element).attr('city'))
    })

    const buttons = Array.from(cities).map(city => {
        const btn = $('<button>').addClass(['btn', 'btn-info']).html(city)
        btn.on("click", element => filterByCity(city))
        return btn
    })

    const buttonAll = $('<button>').addClass(['btn', 'btn-info', 'active']).html('Todas')
    buttonAll.on("click", element => filterByCity(null))
    buttons.push(buttonAll)

    const buttonGroup = $('<div>').addClass(['btn-group'])
    buttonGroup.append(buttons)

    $(this).html(buttonGroup)

    return this
}

onLoadHtmlSucess(function() {
    $('[city-buttons]').cityButtons()
})
