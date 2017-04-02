new Vue({
    el: '#app',
    data: {
        maxHealth: 100,
        minHealth: 0,
        playerHealth: 100,
        monsterHealth: 100,
        gameIsOver: false,
        winner: null
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
        }
    },
    methods: {
        attack: function () {
            var maxPower = 15;

            this.monsterHealth = this.performAttack(this.monsterHealth, maxPower);
            this.playerHealth = this.performAttack(this.playerHealth, maxPower);
        },
        specialAttack: function () {
            var maxPower = 30;

            this.monsterHealth = this.performAttack(this.monsterHealth, maxPower);
            this.playerHealth = this.performAttack(this.playerHealth, maxPower);
        },
        heal: function () {
            var maxRecovery = 25;

            this.monsterHealth = this.performHeal(this.monsterHealth, maxRecovery);
            this.playerHealth = this.performHeal(this.playerHealth, maxRecovery);
        },
        giveUp: function () {
            this.playerHealth = this.minHealth;
        },
        restart: function () {
            this.playerHealth = this.maxHealth;
            this.monsterHealth = this.maxHealth;
            this.gameIsOver = false;
            this.winner = null;
        },
        performAttack: function (health, maxPower) {
            var attackPower = Math.round(Math.random() * maxPower);

            health -= attackPower;

            if (health - attackPower < this.minHealth) {
                health = this.minHealth;
            }

            return health;
        },
        performHeal: function (health, maxRecovery) {
            var healRecovery = Math.round(Math.random() * maxRecovery);

            health += healRecovery;

            if (health > this.maxHealth) {
                health = this.maxHealth;
            }

            return health;
        },
        finishGame: function () {
            this.gameIsOver = true;
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