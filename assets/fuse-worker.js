// TODO move to Typescript

import Fuse from 'fuse.js'
import { expose } from 'comlink'

const options = {
  keys: ['BusStopCode', 'Description', 'RoadName'],
  includeScore: true,
}

const obj = {
  fuse: undefined,
  init(data, index) {
    const dataIndex = Fuse.parseIndex(index)
    this.fuse = new Fuse(data, options, dataIndex)
  },
  search(query) {
    if (!this.fuse)
      throw new Error('fuse not initialized')
    const d = this.fuse.search(query)
    return d
  },
}

expose(obj)
