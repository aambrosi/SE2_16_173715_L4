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
        this.firstName = lastName;
    };
    
    this.setSalary = function (salary) {
        this.firstName = salary;
    };
    
    this.setLevel = function (level) {
        this.firstName = level;
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
        var i = 0;
        for (i = 0; i < this.employees.length; i = i + 1) {
            if (this.employees[i].getId === id) {
                this.employees[i] = null;
                return 1;
            }
        }
        return 0;
    };
/**
 * @brief Utilizzo questa funzione per aggiungere un nuovo dipendente. Attivata con un click su "Aggiungi/Modifica".
 * @param [in|out] In ingresso i dati di un employee da aggiungere.
 * @return ritorna 1 se va a buon fine, 0 altrimenti.
 */
    this.addEmployee = function (id, firstName, lastName, level, salary) {
        try {
            var newEmployee = new Employee(id, firstName, lastName, level, salary);
            this.employees[nextPos] = newEmployee;
            this.lastId = id;
            nextPos += 1;
        } catch (exception) {
            return 0;
        }
        return 1;
    };
}






var model = new Model();
model.addEmployee(1, "Giacomo", "Rossi", 5, 1800);
model.addEmployee(2, "Giuseppe", "Verdi", 2, 1200);
model.addEmployee(3, "Mario", "Bianchi", 10, 3500);

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
    if (val !== "") {
        e = model.findEmployee(val);
        if (e !== null) {
            document.getElementById("idEmployee").value = e.getId();
            document.getElementById("firstNameEmployee").value = e.getFirstName();
            document.getElementById("lastNameEmployee").value = e.getLastName();
            document.getElementById("levelEmployee").value = e.getLevel();
            document.getElementById("salaryEmployee").value = e.getSalary();
        } else {
            resetFields();
        }
    }
}