import $ from 'jquery'

const loadHtmlSucessCallbacks = []

export function onLoadHtmlSucess(callback) {
    if(!loadHtmlSucessCallbacks.includes(callback)) {
        loadHtmlSucessCallbacks.push(callback)
    }
}

function loadIncludes(parent) {
    if(!parent){
        parent = 'body'
    }
    $(parent).find('[include-html]').each(function(index, element) {
        const url = $(element).attr('include-html')
        $.ajax({
            url,
            success(data) {
                $(element).html(data)
                $(element).removeAttr('include-html')
                
                loadHtmlSucessCallbacks.forEach(callback => callback(data))

                loadIncludes(element)
            }
        })
    })
}

loadIncludes()