import { IDictionary } from "./Dictionary";

export interface DictionariesSchema {
   entities: IDictionary[];
   currentDictionary?: IDictionary;
   isLoading: boolean;
}
