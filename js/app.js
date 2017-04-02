new Vue({
    el: '#app',
    data: {
        maxHealth: 100,
        minHealth: 0,
        playerHealth: 100,
        monsterHealth: 100,
        gameIsOver: false,
        winner: null,
        logs: []
    },
    computed: {
        playerHealthClass: function () {
            var className;

            if (this.playerHealth <= this.maxHealth / 5) {
                className = 'is-danger'
            } else if (this.playerHealth <= this.maxHealth / 2) {
                className = 'is-warning'
            } else if (this.playerHealth <= this.maxHealth - 1) {
                className = 'is-success'
            } else {
                className = 'is-primary'
            }

            return className;
        },
        monsterHealthClass: function () {
            var className;

            if (this.monsterHealth <= this.maxHealth / 5) {
                className = 'is-danger'
            } else if (this.monsterHealth <= this.maxHealth / 2) {
                className = 'is-warning'
            } else if (this.monsterHealth <= this.maxHealth - 1) {
                className = 'is-success'
            } else {
                className = 'is-primary'
            }

            return className;
        },
        isHealEnabled: function () {
            return (this.playerHealth == this.maxHealth || this.monsterHealth == this.maxHealth);
        }
    },
    methods: {
        attack: function () {
            var maxPower = 15;
            this.performAttack('player', 'monster', maxPower);
            this.performAttack('monster', 'player', maxPower);
        },
        specialAttack: function () {
            var maxPower = 30;
            this.performAttack('player', 'monster', maxPower);
            this.performAttack('monster', 'player', maxPower);
        },
        heal: function () {
            var maxRecovery = 25;
            this.performHeal('player', maxRecovery);
            this.performHeal('monster', maxRecovery);
        },
        giveUp: function () {
            this.playerHealth = this.minHealth;
        },
        restart: function () {
            this.playerHealth = this.maxHealth;
            this.monsterHealth = this.maxHealth;
            this.gameIsOver = false;
            this.winner = null;
            this.logs = [];
        },
        performAttack: function (attacker, victim, maxPower) {
            var victimLower = victim.toLowerCase();

            var attackPower = Math.round(Math.random() * maxPower);

            if (this[victimLower + 'Health'] - attackPower < this.minHealth) {
                this[victimLower + 'Health'] = this.minHealth;
            } else {
                this[victimLower + 'Health'] -= attackPower;
            }

            this.logAttack(attacker, victim, attackPower);
        },
        performHeal: function (who, maxRecovery) {
            var whoLower = who.toLowerCase();
            var recoveryPower = Math.round(Math.random() * maxRecovery);

            if (this[whoLower + 'Health'] + recoveryPower > this.maxHealth) {
                this[whoLower + 'Health'] = this.maxHealth;
            } else {
                this[whoLower + 'Health'] += recoveryPower;
            }

            this.logHeal(who, recoveryPower);
        },
        finishGame: function () {
            this.gameIsOver = true;
        },
        logMessage: function (message, cssClass) {
            this.logs.unshift({
                message: message,
                cssClass: cssClass
            });
        },
        logAttack: function (attacker, victim, attackPower) {
            var message = '';
            message += attacker.charAt(0).toUpperCase() + attacker.slice(1).toLowerCase();
            message += ' hits ';
            message += victim.charAt(0).toUpperCase() + victim.slice(1).toLowerCase();
            message += ' for ';
            message += attackPower;
            message += (attackPower == 1) ? ' point' : ' points';

            var cssClass = (attacker == 'player') ? 'is-success' : 'is-danger';

            this.logMessage(message, cssClass);
        },
        logHeal: function (who, recoveryPower) {
            var message = '';
            message += who.charAt(0).toUpperCase() + who.slice(1).toLowerCase();
            message += ' recovers ';
            message += recoveryPower;
            message += (recoveryPower == 1) ? ' point' : ' points';

            var cssClass = (who == 'player') ? 'is-info' : 'is-warning';

            this.logMessage(message, cssClass);
        }
    },
    watch: {
        playerHealth: function (value) {
            if (value <= this.minHealth) {
                this.winner = 'Monster';
                this.finishGame();
            }
        },
        monsterHealth: function (value) {
            if (value <= this.minHealth) {
                this.winner = 'Player';
                this.finishGame();
            }
        }
    }
});