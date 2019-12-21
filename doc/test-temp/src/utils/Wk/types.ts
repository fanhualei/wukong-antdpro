import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
// model模块用------------------------------------------------------
/**
 * 定义了编辑界面返回的数据结构
 */
export interface EditResultType {
  // 是否点击了提交按钮
  isCommit?:boolean;
  // 是否保存成功
  isSuccess?:boolean;
  // 服务器返回的错误信息
  errMessage?:string;
}

/**
 * 默认的状态值
 */
export const defaultEditResult:EditResultType = {
  isCommit: false,
  isSuccess: true,
  errMessage: '',
}


/**
 * 这个好像是通用的，那个model都有
 */
export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;
