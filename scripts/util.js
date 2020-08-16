exports.merge = (targets, source) => {
  if(typeof source !== 'object' || typeof targets !== 'object') {
    return targets
  }
  let result = {}
  const targetKeys = Object.keys(targets)
  const sourceKeys = Object.keys(source)
  targetKeys.forEach((key) => {
    if(typeof targets[key] === 'object' && typeof source[key] === 'object') {
      const isArray = Array.isArray(targets[key])
      result[key] = isArray ? [].concat(targets[key], source[key]) : Object.assign({}, source[key], targets[key])
    } else {
      result[key] = targets[key]
    }
  })
  sourceKeys.forEach(key => {
    if(result[key] === undefined) {
      result[key] = source[key]
    }
  })
  return result
}