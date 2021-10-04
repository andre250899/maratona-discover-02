const express = require('express');
const routes = express.Router();

// objeto de profile
const Profile = {
    data: {
        name: 'André',
        avatar: "https://scontent-gig2-1.xx.fbcdn.net/v/t31.18172-8/15419726_803648479776672_5747694681923144022_o.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=R781YCf7BFAAX8z3Jbl&_nc_ht=scontent-gig2-1.xx&oh=ef9e4c3ffa51913493ff9f4ed5bfc51b&oe=617CD386",
        "monthly-budget": 30000,
        "days-per-week": 5,
        "vacation-per-year": 4,
        "value-hour": 50,
        "hours-per-day": 5
    },

    controllers: {
        index(req, res) {
            return res.render("profile", {profile: Profile.data})
        },

        update(req, res) {
            //req.body para pegar os dados
             const data = req.body;

            //definir quantas semanas tem um anos
            const weeksPerYear  = 52;

            //remover as semanas de férias do ano
            const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12

            //quantas horas por semana estou trabalhando
            const weekTotalHours = data['hours-per-day'] * data['days-per-week']

            //total de horas trabalhadas no mês
            const monthlyTotalHours = weekTotalHours + weeksPerMonth

            //o valor da minha hora
            const valueHour = data['monthly-budget'] / monthlyTotalHours

            Profile.data = {
                ...Profile.data,
                ...req.body,
                'value-hour': valueHour
            }

            return res.redirect('/profile')
        }
    }

}

// objeto do job
const Job = {
    data: [
        {
            id: 1,
            name: 'Pizzaria Guloso',
            'daily-hours': 2,
            'total-hours': 1,
            createdAt: Date.now()
        },
        {
            id: 2,
            name: 'OneTwo Project',
            'daily-hours': 3,
            'total-hours': 47,
            createdAt: Date.now()
        },
    ],

    controllers: {
        index(req, res) {
    
            const updateJobs = Job.data.map((job) => {
        
                const remaining = Job.services.remainingDays(job) >= 0? Job.services.remainingDays(job) : 0
                const status = remaining <= 0 ? 'done' : 'progress'
        
                return {
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data['value-hour'])
                }
            })
            
            return res.render("index", { jobs: updateJobs }) 
        },
        
        create(req, res) {
        
            return res.render("job")
                
        },

        save(req, res) {

            const lastId = Job.data[Job.data.length - 1]?.id || 0;
        
            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                'daily-hours': req.body['daily-hours'], 
                'total-hours': req.body['total-hours'],
                createdAt: Date.now()
            })
        
            return res.redirect('/')
                
        },

        show(req, res) {

            const jobId = req.params.id

            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if (!job) {
                return res.send('Job not found!')
            }

            job.budget = Job.services.calculateBudget(job, Profile.data['value-hour'])

            return  res.render("job-edit", { job })
        },

        update(req, res) {

            const jobId = req.params.id

            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if (!job) {
                return res.send('Job not found!')
            }

            const updateJob = {
                ...job,
                name: req.body.name,
                'total-hours': req.body['total-hours'],
                'daily-hours': req.body['daily-hours']
            }

            Job.data = Job.data.map(job => {

                if (Number(job.id) === Number(jobId)) {
                    job = updateJob
                }

                return job
            })

            return res.redirect('/job/' + jobId)
        },

        delete(req, res) {

            const jobId = req.params.id

            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

            return res.redirect('/')
        }
    },

    services: {
        remainingDays(job) {

            const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()
        
            const createdDate = new Date(job.createdAt)
            const dueDay = createdDate.getDate() + Number(remainingDays)
            const dueDateInMs = createdDate.setDate(dueDay)
    
            const timeDiffInMs = dueDateInMs - Date.now()
            // trasnformar milli em dias
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffInMs / dayInMs)
    
            return dayDiff
        
        },

        calculateBudget: (job, valueHour) => valueHour * job['total-hours']
    }
}


// request, response
routes.get('/', Job.controllers.index)

routes.get('/job', Job.controllers.create)

routes.post('/job', Job.controllers.save)

routes.get('/job/:id', Job.controllers.show)

routes.post('/job/:id', Job.controllers.update)

routes.post('/job/delete/:id', Job.controllers.delete)

routes.get('/profile', Profile.controllers.index)

routes.post('/profile', Profile.controllers.update)

module.exports = routes;