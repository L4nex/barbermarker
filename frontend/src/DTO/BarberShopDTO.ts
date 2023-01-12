import BarbershopServiceDTO from "./BarbershopServiceDTO";
export interface BarberShopDTO{
    id: number,
    logo: string,
    banner: string,
    name: string,
    description: string,
    email: string,
    phone: string,
    rating: number,
    votes: number,
    completeAddress: string,
    barbershopPhotos: string[]
    services: BarbershopServiceDTO[]
}