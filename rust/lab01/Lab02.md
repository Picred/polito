Ecco il contenuto del documento "Lab1.pdf" convertito e organizzato in formato Markdown:

# Laboratorio 1 - CLI CSV Inspector

## Obiettivo
Realizzare un programma CLI in Rust che:
1. Legge un file CSV (testuale).
2. Stampa il numero totale di righe.
3. Stampa le prime N righe.
4. Accetta parametri da riga di comando.

Il laboratorio serve a consolidare l'uso di Cargo, la struttura di un progetto modulare, l'utilizzo di `Vec` e `match`, le operazioni di I/O su file, l'impiego di `std::env::args` e la gestione basilare degli errori.

## Specifiche funzionali

### Interfaccia
Il programma deve essere eseguibile seguendo questo formato: `cargo run -- <file.csv> --head <N>`. 
Esempi di utilizzo validi sono: `cargo run -- data.csv` oppure `cargo run -- data.csv --head 5`.

### Comportamento atteso
* Se l'argomento `--head` non è specificato, il valore di default deve essere 10.
* Il parametro `<file.csv>` è un argomento obbligatorio.
* Il parametro `--head` deve essere un intero maggiore o uguale a 0.

### Output
Il formato di output è libero ma deve essere coerente e leggibile. Un esempio di output è il seguente:
```text
rows: 1234 
head (5): 
col1,col2,col3
1,2,3 
4,5,6 
...
```

### Definizione di "CSV"
Per gli scopi di questo laboratorio, un file CSV è definito semplicemente come un file di testo composto da righe separate da newline. Non è richiesto gestire casi complessi come virgolette o sequenze di escape, né è necessario rispettare rigidamente lo standard RFC del formato CSV. È sufficiente limitarsi a leggere e stampare righe testuali.

## Gestione errori (Requisito Obbligatorio)
Il programma non deve mai andare in *panic* durante il normale utilizzo. Devono essere gestiti esplicitamente i seguenti scenari:
* File inesistente.
* Permessi insufficienti.
* Valore di `--head` non numerico o negativo.
* Argomenti mancanti.

In caso si verifichi un errore, il programma deve stampare un messaggio su `stderr` e terminare l'esecuzione con un exit code diverso da 0. È severamente vietato utilizzare i metodi `unwrap()` o `expect()` su input provenienti dall’utente.

## Struttura del progetto
È consigliata la seguente struttura minima per i file del progetto:
```text
src/  
├── main.rs  
├── cli.rs  
└── io.rs
```
* **main.rs**: Si occupa dell'orchestrazione, invocando il parsing degli argomenti e la successiva lettura del file. Per poter utilizzare le funzioni definite negli altri moduli, deve contenere esplicitamente le direttive `mod cli;` e `mod io;`.
* **cli.rs**: Dedicato al parsing degli argomenti della command line.
* **io.rs**: Gestisce la lettura del file, il conteggio totale delle righe e la stampa delle prime righe (*head*).

## Vincoli tecnici
* Utilizzare esclusivamente la libreria standard di Rust (`std`).
* Non è consentito l'uso di crate esterne (come ad esempio `clap`) per questo laboratorio.
* Utilizzare la funzione `std::env::args()` per effettuare il parsing degli argomenti.
* Utilizzare il metodo `BufRead::lines()` per la lettura del file.

## Criteri di autovalutazione
La valutazione del lavoro si basa sui seguenti parametri:
* **40% - Correttezza funzionale**: Il conteggio delle righe, l'estrazione dell'head e il parsing degli argomenti risultano corretti.
* **30% - Robustezza**: Il programma non va mai in panic, gli errori sono gestiti in modo appropriato e l'exit code è corretto.
* **20% - Struttura e chiarezza**: I moduli sono ben separati, il codice è leggibile e non vi sono evidenti duplicazioni.
* **10% - Processo di sviluppo**: Presenza di una repository Git con messaggi di commit significativi (verificabili tramite `git log`); il programma deve compilare con `cargo build` e funzionare correttamente avviando il comando `cargo run -- <file.csv> --head 10`.

## Tempo stimato e Obiettivo didattico
Il tempo stimato per il completamento è di 1.5 ore di laboratorio, alle quali si aggiunge eventuale lavoro individuale se necessario. 
Alla fine di questo laboratorio, si dovrà essere in grado di creare e organizzare correttamente un progetto Rust, leggere file in modo sicuro, gestire argomenti da interfaccia a riga di comando (CLI), suddividere logicamente il codice in moduli ed evitare *panic* accidentali.