/**
 *
 * @param {string} messages
 * @returns void
 */
function logClientWork(messages) {
  process.stdout.write(messages)
}

module.exports = {
  logClientWork
}
