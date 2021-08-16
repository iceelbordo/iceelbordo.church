export function useDate(value = Date.now()) {
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
  const date = new Date(value)

  const day = () => date.getUTCDate()

  const month = () => months[date.getMonth()]

  const year = () => date.getFullYear()

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
    timeOf,
    totalHoursOf,
    totalMinutesOf
  }
}
