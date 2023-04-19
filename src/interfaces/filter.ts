export interface IFilter {
  colorName: string;
  company: string;
  type: string;
  productImg: string;
  filterImg: string;
  rgb: string;
  href: string;
  name: string;
  colorNameKor: string[];
  filterID: number;
}

export interface ISeason {
  isSelected?: boolean;
  colorID: number;
  colorNameKor: string;
}

export interface IFilterType {
  filterTypeID: number;
  name: string;
}

export interface ICategory {
  seasons: ISeason[];
  filterTypes: IFilterType[];
}
