<!-- @format -->

### Entità della nostra app

- class CodePass: istanzia le classi per la gestione degli utenti e delle password
- class userManager: gestisce la creazione e l'autenticazione degli utenti
- class User: singolo utente
- class passwordManager: gestione delle password associate agli utenti (creazione, aggiornamento, ricerca e cancellazione)
- class passwordItem: associa il singolo elemento password all'utente

### Relazioni della nostra app

- userManager --> relazioni con user --> 1aN userManager gestisce molteplici user
- passwordManager --> relazioni con user e passwordItem --> 1aN passwordManager gestisce molteplici istanze di passwordItem per diversi user
- user --> relazioni con passwordItem --> 1aN singolo utente possessore di molteplici password
- codePass --> relazioni con userManager e passwordManager --> gestisce le classi e le password degli utenti
