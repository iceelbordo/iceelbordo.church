export function useTranslate() {
  const translateDay = (day) => {
    switch(day.toLocaleLowerCase()) {
      case "sunday": return "domingo"
      case "monday": return "lunes"
      case "tuesday": return "martes"
      case "wednesday": return "miércoles"
      case "thursday": return "jueves"
      case "friday": return "viernes"
      case "saturday": return "sábado"
      default: return ""
    }
  }

  return { translateDay }
}
