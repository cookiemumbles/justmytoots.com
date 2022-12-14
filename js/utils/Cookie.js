
var cache = null

export function getDataCookie() {
  if (cache != null) {
    return cache
  } else {
    if (document.cookie.length != 0) {
      try {
        const value = document.cookie.substring("data=".length)
        cache = JSON.parse(value)
        return cache;
      } catch {
        console.error("Invalid cookie data. Deleting cookie.", document.cookie)
        deleteDataCookie()
        return {}
      }
    } else {
      console.warn("No cookie found");
      cache = {}
      return {}
    }
  }
}

/**
 * @param {{ }} jsonData
 */
export function setDataCookie(jsonData) {
  var expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);

  if (cache != null) { // don't update cache if nothing is cached yet
    cache = jsonData
  }
  var jsonString = JSON.stringify(jsonData);
  document.cookie = `data=${jsonString}; expires=${expirationDate.toUTCString()}; path=/`;
}

export function deleteDataCookie() {
  document.cookie = "data={};expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;"
  document.cookie = "{};expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;" // remove old cookie if available
  console.log("cleared cookie")
  cache = null
}

/**
 * @param {{}} inputData
 */
export function appendDataCookie(inputData) {
  let data = getDataCookie()
  for (let key in inputData) {
    data[key] = inputData[key]
  }
  setDataCookie(data)
}

