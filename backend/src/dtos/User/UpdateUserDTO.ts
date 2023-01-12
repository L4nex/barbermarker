// DTO para alterar user
interface UpdateUserDTO {
    name: string;
    cpfCnpj: string;
    address_id: number;
    profile_id: number;
    email: string;
    phone: string;
  }
  
  export {UpdateUserDTO };