

import * as path from 'path'
import * as fs from 'fs'

import {AdminInterface} from './admin/index.page'
import {CardInterface} from './card/index.page'
import {InfoInterface} from './info/index.page'
import {ItemsInterface} from './items/index.page'
import {SearchInterface} from './search/index.page'
import {UsersInterface} from './user/index.page'

function getFilesListWithSubDirs(dirPath, filesList = []) {
  if (!fs.statSync(dirPath).isDirectory()) {
    throw new Error(`First arg is not ad rirectory: ${dirPath}`)
  }

  const filesAndDirs = fs
    .readdirSync(dirPath)
    .map((fileOrDir) => path.resolve(dirPath, fileOrDir))

  filesAndDirs.forEach((fileOrDir) => {
    if (fs.statSync(fileOrDir).isDirectory()) {
      getFilesListWithSubDirs(fileOrDir, filesList)
    } else {
      filesList.push(fileOrDir)
    }
  })

  return filesList
}

interface PagesInterface {
  admin: AdminInterface,
  card: CardInterface,
  info: InfoInterface,
  items: ItemsInterface,
  search: SearchInterface,
  users: UsersInterface
}


function pageFactory() {
  const pageFiles = getFilesListWithSubDirs(path.resolve(__dirname, './')).filter(
    (item) => !item.includes('page.provider') && !item.includes('fragments')
  );

  return pageFiles.reduce((pages, pagePath: string) => {
    const page = require(pagePath);

    const pageClass = Object.keys(page).find((item) => item.includes('Page'));

    pages[pageClass.charAt(0).toLowerCase() + pageClass.slice(1).replace(/Page/ig, '')] = page[pageClass];
    return pages;
  }, {}) as any;
}


const pages: PagesInterface = new Proxy({} as PagesInterface, {
  get(_, page) {
    console.log(page, typeof pageFactory()[page])
    const Page = pageFactory()[page]
    return new Page()
  }
})

export {
  pages
}
