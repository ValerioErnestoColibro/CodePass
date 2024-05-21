class App {
    
    constructor() {
        // Inizializziamo le classi dentro il costruttore
        this.users = new Users(); // Creiamo un'istanza della classe Users per gestire gli utenti
        this.password = new Password(); // Creiamo un'istanza della classe Password per gestire le password
    }
}

class Users {
    
    constructor() {
        this.dati = []; // Array dove conterremo i dati dell'utente per il login utilizzando la funzione signUp
        this.id = 0; // Inizializziamo un contatore per gli ID degli utenti
    }

    signUp(username, email, password, masterPassword) {
        // Metodo per registrare un nuovo utente
        const userDate = new User(username, email, password, masterPassword, this.id); // Creiamo un'istanza della classe User
        this.dati.push(userDate); // Aggiungiamo il nuovo utente all'array
        this.id++; // Incrementiamo l'ID per il prossimo utente
    } 

    login(username, password) {
        // Metodo per effettuare il login dell'utente
        // Facciamo il check dei dati inseriti dall'utente per il login utilizzando il metodo find
        const checkDate = this.dati.find((e) => e.username === username && e.password === password);
        return checkDate; // Restituiamo i dati dell'utente se il login ha successo, altrimenti restituiamo undefined
    }
    
}

class User {
    
    constructor(username, email, password, masterPassword) {
        // Costruttore della classe User
        this.username = username; // Username dell'utente
        this.email = email; // Email dell'utente
        this.password = password; // Password dell'utente
        this.masterPassword = masterPassword; // Password principale dell'utente
        this.passwordItems = []; // Array per memorizzare gli oggetti PasswordItem associati all'utente
        this.id = 0; // Contatore per gli ID degli oggetti PasswordItem
    }

    addPasswordItem(email, password, site) {
        // Metodo per aggiungere un nuovo oggetto PasswordItem all'utente
        const items = new PasswordItem(email, password, site, this.id); // Creiamo un'istanza della classe PasswordItem
        this.passwordItems.push(items); // Aggiungiamo il nuovo oggetto PasswordItem all'array
        this.id++; // Incrementiamo l'ID per il prossimo oggetto PasswordItem
    }
}

class Password {
    
    addPassItem(user, email, password, site) {
        // Metodo per aggiungere una nuova password all'utente
        if (!user) {
            return null; // Se l'utente non esiste, restituiamo null
        } else {
            user.addPasswordItem(email, password, site); // Aggiungiamo la nuova password all'utente
        }
    }
}

class PasswordItem {
    
    constructor(email, password, site) {
        // Costruttore della classe PasswordItem
        this.email = email; // Email associata alla password
        this.password = password; // Password
        this.site = site; // Sito web o servizio associato alla password
    }
}

const app = new App(); // Creiamo un'istanza dell'applicazione
const persona = app.users.signUp('ciao', 'ok', 1234, 'okkkkk'); // Registriamo un nuovo utente
const checkDate = app.users.login('ciao', 1234); // Effettuiamo il login dell'utente
app.password.addPassItem(checkDate, 'ok', 3333, '3ddf'); // Aggiungiamo una nuova password all'utente loggato



