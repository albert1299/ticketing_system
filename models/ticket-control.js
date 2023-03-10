const path = require('path');
const fs   = require('fs');

class TicketControl {

    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last_four = [];

        this.init();
    }


    get toJson() {
        return {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last_four: this.last_four,
        }
    }

    init() {
        const { today, tickets, last, last_four } = require('../db/data.json');
        if (today === this.today) {
            this.tickets = tickets;
            this.last = last;
            this.last_four = last_four;
        } else {
            this.saveDB();
        }
    }

    saveDB() {
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

}

module.exports = TicketControl;