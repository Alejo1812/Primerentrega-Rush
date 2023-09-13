function billetera(saldo){
    if (saldo > 0) 
        alert ("tiene $" + saldo)
    else if (saldo==0)
        alert ("no tiene un mango")
    else if (saldo < 0)
        alert ("esta en negativo")
}
saldo=prompt("ingrese su saldo")
console.log(billetera(saldo))
var i=0
var comprado=0
function compra(saldo,cantidad){
    for (i=1;i<=cantidad;i++){
        if(saldo>=10){
            saldo=saldo-10;
            comprado=comprado+1}
        else{
            alert("no tiene mas dinero");
            break}
        
    }
    alert("usted compro " + comprado)
    alert("le quedan $" +saldo)
}
cantidad=prompt("cada item vale 10, cuanto quiere comprar?")
console.log(compra(saldo,cantidad))