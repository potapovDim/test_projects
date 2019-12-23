## STORAGE INTERFACE

### Test case storage

1. Add new item to test case storage
```js
  // add new item to storage
  // should be async
  testCaseStorage.addNewItem(item)
```
2. Get items list
```js
  // should be async
  testCaseStorage.getList()
```

3. Get items total count
```js
  // should be async
  testCaseStorage.getTotalCount()
```

3. Remove items from storage
```js
  // should remove items from storage and return removed items
  testCaseStorage.removeStorageItems(number)
```