export interface IWord {
   id: string;
   learnWord: string;
   translate: {
      en: string;
      ru: string;
   };
}

export interface IDictionary {
   id: string;
   configs: any;
   coverImage: string;
   title: string;
   words: IWord[];
}
