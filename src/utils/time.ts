//封装一个函数, 用于获取时间结果,并提示相应信息(早上,晚上,下午)
export const getTime = () => {
  //通过内置得构造函数Date
  let message: string = ''
  let hours = new Date().getHours()
  if (hours <= 11) {
    message = 'Good Morning'
  } else if (hours <= 18) {
    message = 'Good Afternoon'
  } else {
    message = 'Good Night'
  }
  return message
}
