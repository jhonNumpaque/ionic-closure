import { Observable } from '../../Observable';
import { of as staticOf } from '../../observable/of';
export { of };
Observable.of = staticOf;
