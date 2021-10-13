export function useDate(jsonDate) {
  const months = [
    'ene',
    'feb',
    'mar',
    'abr',
    'may',
    'jun',
    'jul',
    'ago',
    'sep',
    'oct',
    'nov',
    'dic'
  ]
  const date = new Date(jsonDate.value)

  const day = () => date.getUTCDate()

  const month = () => months[date.getMonth()]

  const year = () => date.getFullYear()

  const diffDaysOf = (start, end) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const oneDay = 1000 * 60 * 60 * 24
    const diffTime = endDate.getTime() - startDate.getTime()
    const diffDays = Math.round(diffTime / oneDay)
    return diffDays
  }

  const currentDateOf = (timeZone) => {
    const localDate = new Date()
    const formater = new Intl.DateTimeFormat('en-US', { timeZone: timeZone, year: 'numeric', month: '2-digit', day: '2-digit' })
    const currentDate = formater.format(localDate)
    return currentDate
  }

  const timeOf = (duration)  => {
    const arr = []
    const hours = parseInt(totalHoursOf(duration))
    if (hours !== 0) {
      arr.push(`${hours}h`)
    }
    const minutes = parseInt(totalMinutesOf(duration))
    if (minutes !== 0) {
      arr.push(`${minutes}min`)
    }
    return arr.join(' ')
  }

  const totalHoursOf = (duration) => {
    const hours = Math.floor(duration / 60 / 60)
    return hours.toString().padStart(2, '0')
  }

  const totalMinutesOf = (duration) => {
    const minutes = Math.floor(duration / 60)
    return minutes.toString().padStart(2, '0')
  }

  return {
    day,
    month,
    year,
    diffDaysOf,
    currentDateOf,
    timeOf,
    totalHoursOf,
    totalMinutesOf
  }
}
