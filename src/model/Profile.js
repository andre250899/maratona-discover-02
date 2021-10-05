let data = {
    name: 'André',
    avatar: "https://lh3.googleusercontent.com/ogw/ADea4I7PGvGMvJZn6BiUmj05hiL0aBj_ZDHFstHWOxNyyw=s83-c-mo",
    "monthly-budget": 30000,
    "days-per-week": 5,
    "vacation-per-year": 4,
    "value-hour": 50,
    "hours-per-day": 5
};

module.exports = {
    get() {
        return data;
    },

    update(newData) {
        data = newData;
    }
}