import dayjs from 'dayjs'

export const useDatetime = () => {
  const formatToDate = (datetime: string, format = 'YYYY-MM-DD'):string => {
    return dayjs(datetime).format(format)
  }

  const formatToDatetime = (datetime: string, format = 'YYYY-MM-DD HH:mm'):string => {
    return dayjs(datetime).format(format)
  }

  return { formatToDate, formatToDatetime }
}
