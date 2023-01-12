// DTO para criar user
interface CreateUserDTO {
    name: string;
    cpfCnpj: string;
    address_id: number;
    profile_id: number;
    email: string;
    phone: string;
  }
  
  export {CreateUserDTO };