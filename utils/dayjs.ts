import _dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

_dayjs.extend(relativeTime)

export const dayjs = _dayjs
