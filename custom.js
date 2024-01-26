/*
'-' ile başlatmak yerine Windows hesap makinelerindeki gibi "0 -" olarak çalışmasını sağladım.

Hesaplama işlemini Windows hesap makinesindeki gibi sonraki operatöre bastığımızda gerçekleştiriyor.

29101923 - Easter egg
*/

var display = document.getElementById("display");
var displayMini = document.getElementById("displayMini")
var currentOperationValue ;
var totalValue = null;
var isInputFilled = false;
var clearInputOnNextNumber = false;

// Enum tanımı
const Operation = {
    Addition: '+',
    Subtraction: '-',
    Multiplication: '*',
    Division: '/',
    Percentage:'%'
};

function onLoadConfiguration()
{
    //Sayfadaki Tüm .Disable sınıfına sahip butonları devre dışı bırak.
    document.querySelectorAll(".disable").forEach(element => {
        element.disabled = true;
    });
}

function appEndToDisplay(value)
{
    
    // Eğer girilen değer ondalık noktası ise ve display içinde zaten bir ondalık nokta varsa işlem yapma
    if ((value === '.' && display.innerText.includes('.')) || (clearInputOnNextNumber == true && value === '.')) 
        return;
    
    if(clearInputOnNextNumber)
    {
        display.innerText = value;
        clearInputOnNextNumber = false;
    }
    else
    {
        //Display değeri, ilk değer yani '0' ise  display değerini value değeri olarak güncelle.
        //Değilse, display içeriğine value değerini ekleyerek güncelle.
        if(display.innerText == '0'  && value != '.')
            display.innerText = value;
        else
            display.innerText += value;
    }

    isInputFilled = true;

    //o7
    if(/^29101923$/.test(display.innerText))
    {
        const audio = document.getElementById('myAudio');
        audio.volume = 0.2;
        audio.play();
    }
}

function reset()
{
    //display,displayMini,totalValue değerlerini sıfırla.
    display.innerText = 0;
    displayMini.innerText = null;
    totalValue = null;
}

// backspace fonksiyonu, display içeriğindeki son karakteri siler.
function backspace()
{    
    // Eğer içerik uzunluğu 1 ise, display'i sıfırla.
    // Değilse son karakteri sil.
    if(display.innerText.length == 1 )
    {
        display.innerText = 0;
        isInputFilled= false;
    }        
    else
        display.innerText = display.innerText.substring(0,display.innerText.length-1); 
}

function currentOperation(operation)
{
    // Eğer currentOperationValue henüz belirlenmemişse, şu andaki operasyonu ona ayarla.
    if(currentOperationValue == null)
        currentOperationValue = operation;

    //Şu andaki operasyona göre totalValue'yi güncelle.
    if(isInputFilled)
    {
        updateTotalValue();
        isInputFilled = !isInputFilled;
        clearInputOnNextNumber = true ;
    }

    //totalValue henüz belirlenmemişse totalValue'yi "0" olarak başlat
    if (totalValue == null) {
        totalValue = 0;
    }
    
    //Ekranı sıfırla
    display.innerText = totalValue; 

    // Mini ekrana şu anki toplam değeri ve yapılan işlemi göster
    displayMini.innerText = totalValue + " "  + operation; 
    
    //Bastığımız operasyon butonunu currentOperationValue olarak ayarla
    currentOperationValue = operation;

}

function updateTotalValue()
{
    //ilk değer atanmamış ise eklemek yerine esan ediyoruz.
    if (totalValue == null ) 
        totalValue = Number(display.innerText);
    else
    {
        switch (currentOperationValue) {
            case Operation.Addition:
                totalValue += Number(display.innerText);
                break;
            case Operation.Subtraction:
                totalValue -= Number(display.innerText);
                break;
            case Operation.Division:
                totalValue /= Number(display.innerText);
                break;
            case Operation.Multiplication:
                totalValue *= Number(display.innerText);
                break;
            case Operation.Percentage:
                totalValue = (totalValue / 100) * Number(display.innerText);
                break;
            default:
                break;
        }
    }
}

function equal()
{
    updateTotalValue();

    clearInputOnNextNumber = true ;
    currentOperationValue = null;
    display.innerText = totalValue;
    displayMini.innerText = null;
    totalValue = null;
}

// Klavyede bir tuşa basıldığında tetiklenen olay dinleyicisi
document.addEventListener("keydown", function(event) 
{    
    var key = event.key;

    if (Number(key)) 
    {
        var button = "btn-"+key;
        document.getElementById(button).click();
        clickEffect(button);
    }
    else if(key == '+' || key == '-' || key == '*' || key == '/' || key == '%')
    {
        currentOperation(key);
        
    }
    else if(key == 'c' || key == 'C')
    {
        reset();
        clickEffect("c");
    }
    else if(key == 'Backspace')
    {
        backspace();
        clickEffect("backspace");
    }
    else if (key == '.')
    {
        document.getElementById("dot").click();
        clickEffect("dot");
    }
    else if( key == 'Enter')
    {
        document.getElementById("equal").click();
    }  
});

function clickEffect(button)
{
    var buttonDoc = document.getElementById(button);
    buttonDoc.classList.add("button-clicked");

    setTimeout(function() {
        buttonDoc.classList.remove("button-clicked");
    }, 100);
}
