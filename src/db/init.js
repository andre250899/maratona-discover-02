const Database = require("./config");

const initDb = {
  async init() {
    const db = await Database();

    await db.exec(`CREATE TABLE profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INTEGER,
            days_per_week INTEGER,
            vacation_per_year INTEGER,
            value_hour INTEGER,
            hours_per_day INTEGER
        );`);

    await db.exec(`CREATE TABLE jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INTEGER,
            total_hours INTEGER,
            createdAt DATETIME
        );`);

    await db.run(`INSERT INTO profile (
            name, 
            avatar, 
            monthly_budget, 
            days_per_week, 
            hours_per_day, 
            vacation_per_year,
            value_hour
        ) VALUES (
            "André Muniz",
            "https://lh3.googleusercontent.com/ogw/ADea4I7PGvGMvJZn6BiUmj05hiL0aBj_ZDHFstHWOxNyyw=s83-c-mo",
            3000,
            5,
            5,
            4,
            70
        );`);

    await db.run(`INSERT INTO jobs (
          name,
          daily_hours,
          total_hours,
          createdAt
        ) VALUES (
          "Pizzaria Guloso",
          2,
          1,
          1633394710292
        );`);

    await db.run(`INSERT INTO jobs (
          name,
          daily_hours,
          total_hours,
          createdAt
        ) VALUES (
          "OneTwo Project",
          3,
          47,
          1633394710292
        );`);

    await db.close();
  },
};

initDb.init()
