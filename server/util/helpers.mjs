export const parseError = (err) => {
  if (err.isJoi) {
    return err.details[0]
  } else {
    return JSON.stringify(err, Object.getOwnPropertyNames(err))
}
}