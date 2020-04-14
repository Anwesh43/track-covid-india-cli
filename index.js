#!/usr/bin/env node

const request = require('request')
const chalk = require('chalk')

const fetch = (api) => {
    return new Promise((resolve, reject) => {
        request(api, (err, response) => {
            if (err == null) {
                resolve(response.body)
            } else {
                reject(err)
            }
        })
    })
}

fetch('https://api.covid19india.org/data.json').then((data) => {
    const dataObj = JSON.parse(data)
    const timeSeriesData = dataObj["cases_time_series"]
    const casesToday = timeSeriesData[timeSeriesData.length - 1]
    console.log(chalk.blue(`Total confirmed : ${casesToday['totalconfirmed']}`))
    console.log(chalk.green(`Total recovered : ${casesToday['totalrecovered']}`))
    console.log(chalk.red(`Total deceased: ${casesToday['totaldeceased']}`))
})
