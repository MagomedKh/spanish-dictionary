import { ICard } from "./Collection";

export interface CardsSchema {
   entities: ICard[];
   currentCard?: ICard;
   isLoading: boolean;
}
