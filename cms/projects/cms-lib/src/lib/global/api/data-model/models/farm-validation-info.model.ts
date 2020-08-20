import { FarmValidationInfo } from '../../neuxAPI/bean/FarmValidationInfo';
import { ModelMapping } from '../model-mapper';

type FarmValidationInfoRange = {
  start_column: string;
  end_column: string;
};

export type FarmValidationInfoModelRange = {
  startColumn: string;
  endColumn: string;
};

// @dynamic
@ModelMapping(
  FarmValidationInfo, FarmValidationInfoModel,
  (bean, model) => {
    model.required = bean.required;
    model.email = bean.email;
    model.alphanumeric = bean.alphanumeric;
    model.number = bean.number;
    model.range = (bean.range as FarmValidationInfoRange[]).map(r => {
      return {
        startColumn: r.start_column,
        endColumn: r.end_column,
      };
    });
  }
)
export class FarmValidationInfoModel {

  public required: Array<string>;
  public email: Array<string>;
  public alphanumeric: Array<string>;
  public number: Array<string>;
  public range: Array<FarmValidationInfoModelRange>;

}
