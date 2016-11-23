/**
 * @brief Funzione utilizzata per pulire i campi del form.
 * @param [in|out] Nessun parametro di ingresso o di uscita.
 * @return Nessun valore di ritorno
 */
function resetFields() {
    "use strict";
    document.getElementById("idEmployee").value = "";
    document.getElementById("firstNameEmployee").value = "";
    document.getElementById("lastNameEmployee").value = "";
    document.getElementById("levelEmployee").value = "";
    document.getElementById("salaryEmployee").value = "";
}

/**
 * @brief Utilizzzo questa funzione per coprire/scoprire il div che contiene i campi per inserire/modificare un dipendente. La funzione viene attivata dal click sul bottone "Visualizza Form". All'inizio il form e' nascosto.
 * @param [in|out] Nessun parametro d'ingresso.
 * @return Nessun valore di ritorno.
 */
function discoverForm() {
    "use strict";
    var div = document.getElementById('employeeDataDiv');
    //sara null quando viene chiamato dal bottone, metto quindi la visibilita al contrario di com'e adesso
    if (div.classList.contains('hidden')) {
        div.classList.toggle('visible');
        resetFields();
    } else {
        div.classList.toggle('hidden');
    }
}

/**
 * @brief Questa funzione viene chiamata dal click su "Cerca". Controlla che l'id sia ben formato e invia il form al server.
 *        Se non lo e' azzera i campi che potrebbero esser rimasti "sporchi" da una precedente richiesta.
 * @param [in|out] Form compilato.
 * @return Nessun parametro di ritorno
 */
function findEmployee(form) {
    "use strict";
    form.action = "/findEmployee";
    var val = document.getElementById("idEmployeeToFind").value,
        e;
    //controllo un che sia inserito un valore sensato 
    if (val !== "" && val >= 0) {
        form.submit();
    } else {
        window.alert("L'id inserito non e' ben formato!");
        resetFields();
    }
}

/**
 * @brief Funzione chiamata dal bottone "Elimina". Controlla che l'id sia ben formato e invia il form al server.
 *        Se non lo e' azzera i campi che potrebbero esser rimasti "sporchi" da una precedente richiesta. 
 * @param Form compilato.
 * @return Nessun valore di ritorno.
 */
function deleteEmployee(form) {
    "use strict";
    form.action = "/deleteEmployee";
    var id = document.getElementById("idEmployeeToFind").value,
        r;
    //controllo un che sia inserito un valore sensato 
    if (id !== "" && id >= 0) {
        form.submit();
    } else {
        window.alert("L'id inserito non e' ben formato!");
        resetFields();
    }
    
}

/**
 * @brief Funzione chiamata dal bottone "Aggiungi/Modifica". Controlla che vi siano tutti i campi necessari e che siano ben formati ed invia il form al                server.
 *        Se non lo sono aavvisa l'utente in modo da poter corregere i campi errati. 
 * @param Form compilato.
 * @return Nessun valore di ritorno.
 */
function addEmployee(form) {
    "use strict";
    form.action = "/addEmployee";
    var id = document.getElementById("idEmployee").value,
        firstName = document.getElementById("firstNameEmployee").value,
        lastName = document.getElementById("lastNameEmployee").value,
        level = document.getElementById("levelEmployee").value,
        salary = document.getElementById("salaryEmployee").value,
        ok = true;

    //controllo su ogni campo che ci sia inserito qualcosa e che sia sensato
    if (firstName !== "" && lastName !== "" && salary !== "" && level !== "") {
        if (level < 0) {
            window.alert("Inserire un livello valido!");
            ok = false;
        }
        if (salary < 0) {
            window.alert("Inserire uno stipendio valido!");
            ok = false;
        }
        //l/id puo' essere vuoto ma se c'e scritto qualcosa deve essere sensato
        if (id !== "") {
            if (id < 0) {
                ok = false;
                window.alert("Inserire un id sensato!");
            }
        }
        if (ok) {
            form.submit();
        }
    } else {
        window.alert("Solo l'id puo' rimanere vuoto!");
    }
}