console.log("chleba"); // Tímto jednoduchým console logem zkouším zda je vše v pořádku a že se script spustil

const cells = document.querySelectorAll(".cell"); 
const start = document.getElementById("restart"); // metodou document.getElemntId si volám z html souboru daná IDčka... 
const rand = document.getElementById("rand");     // ať už je to button na který budu moci kliknout a bude moct vyvolat nějaký efekt (vybrat hráče, ai zahraje...)
const ai_easy = document.getElementById("ai_easy"); // nebo jen buňka do které budu moci přes innerText ukládat X a O 
const ai_medium = document.getElementById("ai_medium");

document.getElementById("restart").style.display = "none";

const p1 = document.getElementById("p1"); //tlačítko hráče X
const p2 = document.getElementById("p2"); //tlačítko hráče O

const o = "O"; //Hráč O
const x = "X"; //Hráč X
const board = new Array(9).fill(null); // Vytvoření prázdného pole

let game = 0; // pomocná proměnná pro checkování zda se má provést while s random číslem. pouze u easy/medium
let currentPlayer = x; // Určení kdo začíná... což je v podstatě jedno.. uživatel si může sám vybrat. důležité je že jsem danou proměnnou vytvořil
choice2.innerText = "Jinak začíná " + currentPlayer + "..."; // Vypisování do h2 v index.html kdo začíná
let num = Math.floor(Math.random() * 9); // Zde již na začátku ukládám do proměnné num random číslo od 0-8 díky math.floor a math.random

function swap(){ //Zde jsem si vytvořil pomocnou funkci, která pokaždé když se zavolá tak se prohodí aktuálníhráč
  if(currentPlayer == o){
    currentPlayer = x;
  }else{
    currentPlayer = o;
  }
}
// Tato funkce nejdříve vyhledá zda aktuální hráč nemá nějakou dvojici a následně ji tam zahraje
function nextStep1() {
  game = 0;
  if (
    // následně se aktuální hráč zkontroluje zda není stejný jako je políčko x, pokud ano, tak pokud políčko x je stejné y a naposledy pokud políčko, 
    // na které chci zahrát je volné... ulož číslo 0 a následně s tímto číslem zahraj!
    (currentPlayer == board[2] && board[2] == board[1] && board[0] == null) ||
    (currentPlayer == board[6] && board[6] == board[3] && board[0] == null) ||
    (currentPlayer == board[8] && board[8] == board[4] && board[0] == null)
  ) {
    num = 0; //políčko číslo 0
    play();
    return (game = 1);
  } else {
    if (
      (currentPlayer == board[0] && board[0] == board[2] && board[1] == null) ||
      (currentPlayer == board[7] && board[7] == board[4] && board[1] == null)
    ) {
      num = 1; //políčko číslo 1
      play();
      return (game = 1);
    } else {
      if (
        (currentPlayer == board[0] &&
          board[0] == board[1] &&
          board[2] == null) ||
        (currentPlayer == board[8] &&
          board[8] == board[5] &&
          board[2] == null) ||
        (currentPlayer == board[6] && board[6] == board[4] && board[2] == null)
      ) {
        num = 2; //políčko číslo 2
        play();
        return (game = 1);
      } else {
        if (
          (currentPlayer == board[5] &&
            board[5] == board[4] &&
            board[3] == null) ||
          (currentPlayer == board[0] &&
            board[0] == board[6] &&
            board[3] == null)
        ) {
          num = 3; //políčko číslo 3
          play();
          return (game = 1);
        } else {
          if (
            (currentPlayer == board[1] &&
              board[1] == board[7] &&
              board[4] == null) ||
            (currentPlayer == board[3] &&
              board[3] == board[5] &&
              board[4] == null) ||
            (currentPlayer == board[0] &&
              board[0] == board[8] &&
              board[4] == null) ||
            (currentPlayer == board[2] &&
              board[2] == board[6] &&
              board[4] == null)
          ) {
            num = 4; //políčko číslo 4
            play();
            return (game = 1);
          } else {
            if (
              (currentPlayer == board[3] &&
                board[3] == board[4] &&
                board[5] == null) ||
              (currentPlayer == board[2] &&
                board[2] == board[8] &&
                board[5] == null)
            ) {
              num = 5; //políčko číslo 5
              play();
              return (game = 1);
            } else {
              if (
                (currentPlayer == board[0] &&
                  board[0] == board[3] &&
                  board[6] == null) ||
                (currentPlayer == board[8] &&
                  board[8] == board[7] &&
                  board[6] == null) ||
                (currentPlayer == board[2] &&
                  board[2] == board[4] &&
                  board[6] == null)
              ) {
                num = 6; //políčko číslo 6
                play();
                return (game = 1);
              } else {
                if (
                  (currentPlayer == board[1] &&
                    board[1] == board[4] &&
                    board[7] == null) ||
                  (currentPlayer == board[6] &&
                    board[6] == board[8] &&
                    board[7] == null)
                ) {
                  num = 7; //políčko číslo 7
                  play();
                  return (game = 1);
                } else {
                  if (
                    (currentPlayer == board[6] &&
                      board[6] == board[7] &&
                      board[8] == null) ||
                    (currentPlayer == board[2] &&
                      board[2] == board[5] &&
                      board[8] == null) ||
                    (currentPlayer == board[0] &&
                      board[0] == board[4] &&
                      board[8] == null)
                  ) {
                    num = 8; //políčko číslo 8
                    play();
                    return (game = 1); // jestliže se provede uloží do proměnné game jedničku
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

function nextStep2() {
  // Naopak tato funkce má zabránit druhému hráči udělat si v dalším kole vítěznou trojici... obranná fáze
  // Využil jsem zde funkce swap() a aktuální hráč si v podstatě v této funkci myslí, že hraje za toho druhého, 
  // proto je tato funkce skoro identická s funkcí nextStep1(). Předtím než hráč zahraje prohodí se zase zpátky ale zahraje sám za sebe.
  if (game != 1) {
    // pokud by před touto podmínkou byla v proměnné game uložená jednička nic z tohoto by se neprovedlo, jelikož už byl krok vykonán.
    // pokud ne, nastaví se opět game na nula a to kvůli tomu, že pokud by ani zde nenašel žádný tah, jde dát tah na náhodnou volnou pozici.
    // vyjímka je obtížnost medium, kde ještě probíhá zkouška, zda není možnost dát svůj tah někam do rohů či doprostřed
    game = 0;
    swap();
    if (
      (currentPlayer == board[2] && board[2] == board[1] && board[0] == null) ||
      (currentPlayer == board[6] && board[6] == board[3] && board[0] == null) ||
      (currentPlayer == board[8] && board[8] == board[4] && board[0] == null)
    ) {
      swap();
      num = 0; //políčko číslo 0
      play();
      return (game = 1);
    } else {
      if (
        (currentPlayer == board[0] &&
          board[0] == board[2] &&
          board[1] == null) ||
        (currentPlayer == board[7] && board[7] == board[4] && board[1] == null)
      ) {
        swap();
        num = 1; //políčko číslo 1
        play();
        return (game = 1);
      } else {
        if (
          (currentPlayer == board[0] &&
            board[0] == board[1] &&
            board[2] == null) ||
          (currentPlayer == board[8] &&
            board[8] == board[5] &&
            board[2] == null) ||
          (currentPlayer == board[6] &&
            board[6] == board[4] &&
            board[2] == null)
        ) {
          swap();
          num = 2; //políčko číslo 2
          play();
          return (game = 1);
        } else {
          if (
            (currentPlayer == board[5] &&
              board[5] == board[4] &&
              board[3] == null) ||
            (currentPlayer == board[0] &&
              board[0] == board[6] &&
              board[3] == null)
          ) {
            swap();
            num = 3; //políčko číslo 3
            play();
            return (game = 1);
          } else {
            if (
              (currentPlayer == board[1] &&
                board[1] == board[7] &&
                board[4] == null) ||
              (currentPlayer == board[3] &&
                board[3] == board[5] &&
                board[4] == null) ||
              (currentPlayer == board[0] &&
                board[0] == board[8] &&
                board[4] == null) ||
              (currentPlayer == board[2] &&
                board[2] == board[6] &&
                board[4] == null)
            ) {
              swap();
              num = 4; //políčko číslo 4
              play();
              return (game = 1);
            } else {
              if (
                (currentPlayer == board[3] &&
                  board[3] == board[4] &&
                  board[5] == null) ||
                (currentPlayer == board[2] &&
                  board[2] == board[8] &&
                  board[5] == null)
              ) {
                swap();
                num = 5; //políčko číslo 5
                play();
                return (game = 1);
              } else {
                if (
                  (currentPlayer == board[0] &&
                    board[0] == board[3] &&
                    board[6] == null) ||
                  (currentPlayer == board[8] &&
                    board[8] == board[7] &&
                    board[6] == null) ||
                  (currentPlayer == board[2] &&
                    board[2] == board[4] &&
                    board[6] == null)
                ) {
                  swap();
                  num = 6; //políčko číslo 6
                  play();
                  return (game = 1);
                } else {
                  if (
                    (currentPlayer == board[1] &&
                      board[1] == board[4] &&
                      board[7] == null) ||
                    (currentPlayer == board[6] &&
                      board[6] == board[8] &&
                      board[7] == null)
                  ) {
                    swap();
                    num = 7; //políčko číslo 7
                    play();
                    return (game = 1);
                  } else {
                    if (
                      (currentPlayer == board[6] &&
                        board[6] == board[7] &&
                        board[8] == null) ||
                      (currentPlayer == board[2] &&
                        board[2] == board[5] &&
                        board[8] == null) ||
                      (currentPlayer == board[0] &&
                        board[0] == board[4] &&
                        board[8] == null)
                    ) {
                      swap();
                      num = 8; //políčko číslo 8
                      play();
                      return (game = 1);
                    } else {
                      swap();
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

function play() { // Díky této funkci se zapisují X a O do pole a následně i přes innerText do dané buňky v html 
  if (!board[num]) {
    board[num] = currentPlayer; //Ukládáme aktuálního hráče do námi vytvořeného pole
    cells[num].innerText = currentPlayer; //Dáváme aktuálníhoHráče na pozici kam se kliklo
    if (checkWin()) {
      endGame();
    } else {
      if (!board.some((e) => e === null)) {
        endGame("remiza");
      }
    }
    swap(); //Prohazování hráčů, aby nehrál pouze jeden
  }
}

const pl1 = () => { // Zde máme další funkci která po kliknutí na malé černé tlačítko změní aktuálního hráče na X
  currentPlayer = x;
  choice2.innerText = "Začínat bude " + currentPlayer + "!";
};

const pl2 = () => { // Zde máme další funkci která po kliknutí na malé černé tlačítko změní aktuálního hráče na O
  currentPlayer = o;
  choice2.innerText = "Začínat bude " + currentPlayer + "!";
};

const startGame = () => { // Tato funkce se spustí pouze pokud uživatel stiskne spodní tlačítko pod herní plouchou "Nová hra!"
  document.getElementById("restart").style.display = "none"; // zde přes metodu document.getElementById jednotlivým IDčkům nastavuji vlastní styl, konkrétně na displej aby některé byly viditelné a některé ne. Block = odkryté | None = skryté
  document.getElementById("btn1").style.display = "block";
  document.getElementById("choice1").style.display = "block";
  document.getElementById("choice2").style.display = "block";

  ai_medium.addEventListener("click", medium);
  ai_easy.addEventListener("click", easy);
  rand.addEventListener("click", rnd);
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));

  choice2.innerText = "Jinak začíná " + currentPlayer + "...";
  intro.innerText = " ";

  board.fill(null); // Zde se vyprazdňuje pole námi v js vytvořené od X a O
  num = Math.floor(Math.random() * 9);
  cells.forEach((cell) => { // Zde se vyprazdňují buňky z html od X a O
    cell.innerText = "";
  });
};

const cellClicked = (e) => { // funkce, která hlídá zda jsme klikly někam na herní pole
  document.getElementById("restart").style.display = "block";
  document.getElementById("btn1").style.display = "none";
  document.getElementById("choice1").style.display = "none";
  document.getElementById("choice2").style.display = "block";

  const id = e.target.id; // Dříve se psalo event.target... mohl jste například dát alert(event.target); => nyní už jen alert(e.target) tím vám dřív vyskočilo upozorňující okno v browseru https://www.w3schools.com/jsref/event_target.asp

  if (!board[id]) {
    board[id] = currentPlayer;
    e.target.innerText = currentPlayer; //Dáváme aktuálníhoHráče na pozici kam se kliklo

    if (checkWin()) {
      endGame();
    } else {
      if (!board.some((e) => e === null)) {
        endGame("remiza");
      }
    }
    swap(); //Prohazování hráčů, aby nehrál pouze jeden
  }
  choice2.innerText = "Nyní je na řadě " + currentPlayer + "!";
};

const rnd = () => { // Funkce random, která už podle názvu nehraje jinak než, že zahraje na random volnou pocici, také na začátku vypínám/zapínám style
  document.getElementById("restart").style.display = "block";
  document.getElementById("btn1").style.display = "none";
  document.getElementById("choice1").style.display = "none";
  document.getElementById("choice2").style.display = "block";

  while (board[num] != null) { // while který se opakuje dokud nenajde volnou pozici 
    num = Math.floor(Math.random() * 9);
  }
  play();
  choice2.innerText = "Nyní je na řadě " + currentPlayer + "!";
};

const easy = () => { // funkce která má v sobě další funkce umožňující lepší a rozumnější reagování na hrozbu
  document.getElementById("restart").style.display = "block";
  document.getElementById("btn1").style.display = "none";
  document.getElementById("choice1").style.display = "none";
  document.getElementById("choice2").style.display = "block";

  nextStep1();
  nextStep2();
  if (game != 1) {
    while (board[num] != null) {
      num = Math.floor(Math.random() * 9);
    }
    play();
  }
  choice2.innerText = "Nyní je na řadě " + currentPlayer + "!";
};

const medium = () => { // funkce, která je z těchto tří nejlepší a jen výjimečně se nechá porazit ai_easy... tato funkce ví jak má hrát
  document.getElementById("restart").style.display = "block";
  document.getElementById("btn1").style.display = "none";
  document.getElementById("choice1").style.display = "none";
  document.getElementById("choice2").style.display = "block";
  nextStep1();
  nextStep2();
  if (game != 1) { // touto podmínkou zjišťuji zda se vůbec tato část kódu musí provézt, či nikoliv.
    if (board[4] == null) { // zjišťuji zda je střed volný.. pokud je zaber ho
      num = 4;
      play();
    } else {
      if ( // touto podmínkou si ověřuji zda jsou některé rohy volné
        board[0] == null ||
        board[2] == null ||
        board[6] == null ||
        board[8] == null
      ) {
        while (board[num] != null || num % 2 != 0) {
          num = Math.floor(Math.random() * 9);
        }
        play();
      } else {
        while (board[num] != null) {
          num = Math.floor(Math.random() * 9);
        }
        play();
      }
    }
  }
  choice2.innerText = "Nyní je na řadě " + currentPlayer + "!";
};

/*
{
  while (board[num] != null || num % 2 != 0) {
    num = Math.floor(Math.random() * 9);
  }
  play();
} else {
  while (board[num] != null) {
    num = Math.floor(Math.random() * 9);
  }
  play();
}
*/

// Tato funkce endGame jak už sama naznačuje checkuje zda by neměl být konec hry a pokud ano tak vypne eventListenery 
//na skoro všechna tlačítka a vypíše kdo vyhrál, popřípadě remízu
const endGame = (result) => { 
  intro.innerText =
    result == "remiza" ? "Remíza!" : "Hráč " + currentPlayer + " vyhrál!";
  document.getElementById("choice2").style.display = "none";
  cells.forEach((cell) => cell.removeEventListener("click", cellClicked));
  rand.removeEventListener("click", rnd);
  ai_easy.removeEventListener("click", easy); // zde vypínám odposlouchávání pro jednotlivé tlačítka... 
  ai_medium.removeEventListener("click", medium); // to proto aby se počítač nezacyklyl, jelikož ve funkci nextStep2() by while neustále hledal prázdné místo kam dát další tah!
};

//Tato konstanta checkWin checkuje pomocí if zda currentPlayer nevyhrál, ať už je to O či X
const checkWin = () => {
  /*  
    Tady je seznam všech možných kombinací, které jsou vítězné
    [0, 1, 2]
    [3, 4, 5]
    [6, 7, 8]
    [0, 3, 6]
    [1, 4, 7]
    [2, 5, 8]
    [0, 4, 8]
    [6, 4, 2]
  */
  if ( // zde je zcela řekl bych nejprimitvnější checkování zda se někde nevytvořila trojice... 
       // Není univerzální není vhodné na rozšiřování :( 
    currentPlayer == board[0] &&
    board[0] == board[1] &&
    board[1] == board[2]
  ) {
    return true;
  }

  if (
    currentPlayer == board[3] &&
    board[3] == board[4] &&
    board[4] == board[5]
  ) {
    return true;
  }

  if (
    currentPlayer == board[6] &&
    board[6] == board[7] &&
    board[7] == board[8]
  ) {
    return true;
  }

  if (
    currentPlayer == board[0] &&
    board[0] == board[3] &&
    board[3] == board[6]
  ) {
    return true;
  }

  if (
    currentPlayer == board[1] &&
    board[1] == board[4] &&
    board[4] == board[7]
  ) {
    return true;
  }

  if (
    currentPlayer == board[2] &&
    board[2] == board[5] &&
    board[5] == board[8]
  ) {
    return true;
  }

  if (
    currentPlayer == board[0] &&
    board[0] == board[4] &&
    board[4] == board[8]
  ) {
    return true;
  }

  if (
    currentPlayer == board[6] &&
    board[6] == board[4] &&
    board[4] == board[2]
  ) {
    return true;
  }
  return false;
};

// Zde zapínám "odposlouchávání" nebo prostě checkuju zda jsem neklikl na některé z těchto tlačítek. 
//https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_element_addeventlistener2 | https://www.w3schools.com/jsref/met_element_addeventlistener.asp
cells.forEach((cell) => cell.addEventListener("click", cellClicked));
start.addEventListener("click", startGame);
rand.addEventListener("click", rnd);
ai_easy.addEventListener("click", easy);
ai_medium.addEventListener("click", medium);
p1.addEventListener("click", pl1);
p2.addEventListener("click", pl2);
