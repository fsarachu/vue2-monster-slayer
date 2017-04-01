new Vue({
    el: '#app',
    data: {
        maxHealth: 100,
        minHealth: 0,
        playerHealth: 100,
        monsterHealth: 100
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
        performAttack: function (health, maxPower) {
            var attackPower = Math.round(Math.random() * maxPower);

            health -= attackPower;

            if (health - attackPower < 0) {
                health = 0;
            }

            return health;
        }
    }
});