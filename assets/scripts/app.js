const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
const MODE_ATTACK = "ATTACK";
const STRONG_MODE_ATTACK = "STRONG_ATTACK";
const LOG_EVENET_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENET_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_HEAL = "HEAL";
const LOG_EVENT_GAMEOVER = "GAMEOVER";

const enteredValue = prompt("Maximum Life for You and Monstrer .", "100");
let choosenMaxLife = parseInt(enteredValue);
let battlelog = [];

if (isNaN(choosenMaxLife) || choosenMaxLife <= 0) {
  choosenMaxLife = 100;
}

let currentMonstorHealth = choosenMaxLife;
let currentPlayerrHealth = choosenMaxLife;
let hasbonuslife = true;

adjustHealthBars(choosenMaxLife);

function writetolog(ev, value, monsterHealth, playerHeath) {
  let logEntery;
  if (ev === LOG_EVENET_PLAYER_ATTACK) {
    logEntery = {
      event: ev,
      value: value,
      target: "MONSTER",
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHeath,
    };
  } else if (ev === LOG_EVENET_PLAYER_STRONG_ATTACK) {
    logEntery = {
      event: ev,
      value: value,
      target: "MONSTER",
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHeath,
    };
  } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
    logEntery = {
      event: ev,
      value: value,
      target: "Player",
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHeath,
    };
  } else if (ev === LOG_EVENT_HEAL) {
    logEntery = {
      event: ev,
      value: value,
      target: "Player",
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHeath,
    };
  } else if (ev === LOG_EVENT_GAMEOVER) {
    logEntery = {
      event: ev,
      value: value,
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHeath,
    };
  }
  battlelog.push(logEntery);
}

function reset() {
  currentMonstorHealth = choosenMaxLife;
  currentPlayerrHealth = choosenMaxLife;
  resetGame(choosenMaxLife);
}

function endround() {
  const initialplayerhealth = currentPlayerrHealth;
  const playerdamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerrHealth -= playerdamage;

  writetolog(
    LOG_EVENT_MONSTER_ATTACK,
    playerdamage,
    currentMonstorHealth,
    currentPlayerrHealth
  );

  if (currentPlayerrHealth <= 0 && hasbonuslife) {
    hasbonuslife = false;
    removeBonusLife();
    currentPlayerrHealth = initialplayerhealth;
    alert("You Would be dead but bonus life saved You");
    setPlayerHealth(initialplayerhealth);
  }
  if (currentMonstorHealth <= 0 && currentPlayerrHealth > 0) {
    alert("You Won");
    writetolog(
      LOG_EVENT_GAMEOVER,
      "You Won",
      currentMonstorHealth,
      currentPlayerrHealth
    );
    reset();
  } else if (currentPlayerrHealth <= 0 && currentMonstorHealth > 0) {
    alert("You Lost");
    writetolog(
      LOG_EVENT_GAMEOVER,
      "You Lost",
      currentMonstorHealth,
      currentPlayerrHealth
    );

    reset();
  } else if (currentPlayerrHealth <= 0 && currentMonstorHealth <= 0) {
    alert("Draw");
    writetolog(
      LOG_EVENT_GAMEOVER,
      "Draw",
      currentMonstorHealth,
      currentPlayerrHealth
    );

    reset();
  }
}

function attackMonster(mode) {
  let maxDamage;
  let logEvent;
  if (mode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENET_PLAYER_ATTACK;
  } else if (mode === STRONG_MODE_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENET_PLAYER_STRONG_ATTACK;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonstorHealth -= damage;
  writetolog(logEvent, damage, currentMonstorHealth, currentPlayerrHealth);

  endround();
}

function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(STRONG_MODE_ATTACK);
}

function healPlayerHandler() {
  let headvalue;
  if (currentPlayerrHealth >= choosenMaxLife - HEAL_VALUE) {
    alert("You can't heal more than your max initial health.");
    headvalue = choosenMaxLife - currentPlayerrHealth;
  } else {
    headvalue = HEAL_VALUE;
  }
  increasePlayerHealth(headvalue);
  currentPlayerrHealth += headvalue;
  writetolog(
    LOG_EVENT_HEAL,
    headvalue,
    currentMonstorHealth,
    currentPlayerrHealth
  );
  endround();
}

function printLogHandler() {
    for(const logEntery of battlelog){
        console.log(logEntery);
        for(const key in logEntery){
            console.log(`${key} => ${logEntery[key]}`)
        }
    }
//   console.log(battlelog);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
