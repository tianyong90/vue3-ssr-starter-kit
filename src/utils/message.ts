import swal, { SweetAlertIcon } from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export class Message {
  public fire (options: Record<string, unknown>): void {
    swal.fire(options)
  }

  /**
   * 成功提示
   * @param msg
   * @param timer
   */
  public success (msg: string, timer = 2000): void {
    swal.fire({
      position: 'center',
      icon: 'success',
      title: msg,
      showConfirmButton: false,
      timer,
      toast: true,
    })
  }

  /**
   * 错误提示
   * @param msg
   * @param timer
   */
  public error (msg: string, timer = 3000): void {
    swal.fire({
      position: 'center',
      icon: 'error',
      title: msg,
      showConfirmButton: false,
      timer,
      toast: true,
    })
  }

  /**
   * alert
   * @param title
   * @param msg
   * @param icon
   */
  public alert (title: string, msg: string, icon = 'success' as SweetAlertIcon): void {
    swal.fire(
      title,
      msg,
      icon,
    )
  }

  /**
   * 网站留言成功提示
   */
  public requestMessageSuccess (): void {
    /*
  * 我们拥有广泛的产品系列以及非常灵活的定制生产经验，如果您有任何特殊的定制需求，请随时联系我们的销售，我们将非常乐意为您提供最合适的解决方案和产品。
  * */
    const htmlContent = `
<h1 class="text-4xl text-slate-700 mb-6">Hi</h1>
<div class="flex space-x-5">
<img src="/img/customer-service.jpg" class="w-2/5 self-center" alt="">

<div class="flex flex-col justify-center">
<p class="text-gray-600 text-xl text-center px-5">Your message has sent successfully, we'll contact you as soon as possible. Thanks for your trust!</p>
</div>
</div>
`
    // <p class="text-gray-600 text-xl text-center px-5 mt-3">You can also directly contact us by Email, phone or WhatsApp, we are glad to hear your voice from anywhere of the world.  </p>

    swal.fire({
      position: 'center',
      width: '600px',
      html: htmlContent,
      showConfirmButton: true,
      confirmButtonText: 'Got it!',
      // timer,
      // toast: true,
    })
  }
}

const msgInstance = new Message()

export default msgInstance
