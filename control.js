function Employee(id, firstName, lastName, level, salary) {
    "use strict";
    //initialization
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.level = level;
    this.salary = salary;
    
    //getter and setter methods
    this.setId = function (id) {
        this.id = id;
    };
    
    this.setFirstName = function (firstName) {
        this.firstName = firstName;
    };
    
    this.setLastName = function (lastName) {
        this.lastName = lastName;
    };
    
    this.setSalary = function (salary) {
        this.salary = salary;
    };
    
    this.setLevel = function (level) {
        this.level = level;
    };
    
    this.getId = function () {
        return this.id;
    };
    
    this.getFirstName = function () {
        return this.firstName;
    };
    
    this.getLastName = function () {
        return this.lastName;
    };
    
    this.getSalary = function () {
        return this.salary;
    };
    
    this.getLevel = function () {
        return this.level;
    };
    
}

function Model() {
    "use strict";
    this.employees = [];
    this.lastId = 0;
    var nextPos = 0;
    
/**
 * @brief Utilizzo questa funzione per cercare il dipendente richiesto. Attivata da un click sul pulsante "Cerca".
 * @param [in|out] In ingresso l'id di un employee da ricercare.
 * @return Ritorna (se lo trova) l'employee con id in input.
 */
    this.findEmployee = function (id) {
        var i = 0;
        for (i = 0; i < this.employees.length; i = i + 1) {
            if (this.employees[i].getId() == id) {
                return this.employees[i];
            }
        }
        return null;
    };
    
/**
 * @brief Utilizzo questa funzione per eliminare il dipendente ricercato. Attivata con un click su "Elimina".
 * @param [in|out] In ingresso l'id di un employee da eliminare.
 * @return ritorna 1 se va a buon fine, 0 altrimenti.
 */
    this.deleteEmployee = function (id) {
        var i = 0,
            newEmployee;
        for (i = 0; i < this.employees.length; i = i + 1) {
            if (this.employees[i].getId() == id) {
                //inserisco un utente nullo per non lasciare un buco vuoto
                newEmployee = new Employee(-1, "", "", 0, 0);
                this.employees[i] = newEmployee;
                return 1;
            }
        }
        return 0;
    };
    
/**
 * @brief Utilizzo questa funzione per aggiungere un nuovo dipendente. Attivata con un click su "Aggiungi/Modifica".
 * @param [in|out] In ingresso i dati di un employee da aggiungere.
 * @return Nessun parametro di ritorno.
 */
    this.addEmployee = function (id, firstName, lastName, level, salary) {
        this.employees[nextPos] = new Employee(id, firstName, lastName, level, salary);
        this.lastId = id;
        nextPos += 1;
    };
    
    /**
     * @brief Utilizzo questa funzione quando non viene inserito un id nel campo ID per un nuovo dipendente.
     * @param [in|out] Nessun parametro in input.
     * @return Restituisce il prossimo id libero.
     */
    this.getNextId = function () {
        this.lastId = parseInt(this.lastId, 10) + 1;
        return this.lastId;
    };
    
    /**
     * @brief Utilizzo questa funzione quando aggiungo un nuovo dipendente con un id deciso dall'utente.
     * @param [in|out] Ricevo in ingresso l'id dell'ultimo dipendente inserito.
     * @return Nessun parametro di ritorno.
     */
    this.setLastId = function (id) {
        this.lastId = id;
    };
}




//deve essere globale e raggiungibile da tutti
var model = new Model();
//aggiungo dipendenti come esempio
model.addEmployee(1, "Giacomo", "Rossi", 5, 1800);
model.addEmployee(2, "Giuseppe", "Verdi", 2, 1200);
model.addEmployee(3, "Mario", "Bianchi", 10, 3500);


function load() {
    "use strict";
    //metto il display a none per essere sicuro che poi le funzionalita sotto funzionano 
    //dava problemi in find employee quando trovo il dipendente e scopro il form
    document.getElementById('employeeDataDiv').style.display = 'none';
}




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
 * @param [in|out] Nessun parametro di ingresso o di uscita.
 * @return Nessun valore di ritorno.
 */
function discoverForm() {
    "use strict";
    var div = document.getElementById('employeeDataDiv');
    if (div.style.display === 'block') {
        div.style.display = 'none';
    } else {
        div.style.display = 'block';
    }
    resetFields();
}

/**
 * @brief Questa funzione viene chiamata dal click su "Cerca" e ricerca tra gli employees quello con l'id specificato.
 *        Se lo trova lo mostra, se non lo trova azzera i campi che potrebbero esser rimasti "sporchi" da una precedente richiesta.
 * @param [in|out] Nessun parametro d'ingresso o di uscita.
 * @return Nessun parametro di ritorno
 */
function findEmployee() {
    "use strict";
    var val = document.getElementById("idEmployeeToFind").value,
        e;
    //controllo un che sia inserito un valore sensato 
    if (val !== "" && val >= 0) {
        e = model.findEmployee(val);
        if (e !== null) {
            if (document.getElementById('employeeDataDiv').style.display === 'none') {
                discoverForm();
            }
            document.getElementById("idEmployee").value = e.getId();
            document.getElementById("firstNameEmployee").value = e.getFirstName();
            document.getElementById("lastNameEmployee").value = e.getLastName();
            document.getElementById("levelEmployee").value = e.getLevel();
            document.getElementById("salaryEmployee").value = e.getSalary();
        } else {
            alert("Dipendente non trovato!");
        }
    } else {
        alert("L'id inserito non è ben formato!");
        resetFields();
    }
}


/**
 * @brief Funzione chiamata dal bottone "Elimina". 
 * @param nessun parametro di ingresso o uscita.
 * @return Nessun valore di ritorno.
 */
function deleteEmployee() {
    "use strict";
    var id = document.getElementById("idEmployeeToFind").value,
        r;
    //controllo un che sia inserito un valore sensato 
    if (id !== "" && id >= 0) {
        r = model.deleteEmployee(id);
        if (r === 0) {
            alert("Stai tentando di eliminare un dipendente inesistente!");
        } else {
            alert("Eliminato!");
            resetFields();
        }
    } else {
        alert("L'id inserito non è ben formato!");
        resetFields();
    }
    
}

function addEmployee() {
    "use strict";
    var id = document.getElementById("idEmployee").value,
        e,
        firstName,
        lastName,
        level,
        salary;
    
    //controllo se e' stato inserito o meno un id
    if (id == "") {
        id = model.getNextId();
    }
    
    //controllo un che sia inserito un valore sensato 
    if (id >= 0) {

        //controllo su ogni campo che ci sia inserito qualcosa e che sia sensato
        firstName = document.getElementById("firstNameEmployee").value;
        if (firstName.length == 0) {
            alert("Inserire il nome!");
            return;
        }
        
        lastName = document.getElementById("lastNameEmployee").value;
        if (lastName.length == 0) {
            alert("Inserire il cognome!");
            return;
        }
        
        level = document.getElementById("levelEmployee").value;
        if (level == "" || level < 0) {
            alert ("Inserire un livello valido!");
            return;
        }
        
        salary = document.getElementById("salaryEmployee").value;
        if (salary == "" || salary < 0) {
            alert("Inserire uno stipendio valido!");
            return;
        }
        
        //controllo se il dipendente e' gia presente in elenco o meno
        e = model.findEmployee(id);
        if (e !== null) {
            e.setFirstName(firstName);
            e.setLastName(lastName);
            e.setLevel(level);
            e.setSalary(salary);
            alert("Dipendente modificato!");
        } else {
            model.addEmployee(id, firstName, lastName, level, salary);
            alert("Dipendente aggiunto!");
        }
    } else {
        alert("L'id inserito non è ben formato!");
    }
}