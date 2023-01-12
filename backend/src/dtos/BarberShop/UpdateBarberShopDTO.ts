// DTO para alterar barberShop
interface UpdateBarberShopDTO {
    name: string;
    description: string;
    address_id?: number;
    email: string;
    phone: string;
    completeAddress: string;
  }
  
  export {UpdateBarberShopDTO };