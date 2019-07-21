import { Imprimivel } from './Imprimivel';
import { Igualavel } from './Igualavel';

export interface Objeto<T> extends Imprimivel, Igualavel<T> {

}
