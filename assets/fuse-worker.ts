import Fuse from 'fuse.js'
import { expose } from 'comlink'

import { indexOptions } from '~/shared/fuse'
import type { BusStopSchema, FuseWorker } from '~/shared/types'

const obj: FuseWorker = {
  _fuse: undefined,
  init(data, index) {
    const dataIndex = Fuse.parseIndex(index)
    this._fuse = new Fuse<BusStopSchema>(data, indexOptions, dataIndex)
  },
  search(query, options) {
    if (!this._fuse)
      throw new Error('fuse not initialized')
    return this._fuse.search(query, options)
  },
}

expose(obj)
