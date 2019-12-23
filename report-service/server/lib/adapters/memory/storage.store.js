// const {resolve} = require('path')
/*
const {
  BACKUP_PATH = resolve(__dirname, '../../../temp'),
  BACKUP_TEST_FILES_PATTERN = 'tests_backup.json',
  BACKUP_RUNS_FILES_PATTERN = 'runs_backup.json',
  EXPECTED_RUNST_COUNT = 60,
  EXPECTED_CASES_COUNT = 3500,

  RESTORE_RUNST_COUNT = 50,
  RESTORE_CASES_COUNT = 1000
} = process.env
*/

/*
function watchStorage(storage, storageExpectedCount, ) {
  setInterval(async function() {
    const tatalStoredItems = await storage.getTotalCount()
    if(tatalStoredItems >= storageExpectedCount) {

    }
  })
}
*/


/**
 * @example description
 * this interval is using for storing cases from memory
 * to storage backuk, for inMemory approach it is JSON files
 * in pre-defined directory, by default is /temp in root of the project
 *
 */
/*
setInterval(async function() {
  // if cases more than 3500 - remove first 1000 and store them in file
  if(storage.length >= +EXPECTED_CASES_COUNT) {
    const backUpFileName = await getFreeBackUpFilePathName(BACKUP_PATH, BACKUP_TEST_FILES_PATTERN)
    const storagePart = storage.splice(0, +RESTORE_CASES_COUNT)
    await require('fs').writeFile(backUpFileName, JSON.stringify(storagePart), function(err) {
      if(err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    })
  }

  if(runsStorage.length >= +EXPECTED_RUNST_COUNT) {
    const backUpFileName = await getFreeBackUpFilePathName(BACKUP_PATH, BACKUP_RUNS_FILES_PATTERN)
    const storagePart = runsStorage.splice(0, +RESTORE_RUNST_COUNT)
    await require('fs').writeFile(backUpFileName, JSON.stringify(storagePart), function(err) {
      if(err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    })
  }
}, 1500)
*/
