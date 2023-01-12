export interface PersonalInformationDTO {
    id: number
    name: string,
    cpfCnpj: string,
    phone: string,
    rua: string,
    numero: string,
    complemento: string,
    address: AddressDTO,
    email: string
}

export interface AddressDTO {
    street: string,
    number: number,
    complement: string,
    district: string,
    city: CityDTO,
}

export interface CityDTO {
    name: string,
    state: StateDTO,
}
export interface StateDTO {
    id: number,
    name: string,
    uf: string,
}