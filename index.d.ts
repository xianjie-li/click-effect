declare module '@lxjx/bk-click-effect' {
  export default class BkEffect {
    constructor(options?: {
      /** fr-effect | 需要添加点击效果的元素类名 */
      effect?: string;
      /** __disabled | 禁用包含指定类名的元素 */
      disabled?: string;
      /** __md | 禁用win风格的点击效果 */
      disabledWinStyle?: string;
      /** __win | 禁用md风格的点击效果 */
      disabledMdStyle?: string;
    });
  }
}
