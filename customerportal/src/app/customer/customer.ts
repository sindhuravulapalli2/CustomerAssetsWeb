export interface Customer {
    CustomerId: number;
    CustomerName: string;
    AssetId: number;
    AssetName: string;
    CountryId: number;
    CountryName: string;
    RegionId: number;
    RegionName: string;
    CityId: number;
    CityName: string;
    LocationId: number;
    LocationName: string;
}
export interface Asset {
    AssetId: number;
    AssetName: string;
}

export interface Country {
    CountryId: number;
    CountryName: string;
}

export interface Region {
    CountryId: number;
    RegionId: number;
    RegionName: string;
}

export interface City {
    CountryId: number;
    RegionId: number;
    CityId:number;
    CityName: string;
}

export interface Location {
    CountryId: number;
    RegionId: number;
    CityId:number;
    LocationId :number;
    LocationName: string;
}