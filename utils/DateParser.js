function parseToStringDate(date) {
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} à ${date.getHours()}:${date.getMinutes()}`
}

module.exports = { parseToStringDate }