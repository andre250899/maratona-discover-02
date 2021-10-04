const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    index(req, res) {
        const jobs = Job.get();
        const profile = Profile.get();

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        let jobTotalHours = 0
    
        const updateJobs = jobs.map((job) => {
    
            const remaining = JobUtils.remainingDays(job) >= 0? JobUtils.remainingDays(job) : 0
            const status = remaining <= 0 ? 'done' : 'progress'

            //somando a quantidade de status
            statusCount[status] += 1;

            // total de horas por dia de cada Job em progresso
            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours
    
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile['value-hour'])
            }
        })

        // qtd de hrs que quero trabalhar dia (PROFILE)
        // MENOS
        // quantidade de horas/dia de cada job em progresso
        const freeHours = profile['hours-per-day'] - jobTotalHours

        return res.render("index", { jobs: updateJobs, profile, statusCount, freeHours });
    }
}