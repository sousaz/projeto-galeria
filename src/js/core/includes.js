import $ from 'jquery'

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

                loadIncludes(element)
            }
        })
    })
}

loadIncludes()