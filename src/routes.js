const express = require('express');
const routes = express.Router();
const views = __dirname + '/views/';

const profile = {
    name: 'André',
    avatar: "https://scontent-gig2-1.xx.fbcdn.net/v/t31.18172-8/15419726_803648479776672_5747694681923144022_o.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=R781YCf7BFAAX8z3Jbl&_nc_ht=scontent-gig2-1.xx&oh=ef9e4c3ffa51913493ff9f4ed5bfc51b&oe=617CD386",
    "monthly-budget": 30000,
    "days-per-week": 5,
    "vacation-per-year": 4
}

// request, response
routes.get('/', (req, res) => res.render(views + "index"))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", {profile}))

module.exports = routes;