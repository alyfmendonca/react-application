import states from '../../assets/states.json'

export const getState = (
  stateID,
  searchFor = 'id',
  format = 'abbr') => states.filter(state => state[searchFor] === stateID)[0][format]

function formatPhone(num = "") {
  if(num === null) return '';
  num = num.replace(/\D/g, "");
  num = num.replace(/^(\d{2})(\d)/g, "($1) $2");
  num = num.replace(/(\d)(\d{4})$/, "$1-$2");
  return num;
}


export const getInfo = (user, type) => {
  return type === 'agency' ?
    [
      {
        title: 'Informações do Responsável',
        values: [
          {
            campo: 'Nome do Responsável',
            valor: user.name
          },
          {
            campo: 'Telefone',
            valor: formatPhone(user.phone)
          },
          {
            campo: 'E-mail corporativo',
            valor: user.user_email
          },
        ],


      },

      {
        title: 'Informações da agência',
        values: [
          {
            campo: 'Razão Social',
            valor: user.agency_name,
          },
          {
            campo: 'Nome Fantasia',
            valor: user.agency_fancy
          },
          {
            campo: 'Endereço',
            valor: user.address && user.address_number && `${user.address},  ${user.address_number} - ${user.address_complement} - ${user.neighborhood}, ${user.city} - ${user.cep}`
          },
          {
            campo: 'Telefone',
            valor: formatPhone(user.agency_tel)
          },
          {
            campo: 'CNPJ',
            valor: user.cnpj
          },
          {
            campo: 'Quantidade de projetos',
            valor: user.qtd_projects
          },
        ],
      },
    ] :
    [
      {
        title: 'Informações do Responsável',
        values: [
          {
            campo: 'Nome do Responsável',
            valor: user.name
          },
          {
            campo: 'Telefone',
            valor: formatPhone(user.phone)
          },
          {
            campo: 'E-mail corporativo',
            valor: user.user_email
          },
        ],


      },

      {
        title: 'Informações da empresa',
        values: [
          {
            campo: 'Razão Social',
            valor: user.enterprise_name,
          },
          {
            campo: 'Nome Fantasia',
            valor: user.enterprise_fancy
          },
          {
            campo: 'Endereço',
            valor: user.address && user.address_number && `${user.address},  ${user.address_number} - ${user.address_complement} - ${user.neighborhood}, ${user.city} - ${user.cep}`
          },
          {
            campo: 'Telefone',
            valor: formatPhone(user.enterprise_tel)
          },
          {
            campo: 'CNPJ',
            valor: user.cnpj
          },
          {
            campo: 'Quantidade de projetos',
            valor: user.qtd_projects
          },
        ],
      },
    ]
}