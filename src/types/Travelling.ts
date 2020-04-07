// export interface IDate
// {
//     year: number,
//     month: number,
//     day: number
// }

export interface IGeolocation {
    latitude: number,
    longitude: number
}
  
export interface IRegion{
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
}

export interface Time{
    hour: number,
    minute: number
}

export interface Travelling
{
    name?: string, 
    country: string
    arriveDate: Date, 
    comeDate: Date,

    flightArriveTime?: Time,
    flightComeTime ?: Time,

    pathToArriveBoardingPass?: string, //fly some people
    pathToComeBoardingPass?: string,

    yourPlan?: string
}
