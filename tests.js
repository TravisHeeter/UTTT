function xWinSmall(){
    r();
    showInOrder([25,57,30,48,23,39,21]);
}

async function showInOrder(array){
    for(const element of array)
        await clickSpot(element);
}

function clickSpot(overallid){
    return new Promise( resolve => {
        setTimeout( ( ) => {
            var e = $( `[data-overallid=${overallid}]` );
            e.click( );
            resolve( );
        },$( '#wait-amount' ).val( ))
    })
}