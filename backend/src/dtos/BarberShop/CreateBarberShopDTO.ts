// DTO para criar barberShop
interface CreateBarberShopDTO {
    name: string;
    description: string;
    address_id?: number;
    email: string;
    phone: string;
    completeAddress: string;
    latitude: number;
    lontitude: number;
  }
  
  export {CreateBarberShopDTO };