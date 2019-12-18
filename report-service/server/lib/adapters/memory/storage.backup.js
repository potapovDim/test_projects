tryToRestoreStorageFromBackups()
async function tryToRestoreStorageFromBackups() {

  const backUpFilesList = await getAvaliableBackUpFiles(BACKUP_PATH, BACKUP_TEST_FILES_PATTERN)
  await restoreDataToStorage(storage, backUpFilesList)
}