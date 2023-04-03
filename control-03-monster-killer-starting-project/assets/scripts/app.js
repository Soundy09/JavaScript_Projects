const ATTACK_VALUE = 10;
const STRONG_ATT_VALUE = 15;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 25;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'STRONG_PLAYER_ATTACK';
const LOG_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_LOG';

const enteredValue = prompt('pick you life values', '100');


let chosenMaxLife = parseInt(enteredValue);
let battlelog = [];

if  (isNaN(chosenMaxLife) || chosenMaxLife <= 0 ) {
    chosenMaxLife = 100;
};

let currentMonsterHealth = chosenMaxLife;
let curentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function wrtiteToLog(ev, value, monsterHealth, playerHealth) {
    let logEntry; 
    if (ev === LOG_EVENT_PLAYER_ATTACK) {
        logEntry = {
            event: ev,
            value: value,
            target: 'MONSTER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };
    } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
        logEntry = {
            event: ev,
            value: value,
            target: 'MONSTER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };
    } else if (ev === LOG_MONSTER_ATTACK) {
        logEntry = {
            event: ev,
            value: value,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };
    } else if (ev === LOG_PLAYER_HEAL) {
        logEntry = {
            event: ev,
            value: value,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };
    } else if (ev === LOG_EVENT_GAME_OVER) {
        logEntry = {
            event: ev,
            value: value,
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };
    }
    battlelog.push(logEntry);
}

function reset() {
    currentMonsterHealth = chosenMaxLife;
    curentPlayerHealth = chosenMaxLife;
    resetGame();
}

function endRound() {
    const initialPlayerHealth = curentPlayerHealth
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    curentPlayerHealth -= playerDamage;
    wrtiteToLog(
        LOG_MONSTER_ATTACK, 
        playerDamage, 
        currentMonsterHealth, 
        curentPlayerHealth,)

    if (curentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        curentPlayerHealth = initialPlayerHealth
        setPlayerHealth(initialPlayerHealth);
        alert('Saved by the bonus life')
    }

    if (currentMonsterHealth <= 0 && curentPlayerHealth > 0 ) {
        alert ('You Won!');
        wrtiteToLog(
            LOG_EVENT_GAME_OVER, 
            'PLAYER_WON', 
            currentMonsterHealth, 
            curentPlayerHealth,
            );
        reset();
    }  else if ( curentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert ('You Lost!');
        wrtiteToLog(
            LOG_EVENT_GAME_OVER, 
            'you lost', 
            currentMonsterHealth, 
            curentPlayerHealth,
            );
        reset();
    } else if ( curentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('You Have a draw');
        wrtiteToLog(
            LOG_EVENT_GAME_OVER, 
            'draw', 
            currentMonsterHealth, 
            curentPlayerHealth,
            );
        reset();
    }
}

function attackMonster(mode) {
    const maxDamage = mode === MODE_ATTACK ? : STRONG_ATT_VALUE;
    const  logEvent = mode === MODE_ATTACK 
    ? LOG_EVENT_PLAYER_ATTACK : 
    LOG_EVENT_PLAYER_STRONG_ATTACK ;
    // if (mode === MODE_ATTACK) {
    //     maxDamage = ATTACK_VALUE
    //     logEvent = LOG_EVENT_PLAYER_ATTACK;
    // } else if (mode === MODE_STRONG_ATTACK)
    //     {
    //     maxDamage = STRONG_ATT_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;

    // }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    wrtiteToLog(
        logEvent, 
        damage, 
        currentMonsterHealth, 
        curentPlayerHealth,
        );
    // const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    // curentPlayerHealth -= playerDamage;
    endRound();
}

function attackHandler() {
   attackMonster(MODE_ATTACK);
}

function strongAttackHandler () {
    attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
    let healValue; 
    if (curentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert ('max health');
        healValue = chosenMaxLife - curentPlayerHealth;
    } else { 
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    curentPlayerHealth += healValue;
    wrtiteToLog(
        LOG_PLAYER_HEAL, 
        healValue, 
        currentMonsterHealth, 
        curentPlayerHealth,
        );
    endRound();
}

function printLogHandler() {
    console.log(battlelog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);

