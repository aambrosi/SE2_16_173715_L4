//definizione di un dipendente e delle sue funzioni getter e setter
var Employee = function (id, firstName, lastName, level, salary) {
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
};

//contenitore dei dipendenti
var employeeList = [];
//tengo in memoria il max id
var maxId = 0;
//tengo in memoria la prossima posizione libera
var nextPos = 0;

/**
 * @brief Utilizzo questa funzione per cercare il dipendente richiesto. Attivata da un click sul pulsante "Cerca".
 * @param [in|out] In ingresso l'id di un employee da ricercare.
 * @return Ritorna (se lo trova) l'employee con id in input, null altrimenti.
 */
var findEmployee = function (id) {
    var i = 0;
    for (i = 0; i < employeeList.length; i = i + 1) {
        if (employeeList[i].getId() == id) {
            return employeeList[i];
        }
    }
    return null;
};
    
/**
 * @brief Utilizzo questa funzione per eliminare il dipendente ricercato.
 * @param [in|out] In ingresso l'id di un employee da eliminare.
 * @return ritorna 1 se va a buon fine, 0 altrimenti.
 */
var deleteEmployee = function (id) {
    var i = 0,
        newEmployee;
    for (i = 0; i < employeeList.length; i = i + 1) {
        if (employeeList[i].getId() == id) {
            //inserisco un utente nullo per non lasciare un buco vuoto
            newEmployee = new Employee(-1, "", "", 0, 0);
            employeeList[i] = newEmployee;
            return 1;
        }
    }
    return 0;
};
    
/**
 * @brief Utilizzo questa funzione per aggiungere un nuovo dipendente.
 * @param [in|out] In ingresso i dati di un employee da aggiungere.
 * @return Nessun parametro di ritorno.
 */
var addEmployee = function (id, firstName, lastName, level, salary) {
    employeeList[nextPos] = new Employee(id, firstName, lastName, level, salary);
    if (maxId < id) {
        maxId = id;
    }
    nextPos += 1;
};
    
/**
 * @brief Utilizzo questa funzione quando non viene inserito un id nel campo ID per un nuovo dipendente.
 * @param [in|out] Nessun parametro in input.
 * @return Restituisce il prossimo id libero.
 */
var getNextId = function () {
    maxId = parseInt(maxId, 10) + 1;
    return maxId;
};

//Funzioni raggiungibili dall'esterno

exports.employee = Employee;

exports.setFirstName = Employee.setFirstName;
exports.getFirstName = Employee.getFirstName;
exports.setLastName = Employee.setLastName;
exports.getLastName = Employee.getLastName;
exports.setSalary = Employee.setSalary;
exports.getSalary = Employee.getSalary;
exports.getLevel = Employee.getLevel;
exports.setLevel = Employee.setLevel;

exports.getNextId = getNextId;
exports.addEmployee = addEmployee;
exports.deleteEmployee = deleteEmployee;
exports.findEmployee = findEmployee;