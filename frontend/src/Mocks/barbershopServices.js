export var barbershopService = {
    barbershop: {
        id: 3,
        logo: "https://1757140519.rsc.cdn77.org/blog/wp-content/uploads/sites/6/2019/04/h_uncle-b_s-logo_13.png",
        banner: "https://barbeariajohnsix.com.br/wp-content/uploads/2021/05/Barbearia-Curitiba-Decoracao-scaled.jpeg",
        name: "Barbearia XYZ",
        description: "A barbearia mais braba de sempre",
        email: "barbearia@gmail.com",
        phone: "(47)5555-9999",
        completeAddress: "Rua XV de Novembro nº 3556 - Centro - Blumenau SC",
        rating: 3.8,
        votes: 39,
        barbershopPhotos: [
            "https://barbeariajohnsix.com.br/wp-content/uploads/2021/05/Barbearia-Curitiba-Decoracao-scaled.jpeg",
            "https://s2.glbimg.com/1hwNObQ5JV69DIGvO3b49cm_sv4=/smart/e.glbimg.com/og/ed/f/original/2020/01/10/barbearia-minimalista-04.jpg",
            "https://barbeariajohnsix.com.br/wp-content/uploads/2021/05/Barbearia-Curitiba-Decoracao-scaled.jpeg",
        ]
    },
    services: [
        {
            id: 1,
            name: "Corte degradê",
            description: "Corte degradê com o pente escolhido pelo cliente",
            price: 25.00
        },
        {
            id: 2,
            name: "Corte Tradicional",
            description: "Corte tradicional com o pente escolhido pelo cliente",
            price: 15.00
        },
        {
            id: 3,
            name: "Combo DEGRADÊ + BARBA",
            description: "Super combo com degradê e barba",
            price: 30
        },
        {
            id: 4,
            name: "Barba com toalha quente",
            description: "Barba feita na navalea utilizando o artificio da toalha quente",
            price: 10
        },
        {
            id: 5,
            name: "Corte personalizado",
            description: "Escolha seu corte e espere o resultado!!!!",
            price: 20
        }
    ]
}

// // Envio o id da barbearia e retorna todos os dados dela com os serviços
// // Method = get
// barbershopServices = {
//     barbershop: {
//         id: number,
//         logo: string,
//         banner: string,
//         name: string,
//         description: string,
//         email: string,
//         phone: string,
//         completeAddress: string,
//         rating: number,
//         votes: number,
//         barbershopPhotos: string[]
//     },
//     services: {
//         id: number,
//         name: string,
//         description: string,
//         price: number
//     }[]
// }