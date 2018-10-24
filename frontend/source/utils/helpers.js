export const capitalizeFirstLetter = string => {
  return string[0].toUpperCase() + string.slice(1)
}

export const formatTimeForRobot = (dateString) => {
  return dateString.slice(0, 10)
}

export const formatTime = (dateString) => {
  return dateString.slice(0, 10).replace(/-/g, '.')
}