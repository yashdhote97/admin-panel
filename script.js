const url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
$( document ).ready(function() {
    function createUserRow(userData){
        var row=$('<tr>').addClass('data-row');
        row.append($('<td>').addClass('column1').text(userData.id));
        row.append($('<td>').addClass('column2').text(userData.firstName));
        row.append($('<td>').addClass('column3').text(userData.lastName));
        row.append($('<td>').addClass('column4').text(userData.email));
        row.append($('<td>').addClass('column5').text(userData.phone));
        $( row ).click(function() {
            let infoDiv=$('#info-content');
            infoDiv.empty();
            $('tr').removeClass('active');
            infoDiv.append($('<div>').text(` ${userData.firstName} ${userData.lastName}`).prepend($('<b>').text('User selected:')));
            infoDiv.append($('<div>').append($('<b>').text('Description: ')).append($('<textarea>').attr('cols','50').attr('rows','5').attr('readonly',true).text(userData.description)));
            infoDiv.append($('<div>').text(` ${userData.address.streetAddress}`).prepend($('<b>').text('Address:')));
            infoDiv.append($('<div>').text(` ${userData.address.city}`).prepend($('<b>').text('City:')));
            infoDiv.append($('<div>').text(` ${userData.address.state}`).prepend($('<b>').text('State:')));
            infoDiv.append($('<div>').text(` ${userData.address.zip}`).prepend($('<b>').text('Zip:')));
            $(this).addClass('active');
        });
        return row;
    }
    var tableBody=$('#table-data tbody');
    $.get(url,function(response,status){
        if(status=="pending"){
            $('#overlay').show();
        }
        else{
            $('#overlay').hide();
        }
        $.each(response,function(index,responseObj){
             tableBody.append(createUserRow(responseObj));
        });
        $("#search-box").on("keyup", function() {
            var searchItem = $(this).val().toLowerCase();
            $('tbody .data-row .column2').each(function(){
                var compareItem = $(this).text().toLowerCase();
                if (compareItem.indexOf(searchItem)!=-1) {
                    $(this).parent().show();
                }
                else {
                    $(this).parent().hide();
                }
            });
        });
    });
});